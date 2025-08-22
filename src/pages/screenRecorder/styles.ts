import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 1),
  },
}));

export const PreRecordingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '600px',
  width: '100%',
  gap: theme.spacing(3),
}));

export const PostRecordingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '900px',
  width: '100%',
  gap: theme.spacing(4),
  textAlign: 'center',
}));

export const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    
    '& > *': {
      width: '100%',
      maxWidth: '300px',
    },
  },
}));

export const ConfigContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
  maxWidth: '400px',
  boxShadow: theme.shadows[1],

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
  },
}));

export const VideoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],

  '& video': {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
    borderRadius: theme.spacing(1.5),
  },

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    
    '& video': {
      borderRadius: theme.spacing(1),
    },
  },
}));