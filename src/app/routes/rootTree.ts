import { createRootRoute, createRoute } from '@tanstack/react-router'
import { RootLayout } from '../layout/RootLayout'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { promptsBuilderRoutes } from './promptBuilder'
import { imageParserRoutes } from './imageParser'

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  promptsBuilderRoutes,
  imageParserRoutes,
])
