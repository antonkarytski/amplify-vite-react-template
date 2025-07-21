import { createRoute } from '@tanstack/react-router'
import { indexRoute } from './rootTree'
import { ImageRowSplitter } from '../../features/imageRowSplitter/ImageRowSplitter'

const imageParserRootRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: 'parser',
})

export const imageParserRowRoute = createRoute({
  getParentRoute: () => imageParserRootRoute,
  path: '/row',
  component: ImageRowSplitter,
})

export const imageParserRoutes = imageParserRootRoute.addChildren([
  imageParserRowRoute,
])
