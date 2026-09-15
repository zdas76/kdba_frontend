import * as React from 'react'
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Stack,
  Divider,
  Grid,
  InputAdornment,
  Paper,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import BadgeIcon from '@mui/icons-material/Badge'
import PersonIcon from '@mui/icons-material/Person'
import SchoolIcon from '@mui/icons-material/School'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { ArrowRightAltRounded } from '@mui/icons-material'
import {
  useForm,
  useFieldArray,
  Controller,
  type SubmitHandler,
} from 'react-hook-form'

export interface AdvocateEduInput {
  examName: string
  instituteName?: string
  boardName: string
  passingYear?: number
  result: string
}

export interface CreateAdvocateInputs {
  // Advocate Info
  advocateId: number
  name: string
  contactNo: string
  password: string
  email?: string
  profileImage?: File,
  placeofBirth?: string

  // Adv Profile
  fatherName?: string
  motherName?: string
  spouseName?: string
  dob?: string
  gender?: string
  presentAddress?: string
  permanentAddress?: string
  religion?: string
  nationality?: string
  nominiName?: string
  nominiRelation?: string

  // Dynamic Edu Info Array
  advocateEduInfo: AdvocateEduInput[]
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '90%', md: '80%', lg: '60%' },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: { xs: 2.5, sm: 3.5 },
}

