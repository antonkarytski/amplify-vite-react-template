export type ImageData = {
  element: HTMLImageElement
  width: number
  height: number
  src: string
}
export type IParseResult = { front: string; back: string } | string
export type IImagePiece = {
  id: number
  canvas: HTMLCanvasElement
  dataUrl: string
  startY: number
  endY: number
  height: number
  parsedResult?: IParseResult | null
  state?: 'parsing' | null
}
