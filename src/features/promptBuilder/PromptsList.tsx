import PromptItem from './PromptItem'
import { useUnit } from 'effector-react'
import { promptsBuilderModel } from './promptsBuilder.model.ts'

type PromptListProps = {}

export function PromptList({}: PromptListProps) {
  const prompts = useUnit(promptsBuilderModel.$prompts)

  return (
    <div className="mt-4 space-y-2">
      {prompts.map((p) => (
        <PromptItem key={p.id} prompt={p} />
      ))}
    </div>
  )
}
