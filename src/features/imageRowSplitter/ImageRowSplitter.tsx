import ImageUpload from './ImageUpload'
import { ImageEditorContainer } from './ImageEditorContainer'
import { imageParserModel } from './imageParser.model'

type ImageRowSplitterProps = {}

export const ImageRowSplitter = ({}: ImageRowSplitterProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Manual Image Row Splitter
      </h2>

      <ImageUpload />
      <ImageEditorContainer />

      {/*<SplitRowsList*/}
      {/*  splitRows={splitRows}*/}
      {/*  parsedResults={parsedResults}*/}
      {/*  isParsingRows={isParsingRows}*/}
      {/*  onUpdateParsedResults={updateParsedResults}*/}
      {/*  onUpdateParsingState={updateParsingState}*/}
      {/*/>*/}

      <canvas ref={imageParserModel.actions.setCanvas} className="hidden" />
    </div>
  )
}
