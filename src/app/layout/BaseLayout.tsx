import { Suspense } from 'react'
import { Outlet } from '@tanstack/react-router'

export const BaseLayout = () => {
  return (
    <main className="grow flex flex-col gap-2 py-4 overflow-x-auto">
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  )
}
