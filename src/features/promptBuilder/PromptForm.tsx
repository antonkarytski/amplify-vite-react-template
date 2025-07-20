import { useState } from 'react'
import type { AddPromptProps } from './model/PromptsBuilderModel'
import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { Button } from '../../ui/Button'
import type { IPromptEntity } from '../../api/prompts.types'

type PromptFormProps = {
  onCancel: VoidFunction
  onSubmit: (data: AddPromptProps) => void
  initialValues?: IPromptEntity
}

export function PromptForm({
  onCancel,
  onSubmit,
  initialValues,
}: PromptFormProps) {
  const [values] = useState(() => ({
    name: initialValues?.name ?? '',
    prompt: initialValues?.prompt ?? '',
    tags: initialValues?.tags?.join(', ') ?? '',
    note: initialValues?.note ?? '',
    replacements: initialValues?.replacements?.join(', ') ?? '',
  }))

  const handleSubmit = () => {
    onSubmit({
      name: values.name,
      prompt: values.prompt,
      tags: values.tags
        ? values.tags.split(',').map((t) => t.trim())
        : undefined,
      note: values.note,
      replacements: values.replacements
        ? values.replacements.split(',').map((r) => r.trim())
        : undefined,
    })
  }

  return (
    <div className="space-y-4">
      <Input
        onChange={(e) => (values.name = e.target.value)}
        placeholder="Name"
        className="input w-full"
        initialValue={values.name}
      />
      <Textarea
        onChange={(e) => (values.prompt = e.target.value)}
        placeholder="Prompt text"
        className="textarea w-full"
        initialValue={values.prompt}
      />
      <Input
        onChange={(e) => (values.tags = e.target.value)}
        placeholder="Tags (comma separated)"
        className="input w-full"
        initialValue={values.tags}
      />
      <Input
        onChange={(e) => (values.note = e.target.value)}
        placeholder="Note"
        className="input w-full"
        initialValue={values.note}
      />
      <Input
        onChange={(e) => (values.replacements = e.target.value)}
        placeholder="Replacements (comma separated)"
        className="input w-full"
        initialValue={values.replacements}
      />
      <div className="flex justify-end gap-2">
        <Button onClick={onCancel} className="btn">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="btn btn-primary bg-green-600">
          Save
        </Button>
      </div>
    </div>
  )
}
