<template>
  <div class="v-toolbar">
    <breadcrumb :current="getPageTitle" />
    <div class="right-actions">
      <template v-if="selectMode && checked">
        <button class="icon-button" @click.stop="() => copy(getSelectedFiles())" v-tooltip="$t('copy')">
          <md-ripple />
          <i-material-symbols:content-copy-outline-rounded />
        </button>
        <button class="icon-button" @click.stop="() => cut(getSelectedFiles())" v-tooltip="$t('cut')">
          <md-ripple />
          <i-material-symbols:content-cut-rounded />
        </button>
        <button class="icon-button" @click.stop="deleteItems" v-tooltip="$t('delete')">
          <md-ripple />
          <i-material-symbols:delete-forever-outline-rounded />
        </button>
        <button class="icon-button" @click.stop="downloadItems" v-tooltip="$t('download')">
          <md-ripple />
          <i-material-symbols:download-rounded />
        </button>
      </template>
      <div class="form-check">
        <label class="form-check-label">
          <md-checkbox touch-target="wrapper" @change="toggleSelectModeChecked" :checked="selectMode" />
          {{ $t('select_mode') }}
        </label>
      </div>
      <div class="form-check">
        <label class="form-check-label"><md-checkbox touch-target="wrapper" @change="toggleShowHiddenChecked" :checked="fileShowHidden" />{{ $t('show_hidden') }}</label>
      </div>
      <button class="icon-button btn-refresh" v-tooltip="$t('refresh')" @click="refreshCurrentDir">
        <md-ripple />
        <i-material-symbols:refresh-rounded />
      </button>
      <popper>
        <button class="icon-button btn-sort" v-tooltip="$t('sort')">
          <md-ripple />
          <i-material-symbols:sort-rounded />
        </button>
        <template #content="slotProps">
          <div class="menu-items">
            <md-menu-item v-for="item in sortItems" @click="sort(slotProps, item.value)" :selected="item.value === fileSortBy">
              <div slot="headline">{{ $t(item.label) }}</div>
            </md-menu-item>
          </div>
        </template>
      </popper>
    </div>
  </div>
  <splitpanes class="panel-container">
    <pane v-for="panel in panels" :key="panel.dir">
      <div class="file-items">
        <template v-for="f of panel.items" :key="f.path">
          <div
            class="file-item"
            v-if="!f.name.startsWith('.') || fileShowHidden"
            :class="{
              active: (currentDir + '/').startsWith(f.path + '/') || selectedItem?.path === f.path,
            }"
            @click="clickItem(panel, f)"
            @dblclick.prevent="dbclickItem(panel, f)"
            @contextmenu="itemCtxMenu($event, panel, f)"
          >
            <md-checkbox touch-target="wrapper" v-if="selectMode" :checked="f.checked" />
            <i-material-symbols:folder-outline-rounded v-if="f.isDir" />
            <img v-if="isImage(f.name) || isVideo(f.name)" :src="getFileUrl(f.fileId, '&w=50&h=50')" width="50" height="50" onerror="this.src='/broken-image.png'" />
            <div class="title">
              {{ f.name }}
              <div style="font-size: 0.75rem">
                {{ formatDateTime(f.updatedAt) }}<template v-if="!f.isDir">, {{ formatFileSize(f.size) }}</template>
              </div>
            </div>
          </div>
        </template>
        <div class="empty" @contextmenu="emptyCtxMenu($event, panel.dir)">
          <div class="no-files" v-if="panel.items.filter((it) => !it.name.startsWith('.') || fileShowHidden).length === 0">
            {{ $t('no_files') }}
          </div>
        </div>
      </div>
    </pane>
    <pane class="no-data-placeholder" v-if="panels.length === 0">
      {{ $t(noDataKey(loading, app.permissions, 'WRITE_EXTERNAL_STORAGE')) }}
    </pane>
  </splitpanes>
  <div class="file-item-info" v-if="selectedItem">{{ $t('path') }}: {{ selectedItem.path }}</div>
  <input ref="fileInput" style="display: none" type="file" multiple @change="uploadChanged" />
  <input ref="dirFileInput" style="display: none" type="file" multiple webkitdirectory mozdirectory directory @change="dirUploadChanged" />
