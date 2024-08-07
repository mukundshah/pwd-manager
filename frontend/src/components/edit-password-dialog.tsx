import React, { useReducer } from 'react'
import { Edit as LucideEdit } from 'lucide-react'
import EditPasswordForm from './forms/edit-password-form'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import type { Category, Password } from '@/types'

interface EditPasswordDialogProps {
  categories: Category[]
  password: Password
}

const EditPasswordDialog: React.FC<EditPasswordDialogProps> = ({ categories, password }) => {
  const [isOpen, toggleIsOpen] = useReducer(state => !state, false)

  if (!password) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex-1" size="sm">
          <LucideEdit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>
            Enter the necessary information to edit this password and save.
          </DialogDescription>
        </DialogHeader>
        <div>
          <EditPasswordForm
            categories={categories}
            password={password}
            toggleIsOpen={toggleIsOpen}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPasswordDialog
