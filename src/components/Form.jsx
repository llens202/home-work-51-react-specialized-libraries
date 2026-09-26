import { Button, CircularProgress, Box, Container, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Імпортуємо бібліотеки
import { toast } from 'react-toastify'; 
import { FaUserPlus } from 'react-icons/fa'; 
import { useIdleTimer } from 'react-idle-timer'; 
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react'; // Іконки для всіх полів

const MotionBox = motion.create(Box);

function Form() {
  const [isLoading, setIsLoading] = useState(false);

  // Налаштування таймера бездіяльності
  useIdleTimer({
    timeout: 1000 * 60 * 1, 
    onIdle: () => {
      toast.warning('Ви ще тут? Заповніть форму, щоб не втратити дані.', {
        autoClose: 5000,
      });
    },
    throttle: 500 
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Реєстрація пройшла успішно!');
    }, 2000);
  };

  const onError = () => {
    toast.error('Будь ласка, виправте помилки у формі');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <MotionBox
        component="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        initial={{ opacity: 0, y: 100, scale: 0.9 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }}     
        transition={{ duration: 0.8, ease: "easeOut" }} 
        sx={{
          width: '100%',
          maxWidth: 400
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">
            Реєстрація
          </Typography>

          {/* Поле Name з іконкою */}
          <TextField
            variant="outlined"
            type="text"
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={20} color="#666" />
                  </InputAdornment>
                ),
              },
            }}
            {...register('name', {
              required: "Ім'я обов'язкове",
              minLength: {
                value: 2,
                message: "Ім'я повинно містити щонайменше 2 символи"
              }
            })}
          />

          {/* Поле Email з іконкою */}
          <TextField
            variant="outlined"
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} color="#666" />
                  </InputAdornment>
                ),
              },
            }}
            {...register('email', {
              required: "Email обов'язковий",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введіть коректний email'
              }
            })}
          />

          {/* Поле Password з іконкою */}
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} color="#666" />
                  </InputAdornment>
                ),
              },
            }}
            {...register('password', {
              required: "Пароль обов'язковий",
              minLength: {
                value: 8,
                message: 'Пароль повинен містити щонайменше 8 символів'
              }
            })}
          />

          {isLoading && <CircularProgress />}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<FaUserPlus />} 
            sx={{
              padding: 2,
              '&:hover': {
                backgroundColor: 'blue'
              }
            }}
          >
            Увійти
          </Button>
        </Stack>
      </MotionBox>
    </Container>
  );
}

export default Form;