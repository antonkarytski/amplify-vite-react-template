import type { Router } from '../../app/routes/RouterProvider'
import type { ToPathOption } from '@tanstack/router-core'

type SidebarPage = {
  label: string
  path: ToPathOption<Router>
}

type SidebarConfig = {
  pages: SidebarPage[]
}

export const sidebarConfig: SidebarConfig = {
  pages: [
    {
      label: 'Prompt Manager',
      path: '/prompts',
    },
    {
      label: 'Prompt Manager',
      path: '/',
    },
  ],
}
