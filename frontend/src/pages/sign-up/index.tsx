import { Link, Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/use-current-user'
import SignUpForm from '@/components/forms/signup-form'

const SignUpPage = () => {
  const { data: currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div> // Or a more sophisticated loading component
  }

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Link
        to="/sign-in"
        className="absolute right-10 top-8 text-sm capitalize underline-offset-4 transition-all duration-300 hover:underline"
      >
        sign in
      </Link>

      <div className="min-w-[420px] space-y-5">
        <div className="space-y-1.5 text-center">
          <h1 className="text-3xl font-light">
            Next/
            <Link to="/" className="font-bold">
              Passw*ird
            </Link>
          </h1>
          <p className="text-sm text-zinc-500 [text-wrap:balance]">
            <span className="font-bold">Register</span>
            {' '}
            to continue using this
            app
          </p>
        </div>
        <div className="p-5 md:p-0">
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
