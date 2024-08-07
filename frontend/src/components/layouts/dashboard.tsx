import React from 'react'
import { Outlet } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/use-current-user'
import Container from '@/components/container'
import DashboardNavigation from '@/components/dashboard-navigation'
import Sidebar from '@/components/sidebar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

const DashboardLayout = () => {
  const { data: currentUser, isLoading } = useCurrentUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container className="max-w-screen-3xl">
      <DashboardNavigation />

      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        <ResizablePanel defaultSize={19} className="hidden md:block">
          <Sidebar currentUser={currentUser} />
        </ResizablePanel>

        <ResizableHandle withHandle className="hidden md:flex" />

        <ResizablePanel defaultSize={81}>
          <div className="max-h-screen overflow-y-auto">
            <Container className="max-w-screen-lg px-5 py-3">
              <Outlet />
            </Container>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Container>
  )
}

export default DashboardLayout
