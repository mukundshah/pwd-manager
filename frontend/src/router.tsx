import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './global-error'

// Layouts
import DashboardLayout from './components/layouts/dashboard'
import ProtectedRoute from './components/layouts/protected-route'
import AuthLayout from '@/components/layouts/auth'
import DefaultLayout from '@/components/layouts/default'

// Pages
import Home from '@/pages'
import SignIn from '@/pages/sign-in'
import SignUp from '@/pages/sign-up'
import Dashboard from '@/pages/dashboard'
import PasswordAnalyzer from '@/pages/dashboard/feature/password-analyzer'
import PasswordGenerator from '@/pages/dashboard/feature/password-generator'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRoute />,
        children: [{
          element: <DashboardLayout />,
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />,
              children: [
                {
                  path: 'password-analyzer',
                  element: <PasswordAnalyzer />,
                },
                {
                  path: 'password-generator',
                  element: <PasswordGenerator />,
                },
              ],
            },
          ],
        }],
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
])