export default function AdvocateModal() {
  const [open, setOpen] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateAdvocateInputs>({
    defaultValues: {
      advocateId: undefined,
      name: '',
      contactNo: '',
      password: '',
      email: '',
      profileImage: undefined,
      placeofBirth: '',
      fatherName: '',
      motherName: '',
      spouseName: '',
      dob: '',
      gender: '',
      presentAddress: '',
      permanentAddress: '',
      religion: '',
      nationality: 'Bangladeshi',
      nominiName: '',
      nominiRelation: '',
      advocateEduInfo: [
        {
          examName: '',
          instituteName: '',
          boardName: '',
          passingYear: undefined,
          result: '',
        },
      ],
    },
  })

  // Dynamic Array for Educational Information
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'advocateEduInfo',
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setShowPassword(false)
    reset()
  }

  const onSubmit: SubmitHandler<CreateAdvocateInputs> = (data) => {
    console.log('New Advocate Created:', data)
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
        এডভোকেট যোগ করুন
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="advocate-modal-title"
        aria-describedby="advocate-modal-description"
      >
        <Box sx={modalStyle}>
          {/* Header */}
          <Box className="flex justify-between items-center mb-2">
            <Typography
              variant="h6"
              sx={{ fontWeight: 'medium', color: '#363636ff' }}
            >
              নতুন এডভোকেট নিবন্ধন করুন
            </Typography>
            <IconButton onClick={handleClose} size="small" aria-label="close">
              <CloseIcon
                className="bg-red-700 rounded-full p-1 text-white"
                fontSize="medium"
              />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Form - All Sections in One Page View */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3.5}>
              {/* SECTION 1: BASIC INFO */}
              <Box>
                <Box className="flex items-center gap-2 mb-2.5">
                  <BadgeIcon className="text-slate-700" />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', color: '#334155' }}
                  >
                    ১. ব্যক্তিগত তথ্য (Person Information)
                  </Typography>
                </Box>
                <Grid container spacing={2} columns={12}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="এডভোকেট আইডি *"
                      placeholder=""
                      type="number"
                      size="small"
                      {...register('advocateId', {
                        required: 'এডভোকেট আইডি আবশ্যক',
                        valueAsNumber: true,
                      })}
                      onInput={(e) => console.log((e.target as HTMLInputElement).value)}
                      error={!!errors.advocateId}
                      helperText={errors.advocateId?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="এডভোকেটের নাম *"
                      placeholder="সম্পূর্ণ নাম লিখুন"
                      size="small"
                      {...register('name', {
                        required: 'এডভোকেটের নাম আবশ্যক',
                      })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="মোবাইল নম্বর *"
                      placeholder="017XXXXXXXX"
                      size="small"
                      {...register('contactNo', {
                        required: 'মোবাইল নম্বর আবশ্যক',
                      })}
                      error={!!errors.contactNo}
                      helperText={errors.contactNo?.message}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="পাসওয়ার্ড *"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="পাসওয়ার্ড লিখুন"
                      size="small"
                      {...register('password', {
                        required: 'পাসওয়ার্ড আবশ্যক',
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
                                size="small"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="ইমেইল ঠিকানা"
                      placeholder="example@mail.com"
                      type="email"
                      size="small"
                      {...register('email')}
                    />
                  </Grid>


                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="জন্মস্থান"
                      placeholder="জেলা / শহর"
                      size="small"
                      {...register('placeofBirth')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="প্রোফাইল ছবি"
                      type='file'
                      size="small"
                      focused
                      {...register('profileImage')}
                      slotProps={{
                        htmlInput: {
                          accept: 'image/*',
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* SECTION 2: PERSONAL & PROFILE INFO */}
              <Box>
                <Box className="flex items-center gap-2 mb-2.5">
                  <PersonIcon className="text-slate-700" />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', color: '#334155' }}
                  >
                    ২. অন্যান্য তথ্য (Others Information)
                  </Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="পিতার নাম"
                      placeholder="পিতার নাম লিখুন"
                      size="small"
                      {...register('fatherName')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="মাতার নাম"
                      placeholder="মাতার নাম লিখুন"
                      size="small"
                      {...register('motherName')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="স্বামী/স্ত্রীর নাম"
                      placeholder="স্বামী/স্ত্রীর নাম লিখুন"
                      size="small"
                      {...register('spouseName')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="জন্ম তারিখ"
                      type="date"
                      size="small"
                      slotProps={{ inputLabel: { shrink: true } }}
                      {...register('dob')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          fullWidth
                          label="লিঙ্গ"
                          size="small"
                        >
                          <MenuItem value="Male">পুরুষ (Male)</MenuItem>
                          <MenuItem value="Female">মহিলা (Female)</MenuItem>
                          <MenuItem value="Other">অন্যান্য (Other)</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="ধর্ম"
                      placeholder="ইসলাম / হিন্দু ইত্যাদি"
                      size="small"
                      {...register('religion')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="জাতীয়তা"
                      placeholder="বাংলাদেশী"
                      size="small"
                      {...register('nationality')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="নমিনীর নাম"
                      placeholder="নমিনীর নাম লিখুন"
                      size="small"
                      {...register('nominiName')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <TextField
                      fullWidth
                      label="নমিনীর সাথে সম্পর্ক"
                      placeholder="উদাহরণ: ভাই / স্ত্রী / সন্তান"
                      size="small"
                      {...register('nominiRelation')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="বর্তমান ঠিকানা"
                      placeholder="বর্তমান ঠিকানা লিখুন"
                      size="small"
                      {...register('presentAddress')}
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="স্থায়ী ঠিকানা"
                      placeholder="স্থায়ী ঠিকানা লিখুন"
                      size="small"
                      {...register('permanentAddress')}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* SECTION 3: EDUCATIONAL INFO (DYNAMIC ARRAY) */}
              <Box>
                <Box className="flex justify-between items-center mb-3">
                  <Box className="flex items-center gap-2">
                    <SchoolIcon className="text-slate-700" />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 'bold', color: '#334155' }}
                    >
                      ৩. শিক্ষাগত তথ্য (Educational Information)
                    </Typography>
                  </Box>
                  <Button
                    onClick={() =>
                      append({
                        examName: '',
                        instituteName: '',
                        boardName: '',
                        passingYear: undefined,
                        result: '',
                      })
                    }
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<AddIcon />}
                    sx={{ textTransform: 'none', borderRadius: 2 }}
                  >
                    শিক্ষা যোগ করুন
                  </Button>
                </Box>

                <Stack spacing={2}>
                  {fields.map((field, index) => (
                    <Paper
                      key={field.id}
                      variant="outlined"
                      sx={{ p: 2, borderRadius: 2, bgcolor: '#f8fafc' }}
                    >
                      <Box className="flex justify-between items-center mb-2">
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: '#475569' }}
                        >
                          ডিগ্রি / পরীক্ষা #{index + 1}
                        </Typography>
                        {fields.length > 1 && (
                          <IconButton
                            onClick={() => remove(index)}
                            color="error"
                            size="small"
                            aria-label="remove row"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>

                      <Grid container spacing={2} columns={10}>
                        <Grid size={{ xs: 10, sm: 2 }}>
                          <TextField
                            fullWidth
                            label="পরীক্ষার নাম *"
                            placeholder="LL.B / S.S.C"
                            size="small"
                            {...register(
                              `advocateEduInfo.${index}.examName` as const,
                              { required: 'পরীক্ষার নাম আবশ্যক' }
                            )}
                            error={
                              !!errors.advocateEduInfo?.[index]?.examName
                            }
                            helperText={
                              errors.advocateEduInfo?.[index]?.examName?.message
                            }
                          />
                        </Grid>

                        <Grid size={{ xs: 10, sm: 2 }}>
                          <TextField
                            fullWidth
                            label="বোর্ড / বিশ্ববিদ্যালয় *"
                            placeholder="ঢাকা বিশ্ববিদ্যালয়"
                            size="small"
                            {...register(
                              `advocateEduInfo.${index}.boardName` as const,
                              { required: 'বোর্ড/বিশ্ববিদ্যালয় আবশ্যক' }
                            )}
                            error={
                              !!errors.advocateEduInfo?.[index]?.boardName
                            }
                            helperText={
                              errors.advocateEduInfo?.[index]?.boardName?.message
                            }
                          />
                        </Grid>

                        <Grid size={{ xs: 10, sm: 2 }}>
                          <TextField
                            fullWidth
                            label="প্রতিষ্ঠানের নাম"
                            placeholder="স্কুল/কলেজ"
                            size="small"
                            {...register(
                              `advocateEduInfo.${index}.instituteName` as const
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 10, sm: 2 }}>
                          <TextField
                            fullWidth
                            label="পাসের বছর"
                            placeholder="2020"
                            type="number"
                            size="small"
                            {...register(
                              `advocateEduInfo.${index}.passingYear` as const,
                              { valueAsNumber: true }
                            )}
                          />
                        </Grid>

                        <Grid size={{ xs: 10, sm: 2 }}>
                          <TextField
                            fullWidth
                            label="ফলাফল / জিপিএ *"
                            placeholder="1st Class / 5.00"
                            size="small"
                            {...register(
                              `advocateEduInfo.${index}.result` as const,
                              { required: 'ফলাফল আবশ্যক' }
                            )}
                            error={
                              !!errors.advocateEduInfo?.[index]?.result
                            }
                            helperText={
                              errors.advocateEduInfo?.[index]?.result?.message
                            }
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* Modal Actions */}
              <Box className="flex justify-between items-center pt-2">
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
                  এডভোকেট সংরক্ষণ করুন <ArrowRightAltRounded sx={{ ml: 0.5 }} />
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
