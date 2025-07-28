import type { IPromptEntity } from '../../api/prompts.types'
import { Button } from '../../ui/Button'
import { EditIcon, PlayIcon, TrashIcon } from 'lucide-react'
import { format } from 'date-fns'
import { promptsBuilderModel } from './promptsBuilder.model'

type PromptItemProps = {
  prompt: IPromptEntity
}

export default function PromptItem({ prompt }: PromptItemProps) {
  console.log(prompt.createdAt)
  return (
    <div className="border p-4 pb-4 rounded flex-row flex align-middle">
      <div className={'border-r-2 border-gray-300 pr-4 flex-4'}>
        <p className="font-semibold text-m">{prompt.prompt}</p>
        <div className={'text-sm'}>
          Replacements:{' '}
          {prompt.replacements?.map((item) => `[${item}]`).join(', ') ?? ''}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2 border-r-2 border-gray-300 justify-start items-center flex-1">
        {prompt.tags?.map((t, index) => (
          <span
            key={`tag-${index}`}
            className="text-white bg-black rounded-4xl pr-4 pl-4 text-sm h-5 text-center"
          >
            {t}
          </span>
        ))}
      </div>
      <div className={'border-r-2 border-gray-300 pr-4 pl-4 flex-2'}>
        <p className="mt-2 text-sm">{prompt.note}</p>
      </div>
      <div className={'border-r-2 border-gray-300 pr-4 pl-4 flex-1'}>
        <p className="mt-2 text-sm ">
          {format(prompt.createdAt, 'dd/MM/yyyy')}
        </p>
      </div>
      <div className={'pl-4 flex flex-1 gap-2 flex-col'}>
        <Button
          onClick={() => {
            promptsBuilderModel.modal.modalStateChanged({
              mode: 'edit',
              prompt,
            })
          }}
          variant={'outline'}
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => {
            promptsBuilderModel.modal.modalStateChanged({
              mode: 'remove',
              prompt,
            })
          }}
          variant={'outline'}
        >
          <TrashIcon color={'#c51a1a'} />
        </Button>
        <Button variant={'outline'}>
          <PlayIcon color={'#129134'} />
        </Button>
      </div>
    </div>
  )
}
