import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

import type { TRegister } from '@/validators/auth-schema'
import { registerSchema } from '@/validators/auth-schema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { AuthService } from '@/services/auth.service'

const authService = new AuthService()

const SignUpForm: React.FC = () => {
  const [seePassword, toggleSeePassword] = useReducer(state => !state, false)
  const navigate = useNavigate()

  const form = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: TRegister) => {
      const { acceptTerms, ...rest } = values
      return authService.register(rest)
    },
    onSuccess: (_data) => {
      toast.success(`Now you can login`)
      form.reset()
      navigate('/sign-in')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (values: TRegister) => {
    mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" autoFocus {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique username that others will see.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isPending}
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

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  disabled={isPending}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Register...' : 'Register'}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
