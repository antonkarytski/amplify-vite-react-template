import { useStoreMap } from 'effector-react'
import { imageParserModel } from './imageParser.model'
import { Button } from '../../ui/Button'

type ImageEditorControlPanelProps = {}

export const ImageEditorControlPanel = ({}: ImageEditorControlPanelProps) => {
  const dividersCount = useStoreMap(
    imageParserModel.$dividers,
    (dividers) => dividers.length,
  )!

  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h3 className="text-lg font-semibold">Click on image to add dividers</h3>
      <div className="flex gap-2">
        <Button
          onClick={() => imageParserModel.dividersCleared()}
          disabled={dividersCount === 0}
        >
          Clear All ({dividersCount})
        </Button>
        <Button
          onClick={() => imageParserModel.splitImageFx()}
          disabled={dividersCount === 0}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Split Image
        </Button>
      </div>
    </div>
  )
}
