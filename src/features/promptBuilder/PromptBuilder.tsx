import { PromptList } from './PromptsList'
import { PromptModal } from './PromptModal'

type PromptManagerPageProps = {}

export function PromptBuilder({}: PromptManagerPageProps) {
  return (
    <div className="p-4">
      <PromptList />
      <PromptModal />
    </div>
  )
}
