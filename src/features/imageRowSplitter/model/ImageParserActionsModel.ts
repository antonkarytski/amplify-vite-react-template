import type { Domain } from 'effector'
import { domainOrSub } from '../../../lib/effector/utils'
import type { ImageData } from '../types'
import { splitImageAtDividers } from '../imageUtils'

type ImageParserActionsModelProps = {
  domain?: Domain
}

export class ImageParserActionsModel {
  private readonly domain
  public canvas: HTMLCanvasElement | null = null
  public imageContainer: HTMLDivElement | null = null
  public activeDividerIndex = -1

  public constructor({ domain }: ImageParserActionsModelProps = {}) {
    this.domain = domainOrSub('imageParserActions', domain)
    console.log(this.domain)
  }

  public readonly setCanvas = (canvas: HTMLCanvasElement | null) => {
    this.canvas = canvas
  }

  public readonly setImageContainer = (element: HTMLDivElement | null) => {
    this.imageContainer = element
  }

  public splitImage(image: ImageData, dividers: number[]) {
    if (!this.canvas) return []
    return splitImageAtDividers(image, dividers, this.canvas)
  }

  public readonly setActiveDividerIndex = (index: number) => {
    this.activeDividerIndex = index
  }
}
