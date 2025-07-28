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
    .store<IPromptEntity[]>([], {
      name: 'prompts',
    })
    .on(this.promptChanged, (_, prompts) => prompts)
    .on(this.promptAdded, (store, prompt) => {
      const now = new Date().toString()
      return [
        ...store,
        { ...prompt, createdAt: now, updatedAt: now, id: now.toString() },
      ]
    })
    .on(this.promptEdited, (state, { prompt, updates }) => {
      const now = new Date().toString()
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
    name: 'addPromptFx',
    handler: (props) => {
      client.models.Prompts.create(props)
    },
  })
  private readonly removePromptFx = this.domain.effect<IPromptEntity, void>({
    name: 'removePromptFx',
    handler: (props) => {
      client.models.Prompts.delete({ id: props.id })
    },
  })
  private readonly editPromptFx = this.domain.effect<EditPromptProps, void>({
    name: 'editPromptFx',
    handler: (props) => {
      client.models.Prompts.update({
        id: props.prompt.id,
        ...props.updates,
      })
    },
  })

  public constructor() {
    sample({ clock: this.promptAdded, target: this.addPromptFx })
    sample({ clock: this.promptRemoved, target: this.removePromptFx })
    sample({ clock: this.promptEdited, target: this.editPromptFx })
  }

  private currentSubscription: Subscription | null = null
  public init() {
    if (this.currentSubscription) return
    console.log(client.models)
    const subscription = client.models.Prompts.observeQuery().subscribe({
      next: (data) => {
        console.log(data)
        this.promptChanged(data.items as any)
      },
    })
    this.currentSubscription = subscription
    return () => {
      subscription.unsubscribe()
      this.currentSubscription = null
    }
  }
}
