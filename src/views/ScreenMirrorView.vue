<template>
  <div ref="containerRef" class="page-container">
    <div class="main">
      <div class="v-toolbar">
        <breadcrumb :current="() => $t('screen_mirror')" />
        <template v-if="state">
          <button class="icon-button" @click="() => refetch()" v-tooltip="$t('refresh')">
            <md-ripple />
            <i-material-symbols:refresh-rounded />
          </button>
          <md-outlined-button @click="changeQuality" class="btn-sm" v-tooltip="$t('change_quality')">{{ $t('mirror_quality') }}</md-outlined-button>
          <md-outlined-button @click="takeScreenshot" class="btn-sm" v-tooltip="$t('screenshot')">{{ $t('screenshot') }}</md-outlined-button>
          <md-outlined-button @click="togglePause" class="btn-sm" v-tooltip="$t(paused ? 'resume' : 'pause')">{{ $t(paused ? 'resume' : 'pause') }}</md-outlined-button>
          <md-outlined-button :disabled="stopServiceLoading" @click="stopService" v-tooltip="$t('stop_mirror')" class="btn-sm btn-stop">{{ $t('stop_mirror') }}</md-outlined-button>
          <button class="icon-button btn-enter-fullscreen" @click="requestFullscreen" v-tooltip="$t('fullscreen')">
            <md-ripple />
            <i-material-symbols:fullscreen-rounded />
          </button>
          <button class="icon-button btn-exit-fullscreen" @click="exitFullscreen" v-tooltip="$t('exit_fullscreen')">
            <md-ripple />
            <i-material-symbols:fullscreen-exit-rounded />
          </button>
        </template>
        <md-outlined-button v-else-if="!relaunchAppLoading" class="btn-sm" @click="relaunchApp">{{ $t('relaunch_app') }}</md-outlined-button>
      </div>
      <div class="panel-container">
        <div v-if="fetchImageLoading || startServiceLoading || relaunchAppLoading" class="loading">
          <md-circular-progress indeterminate />
        </div>
        <div v-if="seconds > 0 && !relaunchAppLoading" class="request-permission">
          <div class="tap-phone">
            <TouchPhone />
          </div>
          <pre class="text">{{ $t('screen_mirror_request_permission', { seconds: seconds }) }}</pre>
        </div>
        <div v-if="failed && !state && !relaunchAppLoading" class="request-permission-failed">
          <MobileWarning />
          <p>{{ $t('screen_mirror_request_permission_failed') }}</p>
          <md-filled-button @click="start">{{ $t('try_again') }}</md-filled-button>
        </div>
        <canvas v-show="state" ref="canvasRef" class="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/plugins/eventbus'
import toast from '@/components/toaster'
import { onMounted, onUnmounted, ref } from 'vue'
import MobileWarning from '@/assets/mobile-warning.svg'
import { initQuery, screenMirrorStateGQL } from '@/lib/api/query'
import { useI18n } from 'vue-i18n'
import { initMutation, relaunchAppGQL, startScreenMirrorGQL, stopScreenMirrorGQL } from '@/lib/api/mutation'
import type { ApolloError } from '@apollo/client/errors'
import TouchPhone from '@/assets/touch-phone.svg'
import ChangeScreenMirrorQualityModal from '@/components/ChangeScreenMirrorQualityModal.vue'
import { openModal } from '@/components/modal'
import { download } from '@/lib/api/file'

let countIntervalId: number
const { t } = useI18n()
const state = ref(false)
const seconds = ref(0)
const failed = ref(false)
const paused = ref(false)
const showLatest = ref(false)
const containerRef = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()

const screenMirroringHandler = async (data: Blob) => {
  state.value = true
  renderCanvas(data)
  failed.value = false
  seconds.value = 0
  clearInterval(countIntervalId)
}

let relaunchAppLoading = false

const { mutate: doRelaunchApp } = initMutation({
  document: relaunchAppGQL,
  appApi: true,
})

const togglePause = () => {
  paused.value = !paused.value
  if (!paused.value) {
    refetch()
  }
}

const changeQuality = () => {
  openModal(ChangeScreenMirrorQualityModal)
}

