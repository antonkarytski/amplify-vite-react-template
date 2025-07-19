import { SidebarContent, SidebarFooter, SidebarGroup } from '../../ui/sidebar'
import { SidebarHeader } from './SidebarHeader'
import { SidebarContainer } from './SidebarContainer'
import { sidebarConfig } from './sidebarConfig'
import { Button } from '../../ui/Button'
import { useNavigate } from '@tanstack/react-router'

export function AppSidebar() {
  const navigate = useNavigate()

  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className={'gap-2'}>
          {sidebarConfig.pages.map((page, index) => {
            return (
              <Button
                key={index}
                variant={'outline'}
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
