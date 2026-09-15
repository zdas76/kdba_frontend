import AdvocateModal from '#/component/setting/AdvocateModal'
import { Box, Divider, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/allAdvocates')({
  component: AllAdvocatesComponent,
})

function AllAdvocatesComponent() {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Advocate Management</Typography>
        <AdvocateModal />
      </Box>

      <Divider sx={{ my: 2, height: 1, opacity: 0.6, bgcolor: '#a0a0a0' }} />
      <Box>

      </Box>
    </div>
  )
}
