import { downloadImage } from './imageUtils'
import { useUnit } from 'effector-react'
import { imageParserModel } from './imageParser.model'
import { ImagePiece } from './ImagePiece'

type ImagePiecesListProps = {}

export const ImagePiecesList = ({}: ImagePiecesListProps) => {
  const pieces = useUnit(imageParserModel.$imagePieces)

  const downloadAllRows = () => {
    pieces.forEach((row, index) => {
      setTimeout(() => {
        downloadImage(row.dataUrl, `row_${row.id + 1}.png`)
      }, index * 100)
    })
  }

  if (pieces.length === 0) {
    return null
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Split Rows ({pieces.length})</h3>
        <button
          onClick={downloadAllRows}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Download All Rows
        </button>
      </div>

      <div className="grid gap-4">
        {pieces.map((piece) => (
          <ImagePiece key={piece.id} item={piece} />
        ))}
      </div>
    </div>
  )
}
