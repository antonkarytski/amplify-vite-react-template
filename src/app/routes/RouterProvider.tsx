import {
  createRouter,
  RouterProvider as TanstackRouterProvider,
} from '@tanstack/react-router'
import { routeTree } from './rootTree.ts'

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  notFoundMode: 'root',
})

export function RouterProvider() {
  return <TanstackRouterProvider router={router} />
}

export type Router = typeof router
export type Paths = keyof (typeof router)['routesByPath']
declare module '@tanstack/react-router' {
  interface Register {
    router: Router
  }
}
