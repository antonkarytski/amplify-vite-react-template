import { PromptForm } from './PromptForm'
import type { AddPromptProps } from './model/PromptsBuilderModel'

type NewPromptModalProps = {
  onClose: VoidFunction
  onSave: (data: AddPromptProps) => void
}

export function NewPromptModal({ onClose, onSave }: NewPromptModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <PromptForm onCancel={onClose} onSubmit={onSave} />
      </div>
    </div>
  )
}
