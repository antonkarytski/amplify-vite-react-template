export type IPromptEntity = {
  id: string
  name: string
  prompt: string
  createdAt: number
  updatedAt: number
  tags?: string[]
  note?: string
  replacements?: string[]
}
