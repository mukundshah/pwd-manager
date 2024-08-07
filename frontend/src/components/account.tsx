import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Home as HomeIcon, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { AuthService } from '@/services/auth.service'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AccountProps {
  currentUser: {
    email: string
    name: string
  } | null
}

const Account = ({ currentUser }: AccountProps) => {
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault()
    setIsLoggingOut(true)
    AuthService.logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <div className="flex w-full items-center justify-between">
            <div className="overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/adventurer-neutral/png?seed=${currentUser?.email}`}
                alt={`${currentUser?.name} profile photo`}
                className="mr-2 inline-flex h-6 w-6 items-center rounded-full object-cover"
              />
              {currentUser?.email}
            </div>
            <ChevronDown className="bg-background" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[15dvw]">
        <DropdownMenuItem onClick={() => navigate('/')} disabled={isLoggingOut}>
          <HomeIcon className="mr-2 h-5 w-5" />
          Back To Home
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-5 w-5" />
          {isLoggingOut ? 'Logging Out...' : 'Log Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Account
