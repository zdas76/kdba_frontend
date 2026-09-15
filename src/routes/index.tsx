import { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'
import { useForm, type SubmitHandler } from 'react-hook-form'

// Icons
import {
  Gavel,
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Security,
  Badge,
  ArrowForward,
} from '@mui/icons-material'

export const Route = createFileRoute('/')({ component: Home })

type Inputs = {
  userName: string
  password: string
}

type UserRole = 'advocate' | 'admin'

function Home() {
  const [activeRole, setActiveRole] = useState<UserRole>('advocate')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('Login submitted:', { ...data, role: activeRole })
    setIsLoading(true)
    reset()

  }

  return (
    <div className="relative overflow-x-hidden h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 px-3 py-6 sm:p-6 md:p-10">

      {/* Centered Responsive Glass Container */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl sm:rounded-3xl glass-panel-gold p-3.5 sm:p-6 md:p-8 shadow-2xl border border-amber-500/20">
        <div className="bg-slate-900/90 rounded-xl sm:rounded-2xl border border-slate-800/90 p-4 sm:p-6 md:p-8 shadow-xl space-y-4 sm:space-y-6">

          {/* Centered Header with Logo Seal & Title */}
          <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 pb-3 border-b border-slate-800/80">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-500" />
              <img
                src="/logo.png"
                alt="KDBA Logo Seal"
                className="relative w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-full shadow-xl transform transition duration-500 group-hover:scale-105"
              />
            </div>
            <div>
              <h1 className="font-serif-legal text-xl sm:text-2xl font-bold tracking-tight text-amber-400 flex items-center justify-center gap-1.5 sm:gap-2">
                KDBA Portal Login <Gavel className="text-amber-500 !w-4 sm:!w-5 !h-4 sm:!h-5" />
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                Select your role (Advocate or Admin) to sign in
              </p>
            </div>

          </div>

          {/* 2 Role Selection Tabs: Advocate & Admin */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveRole('advocate')}
              className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${activeRole === 'advocate'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
            >
              <Badge className="!w-4 !h-4" />
              <span>Advocate Portal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole('admin')}
              className={`py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 ${activeRole === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
            >
              <Security className="!w-4 !h-4" />
              <span>Admin Portal</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 sm:space-y-4">
            <Box className="mb-6 space-y-4">
              {/* Username Input */}
              <TextField
                fullWidth
                id="userName"
                autoComplete="username"
                label={
                  activeRole === 'advocate'
                    ? 'Advocate ID'
                    : 'Admin Username'
                }
                variant="outlined"
                {...register('userName', {
                  required: 'Username or Advocate ID is required',
                })}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person className="text-amber-500/80 !w-4 sm:!w-5 !h-4 sm:!h-5" />
                      </InputAdornment>
                    ),
                  },
                }}

                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
                  },
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px #0f172a inset !important',
                    WebkitTextFillColor: '#f8fafc !important',
                    caretColor: '#f8fafc !important',
                    transition: 'background-color 50000s ease-in-out 0s !important',
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8', fontSize: '0.875rem' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
                  '& .MuiFormHelperText-root': { color: '#f87171' },
                  marginBottom: 3
                }}
              />

              {/* Password Input */}
              <TextField
                fullWidth
                id="password"
                autoComplete="current-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                {...register('password', {
                  required: 'Password is required',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-amber-500/80 !w-4 sm:!w-5 !h-4 sm:!h-5" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          className="!text-slate-400 hover:!text-amber-400"
                        >
                          {showPassword ? (
                            <VisibilityOff className="!w-4 sm:!w-5 !h-4 sm:!h-5" />
                          ) : (
                            <Visibility className="!w-4 sm:!w-5 !h-4 sm:!h-5" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    borderRadius: '12px',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                    '&:hover fieldset': { borderColor: 'rgba(245, 158, 11, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#f59e0b' },
                  },
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px #0f172a inset !important',
                    WebkitTextFillColor: '#f8fafc !important',
                    caretColor: '#f8fafc !important',
                    transition: 'background-color 50000s ease-in-out 0s !important',
                  },
                  '& .MuiInputLabel-root': { color: '#94a3b8', fontSize: '0.875rem' },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#fbbf24' },
                  '& .MuiFormHelperText-root': { color: '#f87171' },
                }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.4,
                mt: 1,
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: { xs: '0.875rem', sm: '0.95rem' },
                textTransform: 'none',
                letterSpacing: '0.025em',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: '#0f172a',
                boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
                  boxShadow: '0 6px 25px rgba(217, 119, 6, 0.45)',
                },
              }}
              endIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <ArrowForward />
                )
              }
            >
              {isLoading
                ? 'Authenticating...'
                : `Sign In as ${activeRole === 'advocate' ? 'Advocate' : 'Admin'}`}
            </Button>
          </form>


        </div>
      </div>

      {/* Toast Notification */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={5000}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setToastMessage(null)}
          severity="success"
          variant="filled"
          sx={{
            width: '100%',
            backgroundColor: '#065f46',
            color: '#ecfdf5',
            fontWeight: 600,
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div >
  )
}

