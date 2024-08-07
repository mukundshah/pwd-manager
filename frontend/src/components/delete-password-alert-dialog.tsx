import React, { useReducer } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Trash2 as LucideTrash2 } from 'lucide-react'
import { Button } from './ui/button'
import { PasswordService } from '@/services/password.service'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const passwordService = new PasswordService()

const DeletePasswordAlertDialog = ({ passwordId }) => {
  const [isOpen, toggleIsOpen] = useReducer(state => !state, false)
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: id => passwordService.deletePassword(id),
    onSuccess: () => {
      toast.success('Password deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['passwords'] })
      toggleIsOpen()
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete password')
    },
  })

  return (
    <AlertDialog onOpenChange={toggleIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex-1" size="sm">
          <LucideTrash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Password</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this password permanently?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex">
          <AlertDialogCancel className="flex-1" disabled={isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 bg-rose-500"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault()
              mutateAsync(passwordId)
            }}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePasswordAlertDialog
