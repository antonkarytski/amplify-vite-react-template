import { createDomain, type Domain } from 'effector'

type PromptsCreatorModelProps = {
  domain?: Domain
}

const PROMPTS_CREATOR_DOMAIN_NAME = 'promptsCreator'

export class PromptsCreatorModalModel {
  private readonly domain

  public readonly modalStateChanged
  public readonly $isOpened

  public constructor({ domain }: PromptsCreatorModelProps = {}) {
    this.domain = domain
      ? domain.createDomain(PROMPTS_CREATOR_DOMAIN_NAME)
      : createDomain(PROMPTS_CREATOR_DOMAIN_NAME)

    this.modalStateChanged = this.domain.createEvent<boolean>()
    this.$isOpened = this.domain
      .createStore(false, {
        name: 'isModalOpened',
      })
      .on(this.modalStateChanged, (_, state) => state)
  }
}
