import { useUnit } from 'effector-react'
import { promptsBuilderModel } from './promptsBuilder.model'
import { PromptList } from './PromptsList'
import { NewPromptModal } from './NewPromptModal'

type PromptManagerPageProps = {}

export function PromptBuilder({}: PromptManagerPageProps) {
  const isModalOpen = useUnit(promptsBuilderModel.modal.$isOpened)

  return (
    <div className="p-4">
      <PromptList />
      {isModalOpen && (
        <NewPromptModal
          onClose={() => promptsBuilderModel.modal.modalStateChanged(false)}
          onSave={(data) => {
            promptsBuilderModel.promptAdded(data)
            promptsBuilderModel.modal.modalStateChanged(false)
          }}
        />
      )}
    </div>
  )
}
