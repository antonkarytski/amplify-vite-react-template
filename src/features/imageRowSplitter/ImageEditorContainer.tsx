import { ImageEditorControlPanel } from './ImageEditorControlPanel'
import { ImageEditor } from './ImageEditor'
import { ImageEditorStatistics } from './ImageEditorStatistics'
import { useUnit } from 'effector-react/effector-react.umd'
import { imageParserModel } from './imageParser.model'

export const ImageEditorContainer = () => {
  const originalImage = useUnit(imageParserModel.$originalImage)
  if (!originalImage) return null
  return (
    <div className="mb-6">
      <ImageEditorControlPanel />
      <ImageEditor />
      <ImageEditorStatistics />
    </div>
  )
}
