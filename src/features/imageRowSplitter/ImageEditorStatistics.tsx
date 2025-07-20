import { useUnit } from 'effector-react'
import { imageParserModel } from './imageParser.model'

type ImageEditorStatisticsProps = {}

export const ImageEditorStatistics = ({}: ImageEditorStatisticsProps) => {
  const image = useUnit(imageParserModel.$originalImage)
  const dividers = useUnit(imageParserModel.$dividers)

  if (!image) return null
  return (
    <div className="text-sm text-gray-600 mt-2">
      <p>• Click anywhere on the image to add a divider line</p>
      <p>• Drag dividers to adjust their position</p>
      <p>• Click × to remove a divider</p>
      <p>
        • Dividers: {dividers.length} | Image: {image.width}×{image.height}px
      </p>
    </div>
  )
}
