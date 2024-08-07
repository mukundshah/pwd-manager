import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div>
      {/* Your header, navigation, etc. */}
      <main>
        <Outlet />
      </main>
      {/* Your footer, etc. */}
    </div>
  )
}

export default DefaultLayout
