import { attach, createDomain } from 'effector'
import type { ImageData, IImagePiece } from '../types'
import { ImageParserActionsModel } from './ImageParserActionsModel'
import { calculateImageScale } from '../imageUtils'
import { ImageParserApiModel } from './ImageParserApiModel'

type DividerMovedProps = {
  index: number
  y: number
}

type PieceUpdatedProps = {
  piece: IImagePiece
  updates: {
    state?: IImagePiece['state']
    parsedResult?: IImagePiece['parsedResult']
  }
}

export class ImageParserModel {
  public readonly actions: ImageParserActionsModel
  public readonly api: ImageParserApiModel

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

  public readonly dividersCleared = this.domain.event('dividersCleared')
  public readonly dividerMoveFinished = this.domain.event('dividerMoveFinished')
  public readonly dividerAdded = this.domain.event<number>('dividerAdded')
  public readonly dividerRemoved = this.domain.event<number>('dividerRemoved')
  public readonly dividerMoved =
    this.domain.event<DividerMovedProps>('dividerMoved')

  public readonly $dividers = this.domain
    .store<number[]>([], {
      name: '$dividers',
    })
    .on(this.dividerMoved, (state, { index, y }) => {
      const newDividers = [...state]
      newDividers[index] = y
      return newDividers
    })
    .on(this.dividerMoveFinished, (state) => {
      return [...state].sort((a, b) => a - b)
    })
    .on(this.dividerRemoved, (state, index) => {
      return state.filter((_, i) => i !== index)
    })
    .on(this.dividerAdded, (state, y) => {
      return [...state, y].sort((a, b) => a - b)
    })
    .reset(this.dividersCleared)

  public readonly pieceUpdated =
    this.domain.event<PieceUpdatedProps>('pieceUpdated')
  public readonly piecesChanged =
    this.domain.event<IImagePiece[]>('piecesChanged')
  public readonly $imagePieces = this.domain
    .store<IImagePiece[]>([], {
      name: '$imagePieces',
    })
    .on(this.piecesChanged, (_, payload) => payload)
    .on(this.pieceUpdated, (state, { piece, updates }) => {
      const index = state.findIndex((p) => p === piece)
      if (index === -1) return state
      const copy = [...state]
      copy[index] = { ...copy[index], ...updates }
      return copy
    })
    .reset(this.dividersCleared)

  public constructor() {
    this.actions = new ImageParserActionsModel({
      domain: this.domain,
    })
    this.api = new ImageParserApiModel()
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

  public readonly finishDividerDrag = () => {
    if (this.actions.activeDividerIndex === -1) return
    this.actions.setActiveDividerIndex(-1)
    this.dividerMoveFinished()
  }
}

type SplitImageEffectProps = {
  originalImage: ImageData | null
  dividers: number[]
}
