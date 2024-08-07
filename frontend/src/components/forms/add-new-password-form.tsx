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
import type { Category } from '@/types'

interface AddNewPasswoFormProps {
  categories: Category[]
  toggleIsOpen: React.DispatchWithoutAction
}

const passwordService = new PasswordService()

const AddNewPasswoForm: React.FC<AddNewPasswoFormProps> = ({
  categories,
  toggleIsOpen,
}) => {
  const [seePassword, toggleSeePassword] = useReducer(state => !state, false)
  const queryClient = useQueryClient()

  const form = useForm<TPasswordSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      url: '',
      category: '',
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: TPasswordSchema) => passwordService.createPassword({
      category: Number.parseInt(values.category),
      url: values.url,
      email: values.email,
      username: values.username || '',
      password: values.password,
      website_name: values.websiteName,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] })
      toast.success('Password created successfully')
      form.reset()
      toggleIsOpen()
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = async (values: TPasswordSchema) => {
    await mutateAsync(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="category"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    autoFocus
                    disabled={isPending}
                    className="capitalize"
                  >
                    <SelectValue placeholder="Select Categories" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem
                      disabled={isPending}
                      key={category.id}
                      value={category.id.toString()}
                      className="capitalize"
                    >
                      {/* <CategoryIcon
                        category={category.slug}
                        className="mr-3 inline-flex"
                      /> */}
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
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter website name" {...field} />
              </FormControl>
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
              <FormLabel>
                Email
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
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
                <div className="flex items-center space-x-3">
                  <Input
                    type={seePassword ? 'text' : 'password'}
                    placeholder="Enter password"
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
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URL
                {' '}
                <span className="text-zinc-500">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter website URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}

export default AddNewPasswoForm
