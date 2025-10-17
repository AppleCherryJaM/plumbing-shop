// admin/src/components/UI/LoadingSpinner.tsx
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({ message = 'Loading...' } : LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: 2,
      }}
    >
      <CircularProgress 
        size={60} 
        sx={{ 
          color: '#add8e6',
          animationDuration: '0.8s',
        }} 
      />
      <Typography 
        variant="h6" 
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  );
};