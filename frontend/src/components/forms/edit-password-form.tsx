import React, { useReducer } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Button } from '@/components/ui/button'
import { PasswordService } from '@/services/password.service'
import type { TPasswordSchema } from '@/validators/password-schema'
import { passwordSchema } from '@/validators/password-schema'
import type { Category, Password } from '@/types'

interface EditPasswordFormProps {
  toggleIsOpen: () => void
  categories: Category[]
  password: Password
}

const passwordService = new PasswordService()

const EditPasswordForm: React.FC<EditPasswordFormProps> = ({
  password,
  categories,
  toggleIsOpen,
}) => {
  const [seePassword, toggleSeePassword] = useReducer(state => !state, false)
  const queryClient = useQueryClient()

  const form = useForm<TPasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      websiteName: password.website_name,
      username: password?.username || undefined,
      email: password?.email || undefined,
      password: password.password,
      url: password?.url || undefined,
      category: password.category.id,
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: TPasswordSchema) => passwordService.updatePassword(password.id, {
      category: Number.parseInt(values.category),
      url: values.url,
      email: values.email,
      username: values.username || '',
      password: values.password,
      website_name: values.websiteName,
    }),
    onSuccess: () => {
      toast.success('Password updated successfully')
      queryClient.invalidateQueries({ queryKey: ['passwords'] })
      toggleIsOpen()
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (values: TPasswordSchema) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger autoFocus disabled={isPending}>
                    <SelectValue placeholder="Select Categories" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.id}
                      className="capitalize"
                      disabled={isPending}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter website name"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter username"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
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
                <div className="flex items-center space-x-3">
                  <Input
                    type={seePassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    disabled={isPending}
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
              <FormDescription>
                Enter the password for the website or service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter website URL"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Form>
  )
}

export default EditPasswordForm
