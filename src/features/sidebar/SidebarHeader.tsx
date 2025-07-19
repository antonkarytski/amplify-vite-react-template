import { cn } from '../../lib/cn/utils'

type SidebarHeaderProps = {}

export function SidebarHeader({}: SidebarHeaderProps) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2')}
    >
      <h1>Uranus84</h1>
    </div>
  )
}
