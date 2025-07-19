import { PromptBuilder } from '../features/promptBuilder/PromptBuilder'
import { Header } from '../features/header/Header'
import { OpenModalButton } from '../features/promptBuilder/OpenModalButton'

type PromptBuilderPageProps = {}

export function PromptBuilderPage({}: PromptBuilderPageProps) {
  return (
    <div className={'flex-col flex-1'}>
      <Header title={'Prompt Manager'}>
        <OpenModalButton />
      </Header>
      <PromptBuilder />
    </div>
  )
}
