import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Alert,
  CircularProgress
} from "@mui/material";
import { 
  Email as EmailIcon, 
  Lock as LockIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

import { Context } from "../main";
import logo from "/images/vas-blue-logo.png";

// Styled components для кастомизации
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: `3px solid #add8e6`,
  borderRadius: theme.spacing(1),
  boxShadow: '0 0 10px #add8e6',
  maxWidth: 450,
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(1)
  }
}));

const LogoContainer = styled(Box)({
  textAlign: 'center',
  marginBottom: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2
});

const LogoImage = styled('img')({
  height: 80,
  width: 'auto',
  objectFit: 'contain',
  marginBottom: 1
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  maxWidth: 240,
  margin: 'auto'
});

const SubmitButton = styled(Button)({
  backgroundColor: '#87bcd4',
  color: '#000',
  fontWeight: 'bold',
  padding: '10px 0',
  width: 175,
  margin: 'auto',
  '&:hover': {
    backgroundColor: '#6ba8c0',
  },
  '&:disabled': {
    backgroundColor: '#cccccc',
    color: '#666666'
  }
});

const AuthPage = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { store } = useContext(Context);

  useEffect(() => {
    if (store.isAuth) {
      console.log("✅ User authenticated, redirecting to dashboard...");
      navigate("/dashboard", { replace: true });
    }
  }, [store.isAuth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await store.login({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <StyledPaper elevation={8}>
          <LogoContainer>
            <LogoImage 
              src={logo} 
              alt="VAS Plumbing Store Logo" 
              onError={(e) => {
                // Fallback если изображение не загрузится
                console.error('Failed to load logo');
                e.currentTarget.style.display = 'none';
              }}
            />
            <Typography 
              variant="h5" 
              component="h1" 
              fontWeight="bold" 
              color="#333"
              gutterBottom
            >
              Вход
            </Typography>
          </LogoContainer>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate>
            <FormContainer>
              {/* Email поле */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#add8e6',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#8bc3d8'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3399ff'
                    },
										mb: 3
                  }
                }}
              />

              {/* Пароль */}
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: <LockIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#add8e6',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#8bc3d8'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3399ff'
                    },
										mb: 3
                  }
                }}
              />

              {/* Кнопка отправки */}
              <SubmitButton
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={16} /> : null}
								onClick={handleSubmit}
              >
                {loading ? 'Загрузка...' : 'Войти'}
              </SubmitButton>
            </FormContainer>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Футер */}
          <Box 
            sx={{ 
              mt: 4, 
              textAlign: 'center' 
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Контакты: info@plumbingstore.com | Телефон: +1 123 456 7890
            </Typography>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
});

export default AuthPage;