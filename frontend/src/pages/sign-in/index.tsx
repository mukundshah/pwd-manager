import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import SignInForm from '@/components/forms/signin-form'
import { AuthService } from '@/services/auth.service'

const SignInPage: React.FC = () => {
  if (AuthService.loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (

    <div className="relative flex min-h-screen items-center justify-center">
      <Link
        to="/sign-up"
        className="absolute right-10 top-8 text-sm capitalize underline-offset-4 transition-all duration-300 hover:underline"
      >
        register
      </Link>

      <div className="min-w-[420px] space-y-5">
        <div className="space-y-1.5 text-center">
          <h1 className="text-3xl font-light">
            <Link to="/" className="font-bold">
              PWD Manager
            </Link>
          </h1>
          <p className="text-sm text-zinc-500 [text-wrap:balance]">
            <span className="font-bold">Login</span>
            {' '}
            to continue using this app
          </p>
        </div>
        <div className="p-5 md:p-0">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default SignInPage
