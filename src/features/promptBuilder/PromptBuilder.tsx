import { PromptList } from './PromptsList'
import { PromptModal } from './PromptModal'
import { useEffect } from 'react'
import { promptsBuilderModel } from './promptsBuilder.model'

type PromptManagerPageProps = {}

export function PromptBuilder({}: PromptManagerPageProps) {
  useEffect(() => {
    return promptsBuilderModel.init()
  }, [])

  return (
    <div className="p-4">
      <PromptList />
      <PromptModal />
    </div>
  )
}
