import type { IImagePiece } from '../types'
import { canvasToBlob } from '../imageUtils'

export class ImageParserApiModel {
  public readonly parseImagePiece = async (
    piece: IImagePiece,
  ): Promise<any> => {
    try {
      const blob = await canvasToBlob(piece.canvas)

      const formData = new FormData()
      formData.append('file', blob, `row_${piece.id + 1}.png`)

      const response = await fetch(
        'http://localhost:4000/belarusian/parse-image-response',
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error(`Parse failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      throw new Error(`Error parsing image: ${errorMessage}`)
    }
  }

  public readonly saveToAnki = (piece: IImagePiece): void => {
    console.log('Save to Anki clicked for row:', piece.id + 1)

    if (
      piece.parsedResult &&
      typeof piece.parsedResult === 'object' &&
      piece.parsedResult.front &&
      piece.parsedResult.back
    ) {
      console.log('Anki Card Data:', {
        rowId: piece.id,
        front: piece.parsedResult.front,
        back: piece.parsedResult.back,
        rowHeight: piece.height,
        startY: piece.startY,
        endY: piece.endY,
      })
    } else {
      console.log('Row data:', {
        id: piece.id,
        height: piece.height,
        startY: piece.startY,
        endY: piece.endY,
        parsedResult: piece.parsedResult || 'No parsed result',
      })
    }
  }
}
