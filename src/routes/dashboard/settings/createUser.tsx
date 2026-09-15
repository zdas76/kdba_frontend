import UserModal from '#/component/setting/UserModal'
import { Box, Divider, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/createUser')({
  component: CreateUser,
})

function CreateUser() {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6"> User Management</Typography>
        <UserModal />
      </Box>

      <Divider sx={{ my: 2, height: 1, opacity: 0.6, bgcolor: "#a0a0a0" }} />
      <Box>

      </Box>

    </div>
  )
}
