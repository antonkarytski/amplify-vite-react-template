import { type ImageData, type ImagePiece } from './types'

export const loadImageFromFile = (file: File): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          element: img,
          width: img.width,
          height: img.height,
          src: event.target?.result as string,
        })
      }
      img.onerror = reject
      img.src = event.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const loadImageFromBlob = (blob: Blob): Promise<ImageData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          element: img,
          width: img.width,
          height: img.height,
          src: event.target?.result as string,
        })
      }
      img.onerror = reject
      img.src = event.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export const calculateImageScale = (
  imageWidth: number,
  containerWidth: number,
): number => {
  return Math.min(1, containerWidth / imageWidth)
}

export const splitImageAtDividers = (
  originalImage: ImageData,
  dividers: number[],
  canvas: HTMLCanvasElement,
): ImagePiece[] => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return []

  canvas.width = originalImage.width
  canvas.height = originalImage.height

  ctx.drawImage(originalImage.element, 0, 0)

  const sortedDividers = [
    0,
    ...dividers.sort((a, b) => a - b),
    originalImage.height,
  ]
  const rows: ImagePiece[] = []

  for (let i = 0; i < sortedDividers.length - 1; i++) {
    const startY = Math.floor(sortedDividers[i])
    const endY = Math.floor(sortedDividers[i + 1])
    const rowHeight = endY - startY

    if (rowHeight > 5) {
      const rowCanvas = document.createElement('canvas')
      const rowCtx = rowCanvas.getContext('2d')
      if (!rowCtx) continue

      rowCanvas.width = originalImage.width
      rowCanvas.height = rowHeight

      rowCtx.drawImage(
        canvas,
        0,
        startY,
        originalImage.width,
        rowHeight,
        0,
        0,
        originalImage.width,
        rowHeight,
      )

      rows.push({
        id: i,
        canvas: rowCanvas,
        dataUrl: rowCanvas.toDataURL(),
        startY,
        endY,
        height: rowHeight,
      })
    }
  }

  return rows
}

export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to convert canvas to blob'))
      }
    }, 'image/png')
  })
}
