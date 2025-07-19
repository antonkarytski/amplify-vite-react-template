import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { SidebarProvider } from '../../ui/sidebar'
import { AppSidebar } from '../../features/sidebar/AppSidebar'

export const RootLayout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </SidebarProvider>
    </>
  )
}
