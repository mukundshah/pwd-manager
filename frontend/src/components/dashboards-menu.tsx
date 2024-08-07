import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LucideLockKeyhole, ScanLine, Sparkles } from 'lucide-react'
import { Button, buttonVariants } from './ui/button'

interface DashboardsMenuProps {
  variant: 'DESKTOP' | 'MOBILE'
  toggleIsOpen?: () => void
}

const DashboardsMenu: React.FC<DashboardsMenuProps> = ({ variant, toggleIsOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  const dashboardMenu = [
    {
      label: 'passwords',
      href: '/dashboard',
      icon: LucideLockKeyhole,
      isActive: pathname === '/dashboard',
      isAvailable: true,
    },
    {
      label: 'password generator',
      href: '/dashboard/feature/password-generator',
      icon: Sparkles,
      isActive: pathname === '/dashboard/feature/password-generator',
      isAvailable: false,
    },
    {
      label: 'password analyzer',
      href: '/dashboard/feature/password-analyzer',
      icon: ScanLine,
      isActive: pathname === '/dashboard/feature/password-analyzer',
      isAvailable: false,
    },
  ]

  return (
    <div className="space-y-0.5">
      {dashboardMenu.map(({ href, icon: Icon, isActive, label }, index) =>
        variant === 'DESKTOP'
          ? (
              <Link
                key={`${index}-${label}`}
                to={href}
                className={buttonVariants({
                  variant: isActive ? 'default' : 'ghost',
                  className: 'w-full justify-start overflow-hidden capitalize',
                })}
              >
                <Icon className="mr-2 h-4 w-4 flex-none" />
                {label}
              </Link>
            )
          : (
              <Button
                key={`${index}-${label}`}
                className="w-full justify-start overflow-hidden capitalize"
                variant={!isActive ? 'ghost' : 'default'}
                onClick={() => {
                  navigate(href)
                  toggleIsOpen?.()
                }}
              >
                <Icon className="mr-2 h-4 w-4 flex-none" />
                {label}
              </Button>
            ),
      )}
    </div>
  )
}

export default DashboardsMenu
