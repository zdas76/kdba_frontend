import AdvocateModal from '#/component/setting/AdvocateModal'
import { useAdvocateApi } from '#/hooks/useAdvocateApi'
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { createFileRoute } from '@tanstack/react-router'
import type { AdvocateInfo } from '#/component/setting/SattingTypes'
import { imageLink } from '#/libs/api'


export const Route = createFileRoute('/dashboard/settings/allAdvocates')({
  component: AllAdvocatesComponent,
})


function AllAdvocatesComponent() {
  const { advocates, isAdvocatesLoading, isAdvocatesError, deleteAdvocate } =
    useAdvocateApi()

  const handleDelete = (advocateId: number) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই এডভোকেটটি ডিলিট করতে চান?')) {
      deleteAdvocate(advocateId)
    }
  }

  console.log(advocates)

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Advocate Management</Typography>
        <AdvocateModal />
      </Box>

      <Divider sx={{ my: 2, height: 1, opacity: 0.6, bgcolor: '#a0a0a0' }} />

      <Box>
        {isAdvocatesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : isAdvocatesError ? (
          <Typography color="error">
            এডভোকেট তালিকা লোড করতে ব্যর্থ হয়েছে।
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="advocates table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl. No</TableCell>
                  <TableCell>ProfileImage</TableCell>
                  <TableCell>Advocate ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {advocates && advocates.length > 0 ? (
                  advocates.map((advocate: AdvocateInfo, index: number) => (
                    <TableRow
                      key={advocate.advocateId}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar
                          src={imageLink + advocate.profileImage}
                          alt={advocate.name}
                        />
                      </TableCell>
                      <TableCell>{advocate.advocateId}</TableCell>
                      <TableCell>{advocate.name}</TableCell>
                      <TableCell>{advocate.contactNo}</TableCell>
                      <TableCell>{advocate.email || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={advocate.status || 'ACTIVE'}
                          color={
                            advocate.status === 'INACTIVE'
                              ? 'default'
                              : 'success'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Delete
                          sx={{ cursor: 'pointer', color: 'red', fontSize: 22 }}
                          onClick={() => handleDelete(advocate.advocateId)}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      কোন এডভোকেট পাওয়া যায়নি।
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div >
  )
}
