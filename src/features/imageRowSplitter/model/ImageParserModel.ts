import { attach, createDomain } from 'effector'
import type { ImageData, ImagePiece } from '../types'
import { ImageParserActionsModel } from './ImageParserActionsModel'
import { calculateImageScale } from '../imageUtils'

type DividerMovedProps = {
  index: number
  y: number
}

export class ImageParserModel {
  public readonly actions: ImageParserActionsModel

  private readonly domain = createDomain('imageParser')

  public readonly imageUploaded = this.domain.event<ImageData>('imageUploaded')
  public readonly $originalImage = this.domain
    .store<ImageData | null>(null, {
      name: '$originalImage',
    })
    .on(this.imageUploaded, (_, payload) => payload)

  public readonly imageScaleChanged =
    this.domain.event<number>('imageScaleChanged')
  public readonly $imageScale = this.domain
    .store<number>(1, {
      name: '$imageScale',
    })
    .on(this.imageScaleChanged, (_, payload) => payload)

  public readonly dividerAdded = this.domain.event<number>('dividerAdded')
  public readonly dividerRemoved = this.domain.event<number>('dividerRemoved')
  public readonly dividerMoved =
    this.domain.event<DividerMovedProps>('dividerMoved')
  public readonly dividersCleared = this.domain.event('dividersCleared')
  public readonly $dividers = this.domain
    .store<number[]>([], {
      name: '$dividers',
    })
    .on(this.dividerMoved, (state, { index, y }) => {
      const newDividers = [...state]
      newDividers[index] = y
      return newDividers.sort((a, b) => a - b)
    })
    .on(this.dividerRemoved, (state, index) => {
      return state.filter((_, i) => i !== index)
    })
    .on(this.dividerAdded, (state, y) => {
      return [...state, y].sort((a, b) => a - b)
    })
    .reset(this.dividersCleared)

  public readonly piecesChanged =
    this.domain.event<ImagePiece[]>('piecesChanged')
  public readonly $imagePieces = this.domain.store<ImagePiece[]>([], {
    name: '$imagePieces',
  })

  public constructor() {
    this.actions = new ImageParserActionsModel({
      domain: this.domain,
    })
  }

  public readonly splitImageFx = attach({
    source: {
      originalImage: this.$originalImage,
      dividers: this.$dividers,
    },
    mapParams: (_: void, source) => source,
    effect: this.domain.createEffect({
      name: 'splitImageFx',
      handler: ({ originalImage, dividers }: SplitImageEffectProps) => {
        if (!originalImage || !dividers.length) return []
        const pieces = this.actions.splitImage(originalImage, dividers)
        this.piecesChanged(pieces)
      },
    }),
  })

  public readonly initImageScaling = () => {
    const updateScale = () => {
      const image = this.$originalImage.getState()
      if (this.actions.imageContainer && image) {
        const containerWidth = this.actions.imageContainer.offsetWidth

        const scale = calculateImageScale(image.width, containerWidth)
        this.imageScaleChanged(scale)
      }
    }

    setTimeout(updateScale, 100)
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }
}

type SplitImageEffectProps = {
  originalImage: ImageData | null
  dividers: number[]
}
