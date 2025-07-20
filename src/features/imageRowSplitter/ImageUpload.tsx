import React, { useRef } from 'react'
import { loadImageFromFile, loadImageFromBlob } from './imageUtils'
import { Button } from '../../ui/Button'
import { imageParserModel } from './imageParser.model'

interface ImageUploadProps {}

const ImageUpload: React.FC<ImageUploadProps> = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const imageData = await loadImageFromFile(file)
      imageParserModel.imageUploaded(imageData)
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }

  const handlePaste = async (
    e: React.ClipboardEvent<HTMLDivElement>,
  ): Promise<void> => {
    const items = e.clipboardData.items

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        if (!blob) continue

        try {
          const imageData = await loadImageFromBlob(blob)
          imageParserModel.imageUploaded(imageData)
          break
        } catch (error) {
          console.error('Error loading pasted image:', error)
        }
      }
    }
  }

  return (
    <div className="mb-6">
      <div className="flex gap-4 mb-4">
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant={'outline'}
        >
          Upload Image
        </Button>
        <div
          className="flex-1 p-4 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer hover:border-blue-400"
          onPaste={handlePaste}
          tabIndex={0}
        >
          Or paste image here (Ctrl+V)
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  )
}

export default ImageUpload
