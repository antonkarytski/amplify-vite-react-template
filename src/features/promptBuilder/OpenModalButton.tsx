import { promptsBuilderModel } from './promptsBuilder.model'
import { Button } from '../../ui/Button'

type OpenModalButtonProps = {}

export const OpenModalButton = ({}: OpenModalButtonProps) => {
  return (
    <Button
      variant={'outline'}
      onClick={() =>
        promptsBuilderModel.modal.modalStateChanged({
          mode: 'create',
        })
      }
      className="btn"
    >
      New Prompt
    </Button>
  )
}
