import { PromptForm } from './PromptForm'
import { Dialog, DialogContent, DialogHeader } from '../../ui/Dialog'
import { useUnit } from 'effector-react'
import { promptsBuilderModel } from './promptsBuilder.model'
import type { PromptModalState } from './model/PromptsCreatorModalModel'
import { Button } from '../../ui/Button'

type ModalFormContentProps = {
  state: PromptModalState
}
function ModalFormContent({ state }: ModalFormContentProps) {
  return (
    <>
      <DialogHeader>
        <p className={'text-xl font-bold'}>
          {(() => {
            if (state.mode === 'create') {
              return 'Add new prompt'
            }
            if (state.mode === 'edit') {
              return 'Edit prompt'
            }
          })()}
        </p>
      </DialogHeader>
      <PromptForm
        initialValues={state.prompt}
        onCancel={() => promptsBuilderModel.modal.modalStateChanged(null)}
        onSubmit={(data) => {
          if (state.mode === 'create') {
            promptsBuilderModel.promptAdded(data)
          }
          if (state.mode === 'edit') {
            promptsBuilderModel.promptEdited({
              prompt: state.prompt,
              updates: data,
            })
          }
          if (state.mode === 'remove') {
            promptsBuilderModel.promptRemoved(state.prompt)
          }
          promptsBuilderModel.modal.modalStateChanged(null)
        }}
      />
    </>
  )
}

type PromptModalContentProps = {
  state: PromptModalState
}

function PromptModalContent({ state }: PromptModalContentProps) {
  if (state.mode === 'create' || state.mode === 'edit') {
    return <ModalFormContent state={state} />
  }

  return (
    <>
      <DialogHeader>
        <p className={'text-xl font-bold'}>
          Are you sure you want to remove prompt?
        </p>
      </DialogHeader>
      <div className="flex justify-end gap-2">
        <Button
          onClick={() => promptsBuilderModel.modal.modalStateChanged(null)}
          className="btn"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            promptsBuilderModel.promptRemoved(state.prompt)
          }}
          className="btn btn-primary bg-red-600"
        >
          Remove
        </Button>
      </div>
    </>
  )
}

type PromptModalProps = {}

export function PromptModal({}: PromptModalProps) {
  const modalState = useUnit(promptsBuilderModel.modal.$modalState)

  return (
    <Dialog open={!!modalState}>
      <DialogContent
        onCloseButtonPress={() =>
          promptsBuilderModel.modal.modalStateChanged(null)
        }
      >
        {!!modalState && <PromptModalContent state={modalState} />}
      </DialogContent>
    </Dialog>
  )
}
