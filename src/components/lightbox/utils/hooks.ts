import { reactive, ref } from 'vue'
import type { IImgState, IImgWrapperState, IStatus } from '../types'

export function getDistance(p1: Touch, p2: Touch) {
  const x = p1.clientX - p2.clientX
  const y = p1.clientY - p2.clientY
  return Math.sqrt(x * x + y * y)
}

export const useImage = () => {
  const imgRef = ref<HTMLImageElement>()
  const imgState = reactive<IImgState>({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0,
    maxScale: 1,
  })

  const setImgSize = () => {
    if (imgRef.value) {
      const { width, height, naturalWidth, naturalHeight } = imgRef.value
      imgState.maxScale = naturalWidth / width
      imgState.naturalWidth = naturalWidth
      imgState.naturalHeight = naturalHeight
      imgState.width = width
      imgState.height = height
    }
  }

  return {
    imgRef,
    imgState,
    setImgSize,
  }
}

export const useMouse = (wrapperState: IImgWrapperState, status: IStatus, canMove: (button?: number) => boolean) => {
  let rafId: number
  let ticking = false

  const onMouseDown = (e: MouseEvent) => {
    if (canMove(e.button)) {
      wrapperState.initX = wrapperState.lastX = e.clientX
      wrapperState.initY = wrapperState.lastY = e.clientY
      status.dragging = true
      status.dragging = true
      ticking = false
      e.stopPropagation()
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    if (canMove(e.button)) {
      cancelAnimationFrame(rafId)
    }

    status.dragging = false
    status.swipeToLeft = false
    status.swipeToRight = false
    ticking = false
  }

  const onMouseMove = (e: MouseEvent) => {
    if (status.dragging) {
      if (canMove(e.button)) {
        if (ticking) return
        ticking = true

        rafId = requestAnimationFrame(() => {
          const { top, left, lastY, lastX } = wrapperState
          wrapperState.top = top - lastY + e.clientY
          wrapperState.left = left - lastX + e.clientX
          wrapperState.lastX = e.clientX
          wrapperState.lastY = e.clientY
          ticking = false
        })
      } else {
        // for calculating the tolerance
        wrapperState.lastX = e.clientX
        wrapperState.lastY = e.clientY
      }
    }
    e.stopPropagation()
  }

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove,
  }
}

export const useTouch = (imgState: IImgState, wrapperState: IImgWrapperState, status: IStatus, canMove: (button?: number) => boolean) => {
  // touch event handler
  let rafId: number
  let ticking = false
  let startX = 0
  let startY = 0
  const swipeTolerance = 50

  const onTouchStart = (e: TouchEvent) => {
    const { touches } = e
    startX = touches[0].clientX
    startY = touches[0].clientY
    if (touches.length > 1) {
      status.gesturing = true
      wrapperState.touches = touches
    } else {
      wrapperState.initX = wrapperState.lastX = touches[0].clientX
      wrapperState.initY = wrapperState.lastY = touches[0].clientY
      status.dragging = true
    }
    e.stopPropagation()
  }

  const onTouchMove = (e: TouchEvent) => {
    if (ticking) return
    const { touches } = e
    const { lastX, lastY, left, top, scale } = wrapperState

    const currentX = touches[0].clientX
    const currentY = touches[0].clientY

    const xDiff = currentX - startX
    const yDiff = currentY - startY

    const movedHorizontally = Math.abs(xDiff) > Math.abs(yDiff)
    if (movedHorizontally) {
      if (xDiff < swipeTolerance * -1) {
        status.swipeToLeft = true
      } else if (xDiff > swipeTolerance) {
        status.swipeToRight = true
      }
    }

    if (!status.gesturing && status.dragging) {
      if (!touches[0]) return
      const { clientX, clientY } = touches[0]

      if (canMove()) {
        rafId = requestAnimationFrame(() => {
          wrapperState.lastX = clientX
          wrapperState.lastY = clientY
          wrapperState.top = top - lastY + clientY
          wrapperState.left = left - lastX + clientX
          ticking = false
        })
      } else {
        // for calculating the tolerance
        wrapperState.lastX = clientX
        wrapperState.lastY = clientY
      }
    } else if (status.gesturing && wrapperState.touches.length > 1 && touches.length > 1) {
      rafId = requestAnimationFrame(() => {
        const calcScale = (getDistance(wrapperState.touches[0], wrapperState.touches[1]) - getDistance(touches[0], touches[1])) / imgState.width
        wrapperState.touches = touches

        const newScale = scale - calcScale * 1.3

        if (newScale > 0.5 && newScale < imgState.maxScale * 1.5) {
          wrapperState.scale = newScale
        }
        ticking = false
      })
    }
  }

  const onTouchEnd = () => {
    cancelAnimationFrame(rafId)
    status.dragging = false
    status.gesturing = false
    ticking = false
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
