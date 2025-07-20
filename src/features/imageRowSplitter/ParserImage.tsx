import { useUnit } from 'effector-react'
import { imageParserModel } from './imageParser.model'

type ParserImageProps = {}

export const ParserImage = ({}: ParserImageProps) => {
  const image = useUnit(imageParserModel.$originalImage)
  const imageScale = useUnit(imageParserModel.$imageScale)
  if (!image) return null

  return (
    <img
      src={image.src}
      alt="Original"
      className="max-w-full h-auto block"
      style={{
        width: `${image.width * imageScale}px`,
        height: `${image.height * imageScale}px`,
      }}
      draggable={false}
    />
  )
}
