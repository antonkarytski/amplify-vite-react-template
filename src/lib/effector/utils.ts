import { createDomain, type Domain } from 'effector'

export function domainOrSub(name: string, domain?: Domain) {
  return domain ? domain.createDomain(name) : createDomain(name)
}
