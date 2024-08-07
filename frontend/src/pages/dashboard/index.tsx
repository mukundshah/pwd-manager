import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import { PasswordService } from '@/services/password.service'
import { CategoryService } from '@/services/category.service'
import AddNewPasswordDialog from '@/components/add-new-password-dialog'
import Header from '@/components/header'
import PasswordCollectionCard from '@/components/password-collection-card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'

const passwordService = new PasswordService()
const categoryService = new CategoryService()

const DashboardPage = () => {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  const search = searchParams.get('search')

  const { data: passwords = [], isLoading: isLoadingPasswords } = useQuery({
    queryKey: ['passwords', category, search],
    queryFn: () => passwordService.getAllPasswords(),
    // select: data => data.filter(pwd =>
    //   (!category || pwd.category === category)
    //   && (!search || pwd.name.toLowerCase().includes(search.toLowerCase())),
    // ),
  })

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
  })

  const isLoading = isLoadingPasswords || isLoadingCategories

  if (isLoading) {
    return (
      <div className="space-y-2.5">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-20 w-full rounded" />
        ))}
      </div>
    )
  }

  return (
    <>
      <Header
        title="All Passwords"
        description="Safety manage and access your passwords."
        className="mt-5"
      />

      <div className="mb-6 flex items-center space-x-3">
        <AddNewPasswordDialog categories={categories} />
      </div>

      <div className="space-y-2.5">
        {!passwords.length
          ? (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>No Password Found</AlertTitle>
                <AlertDescription>
                  Looks like you haven't added any passwords yet.
                </AlertDescription>
              </Alert>
            )
          : (
              passwords.map((password, index) => (
                <PasswordCollectionCard
                  key={index}
                  password={password}
                />
              ))
            )}
      </div>
    </>
  )
}

export default DashboardPage
