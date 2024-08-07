import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import type { TLogin } from '@/validators/auth-schema'
import { loginSchema } from '@/validators/auth-schema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AuthService } from '@/services/auth.service' // You'll need to create this

const authService = new AuthService()

const SignInForm: React.FC = () => {
  const navigate = useNavigate()
  const [seePassword, toggleSeePassword] = useReducer(state => !state, false)

  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: TLogin) => {
      return authService.login({
        email: values.emailOrUsername,
        password: values.password,
      })
    },
    onSuccess: () => {
      toast.success('Logged in')
      navigate('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: TLogin) => {
    await mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrUsername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email/username"
                  disabled={isPending}
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-1.5">
                  <Input
                    disabled={isPending}
                    type={seePassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={toggleSeePassword}
                  >
                    {
                      seePassword
                        ? <EyeOffIcon className="h-4 w-4 text-zinc-700" />
                        : <EyeIcon className="h-4 w-4 text-zinc-700" />
                    }
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Log In...' : 'Log In'}
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
