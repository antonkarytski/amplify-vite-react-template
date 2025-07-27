import { createDomain, sample } from 'effector'
import { PromptsCreatorModalModel } from './PromptsCreatorModalModel'
import type { IPromptEntity } from '../../../api/prompts.types'
import { client } from '../../../api/client'

export type AddPromptProps = Omit<
  IPromptEntity,
  'createdAt' | 'updatedAt' | 'id'
>

export type EditPromptProps = {
  prompt: IPromptEntity
  updates: AddPromptProps
}

type Subscription = {
  unsubscribe: () => void
}

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
  public readonly promptEdited =
    this.domain.event<EditPromptProps>('promptEdited')
  public readonly promptRemoved =
    this.domain.event<IPromptEntity>('promptRemoved')
  private readonly promptChanged =
    this.domain.event<IPromptEntity[]>('promptChanged')
  public readonly $prompts = this.domain
    .store<IPromptEntity[]>(INITIAL_PROMPTS, {
      name: 'prompts',
    })
    .on(this.promptChanged, (prompts) => prompts)
    .on(this.promptAdded, (store, prompt) => {
      const now = new Date().valueOf()
      return [
        ...store,
        { ...prompt, createdAt: now, updatedAt: now, id: now.toString() },
      ]
    })
    .on(this.promptEdited, (state, { prompt, updates }) => {
      const now = new Date().valueOf()
      const index = state.findIndex((p) => p === prompt)
      if (index === -1) return state
      const copy = [...state]
      copy[index] = { ...prompt, ...updates, updatedAt: now }
      return copy
    })
    .on(this.promptRemoved, (state, prompt) => {
      const index = state.findIndex((p) => p === prompt)
      if (index === -1) return state
      const copy = [...state]
      copy.splice(index, 1)
      return copy
    })

  private readonly addPromptFx = this.domain.effect<AddPromptProps, void>({
    handler: (props) => {
      client.models.Prompts.create(props)
    },
    name: 'addPromptFx',
  })

  public constructor() {
    sample({ clock: this.promptAdded, target: this.addPromptFx })
  }

  private currentSubscription: Subscription | null = null
  public init() {
    if (this.currentSubscription) return
    console.log(client.models)
    const subscription = client.models.Prompts.observeQuery().subscribe({
      next: (data) => this.promptChanged(data.items as any),
    })
    this.currentSubscription = subscription
    return () => {
      subscription.unsubscribe()
      this.currentSubscription = null
    }
  }
}
