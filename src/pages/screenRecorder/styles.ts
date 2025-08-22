import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(2),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1),
  },
}));

export const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

export const ConfigContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  minWidth: '300px',

  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

export const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '900px',
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,

  '& video': {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    
    '& video': {
      borderRadius: theme.spacing(0.5),
    },
  },
}));