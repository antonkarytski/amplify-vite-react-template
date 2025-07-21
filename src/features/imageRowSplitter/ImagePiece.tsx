import { downloadImage } from './imageUtils'
import type { IImagePiece } from './types'
import { ImageParsingResult } from './ImageParsingResult'
import { imageParserModel } from './imageParser.model'

type ImagePieceProps = {
  item: IImagePiece
}

export const ImagePiece = ({ item }: ImagePieceProps) => {
  const handleDownload = () => {
    downloadImage(item.dataUrl, `row_${item.id + 1}.png`)
  }

  const handleParse = async () => {
    imageParserModel.pieceUpdated({
      piece: item,
      updates: { state: 'parsing' },
    })
    try {
      const result = await imageParserModel.api.parseImagePiece(item)
      imageParserModel.pieceUpdated({
        piece: item,
        updates: { state: null, parsedResult: result },
      })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      imageParserModel.pieceUpdated({
        piece: item,
        updates: {
          state: null,
          parsedResult: `<div class="text-red-500">Error: ${errorMessage}</div>`,
        },
      })
    }
  }

  const handleSaveToAnki = () => {
    imageParserModel.api.saveToAnki(item)
  }

  return (
    <div className="border rounded p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          Row {item.id + 1} ({item.height}px)
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleParse}
            disabled={item.state === 'parsing'}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-400"
          >
            {item.state === 'parsing' ? 'Parsing...' : 'Parse'}
          </button>
          <button
            onClick={handleSaveToAnki}
            className="px-3 py-1 bg-orange-500 text-white rounded text-sm hover:bg-orange-600"
          >
            Save to Anki
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>

      {item.parsedResult && <ImageParsingResult result={item.parsedResult} />}

      <img
        src={item.dataUrl}
        alt={`Row ${item.id + 1}`}
        className="max-w-full h-auto border rounded"
      />
    </div>
  )
}
