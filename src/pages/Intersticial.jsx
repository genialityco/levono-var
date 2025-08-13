import { Center, Stack, Text } from '@mantine/core'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Intersticial() {
  const navigate = useNavigate()
  const { state } = useLocation() // { id, result }

  useEffect(() => {
    const t = setTimeout(() => navigate('/gracias', { state }), 1200)
    return () => clearTimeout(t)
  }, [navigate, state])

  return (
    <Center mih="70vh">
      <Stack align="center">
        <Text fw={700}>Lenovo VAR DESK</Text>
        <Text c="dimmed">Procesando…</Text>
      </Stack>
    </Center>
  )
}
