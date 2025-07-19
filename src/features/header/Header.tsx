import type { PropsWithChildren } from 'react'

type HeaderProps = {
  title: string
}

export function Header({
  title = '',
  children,
}: PropsWithChildren<HeaderProps>) {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-row justify-between w-full">
        <div className="px-1 font-bold">
          <h1 className={'h-1 text-3xl'}>{title}</h1>
        </div>
        {children}
      </nav>
    </header>
  )
}
