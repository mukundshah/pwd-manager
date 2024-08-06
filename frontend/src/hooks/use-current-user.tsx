// hooks/useCurrentUser.ts
import { useQuery } from '@tanstack/react-query'
import { AuthService } from '@/services/auth.service'

const authService = new AuthService()

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}
