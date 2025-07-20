import { type Domain } from 'effector'
import type { IPromptEntity } from '../../../api/prompts.types'
import { domainOrSub } from '../../../lib/effector/utils'

type PromptsCreatorModelProps = {
  domain?: Domain
}

const PROMPTS_CREATOR_DOMAIN_NAME = 'promptsCreator'

type EditModalProps = {
  mode: 'edit' | 'remove'
  prompt: IPromptEntity
}

type CreateModalProps = {
  mode: 'create'
  prompt?: never
}

export type PromptModalState = EditModalProps | CreateModalProps

export class PromptsCreatorModalModel {
  private readonly domain

  public readonly modalStateChanged
  public readonly $modalState

  public constructor({ domain }: PromptsCreatorModelProps = {}) {
    this.domain = domainOrSub(PROMPTS_CREATOR_DOMAIN_NAME, domain)

    this.modalStateChanged = this.domain.createEvent<PromptModalState | null>()
    this.$modalState = this.domain
      .createStore<PromptModalState | null>(null, {
        name: 'isModalOpened',
      })
      .on(this.modalStateChanged, (_, state) => state)
  }
}
