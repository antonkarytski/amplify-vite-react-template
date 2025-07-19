import { useRef } from 'react'
import type { AddPromptProps } from './model/PromptsBuilderModel'

type PromptFormProps = {
  onCancel: VoidFunction
  onSubmit: (data: AddPromptProps) => void
}

export function PromptForm({ onCancel, onSubmit }: PromptFormProps) {
  const values = useRef({
    name: '',
    prompt: '',
    tags: '',
    note: '',
    replacements: '',
  })

  const handleSubmit = () => {
    onSubmit({
      name: values.current.name,
      prompt: values.current.prompt,
      tags: values.current.tags
        ? values.current.tags.split(',').map((t) => t.trim())
        : undefined,
      note: values.current.note,
      replacements: values.current.replacements
        ? values.current.replacements.split(',').map((r) => r.trim())
        : undefined,
    })
  }

  return (
    <div className="space-y-4">
      <input
        onChange={(e) => (values.current.name = e.target.value)}
        placeholder="Name"
        className="input w-full"
      />
      <textarea
        onChange={(e) => (values.current.prompt = e.target.value)}
        placeholder="Prompt text"
        className="textarea w-full"
      />
      <input
        onChange={(e) => (values.current.tags = e.target.value)}
        placeholder="Tags (comma separated)"
        className="input w-full"
      />
      <input
        onChange={(e) => (values.current.note = e.target.value)}
        placeholder="Note"
        className="input w-full"
      />
      <input
        onChange={(e) => (values.current.replacements = e.target.value)}
        placeholder="Replacements (comma separated)"
        className="input w-full"
      />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="btn">
          Cancel
        </button>
        <button onClick={handleSubmit} className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  )
}
