import { useState, useRef } from 'react';
import { Box, Button, Typography, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { PlayArrow, Stop, Download, Videocam } from '@mui/icons-material';

import { Container, VideoContainer, ControlsContainer, ConfigContainer } from './styles';

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [includeAudio, setIncludeAudio] = useState(true);
  const [error, setError] = useState<string>('');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      setError('');
      chunksRef.current = [];

      const displayMediaOptions: DisplayMediaStreamOptions = {
        video: {
          displaySurface: 'browser'
        },
        audio: includeAudio
      };

      const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      
      if (includeAudio) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const audioTrack = audioStream.getAudioTracks()[0];
          if (audioTrack) {
            stream.addTrack(audioTrack);
          }
        } catch (audioError) {
          console.warn('Não foi possível capturar áudio do microfone');
        }
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecordedBlob(blob);
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000);
      setIsRecording(true);

    } catch (err) {
      setError('Erro ao iniciar gravação. Verifique se você permitiu o acesso à tela.');
      console.error('Erro ao iniciar gravação:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const downloadVideo = () => {
    if (recordedBlob && videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `screen-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetRecording = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setVideoUrl('');
    setRecordedBlob(null);
    setError('');
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Videocam sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Gravador de Tela
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Grave sua tela de forma simples e rápida
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <ConfigContainer>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeAudio}
              onChange={(e) => setIncludeAudio(e.target.checked)}
              disabled={isRecording}
            />
          }
          label="Incluir áudio do microfone"
        />
      </ConfigContainer>

      <ControlsContainer>
        {!isRecording ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={startRecording}
            disabled={!!videoUrl}
            sx={{ minWidth: 200 }}
          >
            Iniciar Gravação
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            size="large"
            startIcon={<Stop />}
            onClick={stopRecording}
            sx={{ minWidth: 200 }}
          >
            Parar Gravação
          </Button>
        )}

        {videoUrl && (
          <>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={downloadVideo}
              sx={{ minWidth: 200 }}
            >
              Baixar Vídeo
            </Button>
            <Button
              variant="text"
              onClick={resetRecording}
              sx={{ minWidth: 200 }}
            >
              Nova Gravação
            </Button>
          </>
        )}
      </ControlsContainer>

      {videoUrl && (
        <VideoContainer>
          <Typography variant="h6" gutterBottom>
            Visualizar Gravação
          </Typography>
          <video
            src={videoUrl}
            controls
            style={{
              width: '100%',
              maxWidth: '800px',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
        </VideoContainer>
      )}

      {isRecording && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
            🔴 Gravando...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ScreenRecorder;