import * as React from 'react'
import UserModal from '#/component/setting/UserModal'
import { useUserApi } from '#/hooks/useUserApi'
import type { User } from '#/hooks/useUserApi'
import { Box, Divider, Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Delete, Edit } from '@mui/icons-material'

export const Route = createFileRoute('/dashboard/settings/createUser')({
  component: CreateUser,
})

function CreateUser() {
  const { users, deleteUser } = useUserApi()
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const handleCloseEdit = () => {
    setSelectedUser(null)
    setIsEditOpen(false)
  }

  const handleDelete = (id?: number) => {
    if (!id) return
    if (window.confirm('আপনি কি নিশ্চিত যে এই ইউজারটি ডিলিট করতে চান?')) {
      deleteUser(id)
    }
  }

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6"> User Management</Typography>
        <UserModal />
      </Box>
      <Divider sx={{ my: 2, height: 1, opacity: 0.6, bgcolor: '#a0a0a0' }} />
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sl. No</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Contact</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.userName}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.contact}</TableCell>
                  <TableCell align="right">{user.role}</TableCell>
                  <TableCell align="right">
                    <Edit
                      sx={{ cursor: 'pointer', color: 'green', fontSize: 25 }}
                      onClick={() => handleEdit(user)}
                    />
                    <Delete
                      sx={{
                        cursor: 'pointer',
                        color: 'red',
                        marginInlineStart: 1,
                        fontSize: 25,
                      }}
                      onClick={() => handleDelete(user.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit User Modal */}
      {selectedUser && (
        <UserModal
          open={isEditOpen}
          onClose={handleCloseEdit}
          userToEdit={selectedUser}
        />
      )}
    </div>
  )
}
