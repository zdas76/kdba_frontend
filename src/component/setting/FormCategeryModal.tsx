import * as React from 'react'
import {
    Box,
    Button,
    Modal,
    Typography,
    TextField,
    IconButton,
    Stack,
    Divider,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { ArrowRightAltRounded } from '@mui/icons-material'

export interface FormCategoryInputs {
    formId: string
    formName: string
    formRate: number
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

export default function FormCategoryModal() {
    const [open, setOpen] = React.useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormCategoryInputs>({
        defaultValues: {
            formId: '',
            formName: '',
            formRate: 0,
        },
    })

    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const onSubmit: SubmitHandler<FormCategoryInputs> = (data) => {
        console.log('New Form Category Created:', data)
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
                ক্যাটাগরি তৈরি করুন
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="form-category-modal-title"
                aria-describedby="form-category-modal-description"
            >
                <Box sx={modalStyle}>
                    {/* Header */}
                    <Box className="flex justify-between items-center mb-2">
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 'medium', color: '#363636ff' }}
                        >
                            নতুন ফরম ক্যাটাগরি তৈরি করুন
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
                            {/* Form ID */}
                            <TextField
                                fullWidth
                                label="ফরম আইডি"
                                placeholder="ফরম আইডি লিখুন"
                                size="medium"
                                {...register('formId', {
                                    required: 'ফরম আইডি দেয়া আবশ্যক',
                                })}
                                error={!!errors.formId}
                                helperText={errors.formId?.message}
                            />

                            {/* Form Name */}
                            <TextField
                                fullWidth
                                label="ফরমের নাম"
                                placeholder="ফরমের নাম লিখুন"
                                size="medium"
                                {...register('formName', {
                                    required: 'ফরমের নাম দেয়া আবশ্যক',
                                })}
                                error={!!errors.formName}
                                helperText={errors.formName?.message}
                            />

                            {/* Form Rate */}
                            <TextField
                                fullWidth
                                label="ফরমের রেট"
                                placeholder="ফরমের রেট লিখুন"
                                type="number"
                                size="medium"
                                slotProps={{
                                    htmlInput: { step: 'any', min: 0 },
                                }}
                                {...register('formRate', {
                                    required: 'ফরমের রেট দেয়া আবশ্যক',
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: 'রেট ০ বা তার বেশি হতে হবে',
                                    },
                                })}
                                error={!!errors.formRate}
                                helperText={errors.formRate?.message}
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
                                    ক্যাটাগরি তৈরি করুন <ArrowRightAltRounded />
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}
