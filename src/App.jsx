import { Outlet, useLocation } from 'react-router-dom'
import { Stack } from '@mantine/core'
import BrandHeader from './components/BrandHeader'
import FooterBanner from './components/FooterBanner'
import IdleGuard from './components/IdleGuard'
import BackgroundAudio from './components/BackgroundAudio'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <Stack gap={0} mih="100vh" justify="space-between">
      <BackgroundAudio />
      {isHome}
      <IdleGuard timeoutMs={60000} />
      <Outlet />
      {isHome}
    </Stack>
  )
}

