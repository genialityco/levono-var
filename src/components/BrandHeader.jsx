import { Box, Container, Group, Text } from '@mantine/core'

export default function BrandHeader() {
  return (
    <Box bg="#1a1a1a" c="white" py="xs">
      <Container size="lg">
        <Group justify="space-between">
          <Text fw={700}>Lenovo VAR DESK — Experiencia 7</Text>
        </Group>
      </Container>
    </Box>
  )
}
