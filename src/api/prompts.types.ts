export type IPromptEntity = {
  id: string
  name: string
  prompt: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  note?: string
  replacements?: string[]
}
