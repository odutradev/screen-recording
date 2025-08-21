import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Container = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 2),
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    display: 'flex',
}));