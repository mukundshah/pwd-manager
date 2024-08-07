import React, { useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { CategoryService } from '@/services/category.service'
import { cn } from '@/lib/utils'

const categoryService = new CategoryService()

interface CategoriesMenuProps {
  variant: 'DESKTOP' | 'MOBILE'
  toggleIsOpen?: () => void
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ variant, toggleIsOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
  })

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (!value) {
        params.delete(name)
      } else {
        params.set(name, value)
      }

      return params.toString()
    },
    [searchParams],
  )

  if (isLoading) {
    return (
      <div className="space-y-0.5">
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className="h-10 w-full rounded"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-0.5">
      {categories.map(({ id, name }) => {
        const isActive = searchParams.get('category') === id.toString()

        return (
          <Button
            key={id}
            className={cn('w-full justify-start overflow-hidden capitalize')}
            variant={isActive ? 'secondary' : 'ghost'}
            onClick={() => {
              const newSearch = createQueryString('category', id.toString())
              navigate(`${location.pathname}?${newSearch}`)

              if (variant === 'MOBILE') {
                toggleIsOpen?.()
              }
            }}
          >
            {name}
          </Button>
        )
      })}
    </div>
  )
}

export default CategoriesMenu