</template>

<script setup lang="ts">
import { contextmenu } from '@/components/contextmenu'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { formatDateTime, formatFileSize } from '@/lib/format'
import { useI18n } from 'vue-i18n'
import { Splitpanes, Pane } from 'splitpanes'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { type FilePanel, type IFile, isImage, isVideo, canOpenInBrowser, canView, getSortItems } from '@/lib/file'
import { getFileUrl, getFileUrlByPath } from '@/lib/api/file'
import { noDataKey } from '@/lib/list'
import emitter from '@/plugins/eventbus'
import { useFiles, useCreateDir, useDeleteFiles, useRename, useStats, useDownload, useView, useFileUpload, useSingleSelect, useCopyPaste } from './hooks/files'
import { useTempStore, type IUploadItem } from '@/stores/temp'
import { openModal } from '@/components/modal'
import DeleteFileConfirm from '@/components/DeleteFileConfirm.vue'
import EditValueModal from '@/components/EditValueModal.vue'
import { useRoute } from 'vue-router'
import { decodeBase64, shortUUID } from '@/lib/strutil'
import { parseQuery } from '@/lib/search'
import { initMutation, setTempValueGQL } from '@/lib/api/mutation'
import type { ISource } from '@/components/lightbox/types'
import type { MdCheckbox } from '@material/web/checkbox/checkbox'
import type { IFileDeletedEvent } from '@/lib/interfaces'

const { t } = useI18n()
const sources = ref([])

const route = useRoute()
const query = route.query
const filesType = route.params['type'] as string
const q = ref(decodeBase64(query.q?.toString() ?? ''))
const fields = parseQuery(q.value as string)
const initPath = ref(fields.find((it) => it.name === 'path')?.value ?? '')

let dirTmp = fields.find((it) => it.name === 'dir')?.value ?? ''
if (!dirTmp) {
  const isDir = fields.find((it) => it.name === 'isDir')?.value === '1'
  if (isDir) {
    dirTmp = initPath.value
  } else {
    dirTmp = initPath.value.substring(0, initPath.value.lastIndexOf('/'))
  }
}
const initDir = ref(dirTmp)
const sortItems = getSortItems()

const selectMode = ref(false)
const mainStore = useMainStore()
const { fileShowHidden, fileSortBy } = storeToRefs(mainStore)

const tempStore = useTempStore()
const { app, urlTokenKey, selectedFiles } = storeToRefs(tempStore)
let rootDir = app.value.internalStoragePath
if (filesType) {
  if (filesType === 'sdcard') {
    rootDir = app.value.sdcardPath
  } else if (filesType.startsWith('usb')) {
    rootDir = app.value.usbDiskPaths[parseInt(filesType.substring(3)) - 1]
  } else if (filesType === 'app') {
    rootDir = app.value.externalFilesDir
  }
}
const { loading, panels, currentDir, refetch: refetchFiles } = useFiles(urlTokenKey, rootDir, initDir.value, fileSortBy)

const { createPath, createVariables, createMutation } = useCreateDir(urlTokenKey, panels)
const { renameValue, renamePath, renameDone, renameMutation, renameVariables } = useRename(panels)
const { internal, sdcard, usb, refetch: refetchStats } = useStats()
const { onDeleted } = useDeleteFiles(panels, currentDir, refetchStats)
const { downloadFile, downloadDir, downloadFiles } = useDownload(urlTokenKey)
const { view } = useView(sources, (s: ISource[], index: number) => {
  tempStore.lightbox = {
    sources: s,
    index: index,
    visible: true,
  }
})
const { selectedItem, select } = useSingleSelect(currentDir, filesType, q, mainStore)
const { canPaste, copy, cut, paste } = useCopyPaste(selectedFiles, refetchFiles, refetchStats)
const { input: fileInput, upload: uploadFiles, uploadChanged } = useFileUpload()
const { input: dirFileInput, upload: uploadDir, uploadChanged: dirUploadChanged } = useFileUpload()

