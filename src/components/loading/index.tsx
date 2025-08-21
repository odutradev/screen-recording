import { CircularProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import { Container } from './styles';

import type { LoadingProps } from './types';

const Loading = ({ showSpinner = true,  message = 'Carregando' }: LoadingProps) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {showSpinner && <CircularProgress />}
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}{dots}
      </Typography>
    </Container>
  );
};

export default Loading;
