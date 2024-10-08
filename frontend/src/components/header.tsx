import { cn } from '@/lib/utils'

interface HeaderProps {
  title: string
  description: string
  className?: string
}

const Header = ({ title, description, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'relative mb-5 flex items-center justify-between pr-3',
        className,
      )}
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-zinc-500">{description}</p>
      </div>

    </header>
  )
}

export default Header
