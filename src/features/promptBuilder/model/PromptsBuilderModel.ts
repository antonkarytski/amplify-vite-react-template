import { createDomain } from 'effector'
import { PromptsCreatorModalModel } from './PromptsCreatorModalModel'
import type { IPromptEntity } from '../../../api/prompts.types'

export type AddPromptProps = Omit<
  IPromptEntity,
  'createdAt' | 'updatedAt' | 'id'
>

const INITIAL_PROMPTS: IPromptEntity[] = [
  {
    name: 'One',
    id: '1',
    createdAt: Date.now(),
    prompt: 'Write professional email to schedule a meeting',
    updatedAt: Date.now(),
    tags: ['email', 'meeting'],
    note: 'This prompt is used to write emails for scheduling meetings.',
    replacements: ['email', 'meeting'],
  },
  {
    name: 'One',
    id: '2',
    createdAt: Date.now(),
    prompt: 'Write professional email to schedule a meeting',
    updatedAt: Date.now(),
    tags: ['email', 'meeting'],
    note: 'This prompt is used to write emails for scheduling meetings.',
    replacements: ['email', 'meeting'],
  },
  {
    name: 'One',
    id: '3',
    createdAt: Date.now(),
    prompt: 'Write professional email to schedule a meeting',
    updatedAt: Date.now(),
    tags: ['email', 'meeting'],
    note: 'This prompt is used to write emails for scheduling meetings.',
    replacements: ['email', 'meeting'],
  },
  {
    name: 'One',
    id: '4',
    createdAt: Date.now(),
    prompt: 'Write professional email to schedule a meeting',
    updatedAt: Date.now(),
    tags: ['email', 'meeting'],
    note: 'This prompt is used to write emails for scheduling meetings.',
    replacements: ['email', 'meeting'],
  },
  {
    name: 'One',
    id: '5',
    createdAt: Date.now(),
    prompt: 'Write professional email to schedule a meeting',
    updatedAt: Date.now(),
    tags: ['email', 'meeting'],
    note: 'This prompt is used to write emails for scheduling meetings.',
    replacements: ['email', 'meeting'],
  },
]

export class PromptsBuilderModel {
  private readonly domain = createDomain('promptsBuilder')

  public readonly modal = new PromptsCreatorModalModel({
    domain: this.domain,
  })

  public readonly promptAdded = this.domain.event<AddPromptProps>('promptAdded')
  public readonly $prompts = this.domain
    .store<IPromptEntity[]>(INITIAL_PROMPTS, {
      name: 'prompts',
    })
    .on(this.promptAdded, (store, prompt) => {
      const now = new Date().valueOf()
      return [
        ...store,
        { ...prompt, createdAt: now, updatedAt: now, id: now.toString() },
      ]
    })
}