const { mutate: setTempValue, onDone: setTempValueDone } = initMutation({
  document: setTempValueGQL,
  appApi: true,
})

setTempValueDone((r: any) => {
  downloadFiles(r.data.setTempValue.key)
  panels.value.forEach((p: FilePanel) => {
    p.items.forEach((f: IFile) => {
      f.checked = false
    })
  })
})

const getSelectedFiles = () => {
  const files: IFile[] = []
  panels.value.forEach((p: FilePanel) => {
    p.items.forEach((f: IFile) => {
      if (f.checked) {
        f.panel = p
        files.push(f)
      }
    })
  })
  return files
}

function toggleSelectModeChecked(e: Event) {
  selectMode.value = (e.target as MdCheckbox).checked
}

function toggleShowHiddenChecked(e: Event) {
  fileShowHidden.value = (e.target as MdCheckbox).checked
}

const downloadItems = () => {
  setTempValue({ key: shortUUID(), value: JSON.stringify(getSelectedFiles().map((it) => ({ path: it.path }))) })
}

const checked = computed<boolean>(() => {
  return getSelectedFiles().length > 0
})

const deleteItems = () => {
  openModal(DeleteFileConfirm, {
    files: getSelectedFiles(),
    onDone: onDeleted,
  })
}

if (initPath.value) {
  watch(
    () => panels.value.length,
    () => {
      if (panels.value.length > 0 && initPath.value) {
        const panel = panels.value[panels.value.length - 1]
        const item = panel.items.find((it) => it.path === initPath.value)
        if (item) {
          selectedItem.value = item // set the selected item when page is refreshed
          initPath.value = ''
        }
      }
    }
  )
}

function getPageTitle() {
  if (filesType) {
    if (filesType === 'sdcard') {
      return `${t('sdcard')} (${t('storage_free_total', {
        free: formatFileSize(sdcard.value?.freeBytes ?? 0),
        total: formatFileSize(sdcard.value?.totalBytes ?? 0),
      })})`
    } else if (filesType === 'app') {
      return t('app_name')
    } else if (filesType.startsWith('usb')) {
      const num = parseInt(filesType.substring(3))
      const u = usb.value[num - 1]
      return `${t('usb_storage')} ${num} (${t('storage_free_total', {
        free: formatFileSize(u?.freeBytes ?? 0),
        total: formatFileSize(u?.totalBytes ?? 0),
      })})`
    }
  }

  return `${t('page_title.files')} (${t('storage_free_total', {
    free: formatFileSize(internal.value?.freeBytes ?? 0),
    total: formatFileSize(internal.value?.totalBytes ?? 0),
  })})`
}

function clickItem(panel: FilePanel, item: IFile) {
  if (selectMode.value) {
    item.checked = !item.checked
    return
  }
  select(panel, item)
}

function sort(slotProps: any, sort: string) {
  // only sort the last column
  fileSortBy.value = sort
  slotProps.close()
}

function refreshCurrentDir() {
  refetchFiles(currentDir.value)
}

function dbclickItem(panel: FilePanel, item: IFile) {
  if (!item.isDir) {
    if (canOpenInBrowser(item.name)) {
      window.open(getFileUrlByPath(urlTokenKey.value, item.path), '_blank')
    } else if (canView(item.name)) {
      if (fileShowHidden) {
        view(panel.items, item)
      } else {
        view(
          panel.items.filter((it: IFile) => !it.name.startsWith('.')),
          item
        )
      }
    } else {
      downloadFile(item.path)
    }
  }
}

function emptyCtxMenu(e: MouseEvent, dir: string) {
  e.preventDefault()
  const items = [
    {
      label: t('create_folder'),
      onClick: () => {
        createPath.value = dir
        openModal(EditValueModal, {
          title: t('name'),
          placeholder: t('name'),
          mutation: createMutation,
          getVariables: createVariables,
        })
      },
    },
    {
      label: t('upload_files'),
      onClick: () => {
        uploadFiles(dir)
      },
    },
    {
      label: t('upload_folder'),
      onClick: () => {
        uploadDir(dir)
      },
    },
  ]
  if (canPaste()) {
    items.push({
      label: t('paste'),
      onClick: () => {
        paste(dir)
      },
    })
  }
  contextmenu({
    x: e.x,
    y: e.y,
    items,
  })
}

