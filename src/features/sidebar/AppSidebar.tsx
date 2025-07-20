import { SidebarContent, SidebarFooter, SidebarGroup } from '../../ui/sidebar'
import { SidebarHeader } from './SidebarHeader'
import { SidebarContainer } from './SidebarContainer'
import { sidebarConfig } from './sidebarConfig'
import { Button } from '../../ui/Button'
import { useNavigate, useRouterState } from '@tanstack/react-router'

export function AppSidebar() {
  const navigate = useNavigate()
  const routerState = useRouterState()

  console.log(routerState)
  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className={'gap-2'}>
          {sidebarConfig.pages.map((page, index) => {
            console.log(page)
            return (
              <Button
                key={index}
                variant={'outline'}
                state={
                  routerState.location.pathname === page.path
                    ? 'active'
                    : 'default'
                }
                onClick={() => {
                  void navigate({ to: page.path })
                }}
              >
                {page.label}
              </Button>
            )
          })}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </SidebarContainer>
  )
}
