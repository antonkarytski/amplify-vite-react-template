import { createRoute } from '@tanstack/react-router'
import { indexRoute } from './rootTree'
import { PromptBuilderPage } from '../../pages/PromptBuilderPage'

const promptsBuilderRootRouter = createRoute({
  getParentRoute: () => indexRoute,
  path: 'prompts',
})

export const promptsBuilderIndexRoute = createRoute({
  getParentRoute: () => promptsBuilderRootRouter,
  path: '/',
  component: PromptBuilderPage,
})

export const promptsBuilderRoutes = promptsBuilderRootRouter.addChildren([
  promptsBuilderIndexRoute,
])