function itemCtxMenu(e: MouseEvent, panel: FilePanel, f: IFile) {
  e.preventDefault()
  let items
  if (f.isDir) {
    items = [
      {
        label: t('upload_files'),
        onClick: () => {
          uploadFiles(f.path)
        },
      },
      {
        label: t('upload_folder'),
        onClick: () => {
          uploadDir(f.path)
        },
      },
      {
        label: t('download'),
        onClick: () => {
          downloadDir(f.path)
        },
      },
    ]
  } else {
    items = []
    if (canOpenInBrowser(f.name) || canView(f.name)) {
      items.push({
        label: t('open'),
        onClick: () => {
          if (canView(f.name)) {
            view(panel.items, f)
          } else {
            window.open(getFileUrlByPath(urlTokenKey.value, f.path), '_blank')
          }
        },
      })
    }
    items.push({
      label: t('download'),
      onClick: () => {
        downloadFile(f.path)
      },
    })
  }
  items.push({
    label: t('duplicate'),
    onClick: () => {
      copy([f])
      paste(panel.dir)
    },
  })
  items.push({
    label: t('cut'),
    onClick: () => {
      f.panel = panel
      cut([f])
    },
  })
  items.push({
    label: t('copy'),
    onClick: () => {
      copy([f])
    },
  })

  if (f.isDir && canPaste()) {
    items.push({
      label: t('paste'),
      onClick: () => {
        paste(f.path)
      },
    })
  }

  items = [
    ...items,
    {
      label: t('rename'),
      onClick: () => {
        renameValue.value = f.name
        renamePath.value = f.path
        openModal(EditValueModal, {
          title: t('rename'),
          placeholder: t('name'),
          value: f.name,
          mutation: renameMutation,
          getVariables: renameVariables,
          done: renameDone,
        })
      },
    },
    {
      label: t('delete'),
      onClick: () => {
        openModal(DeleteFileConfirm, {
          files: [f],
          onDone: onDeleted,
        })
      },
    },
  ]

  contextmenu({
    x: e.x,
    y: e.y,
    items,
  })
}

const uploadTaskDoneHandler = (r: IUploadItem) => {
  if (r.status === 'done') {
    // have to delay 1s to make sure the api return latest data.
    setTimeout(() => {
      refetchFiles(r.dir)
      refetchStats()
    }, 1000)
  }
}

const fileDeletedHanlder = (event: IFileDeletedEvent) => {
  onDeleted([event.item])
}

onMounted(() => {
  emitter.on('upload_task_done', uploadTaskDoneHandler)
  emitter.on('file_deleted', fileDeletedHanlder)
})

onUnmounted(() => {
  emitter.off('upload_task_done', uploadTaskDoneHandler)
  emitter.off('file_deleted', fileDeletedHanlder)
})
</script>
<style lang="scss" scoped>
.file-item-info {
  padding-top: 8px;
}

.btn-sort,
.btn-refresh {
  margin-inline-start: 16px;
}

.panel-container {
  height: calc(100vh - 172px);
}

.no-data-placeholder {
  align-items: center;
  justify-content: center;
  display: flex;
}

.file-items {
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;

  .file-item {
    padding: 8px;
    word-break: break-all;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    user-select: none;

    &:hover {
      cursor: pointer;
    }

    svg,
    img {
      margin-right: 8px;
    }

    &:hover,
    &.active {
      background-color: var(--md-sys-color-on-surface-selected);
      border-radius: 8px;
    }
  }

  .empty {
    display: flex;
    min-height: 64px;
    flex-grow: 1;

    .no-files {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    &:hover {
      cursor: default;
    }
  }
}
</style>
