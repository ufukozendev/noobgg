type HeaderProps = {
  title: string
  description: string
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </header>
  )
}
