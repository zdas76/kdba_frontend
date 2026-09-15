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

export interface CreateUserInputs {
    userName: string
    name: string
    userId: string
    contact: string
    password: string
    role: 'USER' | 'ADMIN' | 'ADVOCATE'
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

export default function UserModal() {
    const [open, setOpen] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

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
            userId: '',
            contact: '',
            password: '',
            role: 'USER',
        },
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setShowPassword(false)
        reset()
    }

    const onSubmit: SubmitHandler<CreateUserInputs> = (data) => {
        console.log('New User Created:', data)
        // Handle API submission logic here
        handleClose()
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="success"
                startIcon={<AddCircleIcon />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
                ইউজার তৈরি করুন
            </Button>

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
                            নতুন ইউজার তৈরি করুন
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
                            <TextField
                                fullWidth
                                label="ইউজারনেম"
                                placeholder="ইউজারনেম লিখুন"
                                size="medium"
                                {...register('userName', {
                                    required: 'ইউজারনেম দেয়া আবশ্যক',
                                })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            />

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

                            {/* User ID */}
                            <TextField
                                fullWidth
                                label="ইউজার আইডি"
                                placeholder="ইউজার আইডি লিখুন"
                                size="medium"
                                {...register('userId', {
                                    required: 'ইউজার আইডি দেয়া আবশ্যক',
                                })}
                                error={!!errors.userId}
                                helperText={errors.userId?.message}
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
                            <TextField
                                fullWidth
                                label="পাসওয়ার্ড"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="পাসওয়ার্ড লিখুন"
                                size="medium"
                                {...register('password', {
                                    required: 'পাসওয়ার্ড দেয়া আবশ্যক',
                                    minLength: {
                                        value: 6,
                                        message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে',
                                    },
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    size="medium"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

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
                                    ইউজার তৈরি করুন <ArrowRightAltRounded />
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
