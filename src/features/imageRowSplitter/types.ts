export type ImageData = {
  element: HTMLImageElement
  width: number
  height: number
  src: string
}

export type ImagePiece = {
  id: number
  canvas: HTMLCanvasElement
  dataUrl: string
  startY: number
  endY: number
  height: number
}

export type ParsedResults = Record<
  number,
  { front: string; back: string } | string
>

export type ParsingStates = Record<number, boolean>
