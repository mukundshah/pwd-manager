// src/components/ProtectedRoute.jsx
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/use-current-user'

const ProtectedRoute = () => {
  const { data: currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/sign-in" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
