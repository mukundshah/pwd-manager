import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: Readonly<React.ReactNode>
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('mx-auto max-w-screen-2xl', className)}>{children}</div>
  )
}

export default Container