const relaunchApp = () => {
  doRelaunchApp()
  relaunchAppLoading = true
}

const appSocketConnectionChangedHanlder = (connected: boolean) => {
  if (connected) {
    if (relaunchAppLoading) {
      relaunchAppLoading = false
      clearInterval(countIntervalId)
      start()
    }
  }
}

const takeScreenshot = () => {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }
  const d = new Date()
  const fileName = 'screenshot-' + [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()].join('') + '.png'
  download(canvas.toDataURL(), fileName)
}

function renderCanvas(blob: Blob) {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }
  if (paused.value && !showLatest.value) {
    return
  }
  showLatest.value = false
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = URL.createObjectURL(blob)
  img.onload = function () {
    if (ctx) {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
  }
}

onMounted(() => {
  emitter.on('screen_mirroring', screenMirroringHandler)
  emitter.on('app_socket_connection_changed', appSocketConnectionChangedHanlder)
})

onUnmounted(() => {
  emitter.off('screen_mirroring', screenMirroringHandler)
  emitter.off('app_socket_connection_changed', appSocketConnectionChangedHanlder)
})

const {
  mutate: startService,
  loading: startServiceLoading,
  onDone: startServiceDone,
  onError: startServiceError,
} = initMutation({
  document: startScreenMirrorGQL,
  appApi: true,
})

const { loading: fetchImageLoading, refetch } = initQuery({
  handle: (data: any, error: string) => {
    if (error) {
      toast(t(error), 'error')
    } else {
      if (!data.screenMirrorState) {
        state.value = false
        showLatest.value = false
        start()
      } else {
        state.value = true
        showLatest.value = true
      }
    }
  },
  options: {
    fetchPolicy: 'no-cache',
  },
  document: screenMirrorStateGQL,
  appApi: true,
})

const requestFullscreen = () => {
  containerRef.value?.requestFullscreen({ navigationUI: 'show' })
}
const start = () => {
  failed.value = false
  startService()
}

const exitFullscreen = () => {
  document.exitFullscreen()
}

startServiceError((error: ApolloError) => {
  toast(t(error.message))
  failed.value = true
})

startServiceDone(() => {
  seconds.value = 30
  countIntervalId = setInterval(() => {
    seconds.value--
    if (seconds.value <= 0) {
      failed.value = true
      clearInterval(countIntervalId)
    }
  }, 1000)
})

const {
  mutate: stopService,
  loading: stopServiceLoading,
  onDone: stopServiceDone,
  onError: stopServiceError,
} = initMutation({
  document: stopScreenMirrorGQL,
  appApi: true,
})

stopServiceError((error: ApolloError) => {
  toast(t(error.message))
})

stopServiceDone(() => {
  failed.value = true
  state.value = false
})
</script>
<style lang="scss" scoped>
.canvas {
  margin: 0 auto;
  display: block;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 130px);
  object-fit: contain;
}

.main {
  height: 100%;
}

.panel-container {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 130px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-enter-fullscreen,
.btn-exit-fullscreen {
  margin-inline-start: 8px;
}

.btn-exit-fullscreen {
  display: none;
}

:fullscreen {
  .canvas {
    max-height: 100%;
  }
  .main {
    padding: 8px !important;
    border-radius: 0;
  }
  .panel-container {
    height: calc(100vh - 64px);
  }
  .btn-exit-fullscreen {
    display: block;
  }
  .btn-enter-fullscreen,
  .btn-stop {
    display: none;
  }
}

.request-permission {
  padding-bottom: 40px;
  text-align: center;

  .tap-phone {
    width: 200px;
    margin: 0 auto 20px auto;
    *:is(svg) {
      fill: var(--md-sys-color-primary);
    }
  }

  .text {
    text-align: center;
    font-size: 1.2rem;
    line-height: 2;
    margin-block-end: 16px;
  }
}

.request-permission-failed {
  text-align: center;
  font-size: 1.2rem;
  line-height: 2;

  *:is(svg) {
    width: 140px;
    display: block;
    fill: currentColor;
    margin: 0 auto 20px auto;
  }
}
</style>
