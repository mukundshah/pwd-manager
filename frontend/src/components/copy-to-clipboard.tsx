import React, { useReducer } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus as LucidePlus } from 'lucide-react'
import { Button } from './ui/button'
import AddNewPasswoForm from './forms/add-new-password-form'
import { CategoryService } from '@/services/category.service'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const categoryService = new CategoryService()

const AddNewPasswordDialog = () => {
  const [isOpen, toggleIsOpen] = useReducer(state => !state, false)

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
  })

  return (
    <Dialog onOpenChange={toggleIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>
          <LucidePlus className="mr-2 h-4 w-4" />
          Add new password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to create a new password and save.
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddNewPasswoForm
            categories={categories}
            toggleIsOpen={toggleIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewPasswordDialog
