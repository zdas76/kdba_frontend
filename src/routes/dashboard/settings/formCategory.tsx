import FormCategoryModal from '#/component/setting/FormCategeryModal'
import { Box, Divider, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings/formCategory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography variant="h6"> Form Category Management</Typography>
      <FormCategoryModal />
    </Box>

    <Divider sx={{ my: 2, height: 1, opacity: 0.6, bgcolor: "#a0a0a0" }} />
    <Box>

    </Box>
  </div>
}
