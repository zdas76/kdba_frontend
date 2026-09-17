import * as React from 'react'
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    MenuItem,
    IconButton,
    InputAdornment,
    Stack,
    Divider,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { ArrowRightAltRounded } from '@mui/icons-material'
import { useUserApi, type User } from '#/hooks/useUserApi'

export interface CreateUserInputs {
    id?: number
    userName: string
    name: string
    contact: string
    password?: string
    role: 'USER' | 'ADMIN' | 'OFFICE'
}

export interface UserModalProps {
    open?: boolean
    onClose?: () => void
    userToEdit?: User | null
}

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 3,
}

export default function UserModal({ open: externalOpen, onClose, userToEdit }: UserModalProps = {}) {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const isControlled = externalOpen !== undefined
    const open = isControlled ? externalOpen : internalOpen
    const isEditMode = Boolean(userToEdit)

    const { createUser, updateUser } = useUserApi()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserInputs>({
        defaultValues: {
            userName: '',
            name: '',
            contact: '',
            password: '',
            role: 'USER',
        },
    })

    React.useEffect(() => {
        if (open) {
            if (userToEdit) {
                reset({
                    userName: userToEdit.userName || '',
                    name: userToEdit.name || '',
                    contact: userToEdit.contact || '',
                    password: '',
                    role: userToEdit.role || 'USER',
                })
            } else {
                reset({
                    userName: '',
                    name: '',
                    contact: '',
                    password: '',
                    role: 'USER',
                })
            }
        }
    }, [open, userToEdit, reset])

    const handleOpen = () => setInternalOpen(true)
    const handleClose = () => {
        if (isControlled && onClose) {
            onClose()
        } else {
            setInternalOpen(false)
        }
        setShowPassword(false)
        reset()
    }

    const onSubmit: SubmitHandler<CreateUserInputs> = async (data) => {
        try {
            if (isEditMode && userToEdit?.id) {
                const updatePayload: Partial<User> = {
                    name: data.name,
                    contact: data.contact,
                    role: data.role,
                }
                await updateUser({ id: userToEdit.id, data: updatePayload })
            } else {
                await createUser(data)
            }
            handleClose()
        } catch (error: any) {
            if (error.response?.data?.message) {
                console.error('❌ Backend Validation Errors:', error.response.data.message)
            } else {
                console.error(isEditMode ? 'Error updating user:' : 'Error creating user:', error)
            }
        }
    }

    return (
        <div>
            {!isControlled && (
                <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="success"
                    startIcon={<AddCircleIcon />}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                >
                    ইউজার তৈরি করুন
                </Button>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-modal-title"
                aria-describedby="user-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Header */}
                    <Box className="flex justify-between items-center mb-2">
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'medium', color: '#363636ff' }}
                        >
                            {isEditMode ? 'ইউজার সম্পাদনা করুন' : 'নতুন ইউজার তৈরি করুন'}
                        </Typography>
                        <IconButton onClick={handleClose} size="small" aria-label="close">
                            <CloseIcon
                                className="bg-red-700 rounded-full p-1 text-white"
                                fontSize="medium"
                            />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2.5}>
                            {/* User Name */}
                            {!isEditMode && <TextField
                                fullWidth
                                label="ইউজারনেম"
                                placeholder="ইউজারনেম লিখুন"
                                size="medium"
                                disabled={isEditMode}
                                {...register('userName', {
                                    required: 'ইউজারনেম দেয়া আবশ্যক',
                                })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            />}

                            {/* Full Name */}
                            <TextField
                                fullWidth
                                label="নাম"
                                placeholder="সম্পূর্ণ নাম লিখুন"
                                size="medium"
                                {...register('name', {
                                    required: 'নাম দেয়া আবশ্যক',
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />

                            {/* Contact */}
                            <TextField
                                fullWidth
                                label="যোগাযোগের নম্বর"
                                placeholder="ফোন/যোগাযোগের নম্বর লিখুন"
                                size="medium"
                                {...register('contact', {
                                    required: 'যোগাযোগের নম্বর দেয়া আবশ্যক',
                                })}
                                error={!!errors.contact}
                                helperText={errors.contact?.message}
                            />

                            {/* Password */}
                            {!isEditMode && <TextField
                                fullWidth
                                label="পাসওয়ার্ড"
                                type={showPassword ? 'text' : 'password'}
                                placeholder={
                                    isEditMode
                                        ? 'পাসওয়ার্ড পরিবর্তনযোগ্য নয়'
                                        : 'পাসওয়ার্ড লিখুন'
                                }
                                size="medium"
                                disabled={isEditMode}
                                {...register('password', {
                                    validate: (value) => {
                                        if (!isEditMode && (!value || value.trim() === '')) {
                                            return 'পাসওয়ার্ড দেয়া আবশ্যক'
                                        }
                                        if (!isEditMode && value && value.length < 6) {
                                            return 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে'
                                        }
                                        return true
                                    },
                                })}
                                error={!!errors.password}
                                helperText={isEditMode ? 'পাসওয়ার্ড পরিবর্তনযোগ্য নয়' : errors.password?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: !isEditMode ? (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="medium"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    },
                                }}
                            />}

                            {/* Role */}
                            <Controller
                                name="role"
                                control={control}
                                rules={{ required: 'রোল নির্বাচন আবশ্যক' }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="ইউজার রোল"
                                        size="medium"
                                        error={!!errors.role}
                                        helperText={errors.role?.message}
                                    >
                                        <MenuItem value="USER">USER</MenuItem>
                                        <MenuItem value="ADMIN">ADMIN</MenuItem>
                                        <MenuItem value="OFFICE">OFFICE</MenuItem>
                                    </TextField>
                                )}
                            />

                            {/* Modal Actions */}
                            <Box className="flex justify-between pt-2">
                                <Button
                                    onClick={handleClose}
                                    variant="outlined"
                                    color="error"
                                    sx={{ borderRadius: 2, textTransform: 'none' }}
                                >
                                    বাতিল
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    disabled={isSubmitting}
                                    sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                                >
                                    {isEditMode ? 'আপডেট করুন' : 'ইউজার তৈরি করুন'} <ArrowRightAltRounded />
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
