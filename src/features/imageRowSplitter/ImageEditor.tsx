import React, { useEffect } from 'react'
import { imageParserModel } from './imageParser.model'
import { ParserImage } from './ParserImage'
import { useUnit } from 'effector-react'

type ImageEditorProps = {}

export const ImageEditor = ({}: ImageEditorProps) => {
  const imageScale = useUnit(imageParserModel.$imageScale)
  const dividers = useUnit(imageParserModel.$dividers)

  useEffect(() => {
    return imageParserModel.initImageScaling()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = imageParserModel.$originalImage.getState()
    const imageScale = imageParserModel.$imageScale.getState()
    if (
      imageParserModel.actions.activeDividerIndex === -1 ||
      !image ||
      !imageParserModel.actions.imageContainer
    )
      return

    const rect = imageParserModel.actions.imageContainer.getBoundingClientRect()
    const y = e.clientY - rect.top
    const actualY = Math.max(0, Math.min(image.height, y / imageScale))
    imageParserModel.dividerMoved({
      index: imageParserModel.actions.activeDividerIndex,
      y: actualY,
    })
  }

  return (
    <div
      ref={imageParserModel.actions.setImageContainer}
      className="relative border rounded overflow-hidden cursor-crosshair select-none"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        const image = imageParserModel.$originalImage.getState()
        if (!image || imageParserModel.actions.activeDividerIndex !== -1) return

        const rect = e.currentTarget.getBoundingClientRect()
        imageParserModel.dividerAdded(e.clientY - rect.top)
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={() => {
        imageParserModel.actions.setActiveDividerIndex(-1)
      }}
      style={{ userSelect: 'none' }}
    >
      <ParserImage />

      {dividers.map((y, index) => (
        <div
          key={index}
          className="absolute left-0 right-0 group"
          style={{ top: `${y * imageScale}px`, transform: 'translateY(-2px)' }}
        >
          <div className="h-1 bg-red-500 opacity-80 relative">
            <div
              className="absolute -top-2 -bottom-2 left-0 right-0 cursor-move"
              onMouseDown={(e) => {
                e.stopPropagation()
                imageParserModel.actions.setActiveDividerIndex(index)
              }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                imageParserModel.dividerRemoved(index)
              }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              ×
            </button>
            <div className="absolute -top-6 left-2 bg-red-500 text-white px-1 py-0.5 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {Math.round(y)}px
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
