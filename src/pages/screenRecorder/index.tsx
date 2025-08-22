import { Box, Button, Typography, FormControlLabel, Checkbox, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { PlayArrow, Stop, Download, Videocam, Refresh } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';

import { Container, VideoContainer, ControlsContainer, ConfigContainer, PreRecordingContainer, PostRecordingContainer } from './styles';

type VideoFormat = 'webm' | 'mp4';

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [includeAudio, setIncludeAudio] = useState(true);
  const [error, setError] = useState<string>('');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>('webm');
  const [hasRecorded, setHasRecorded] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (streamRef.current) {
      const handleStreamEnd = () => {
        if (isRecording) {
          stopRecording();
        }
      };

      streamRef.current.getVideoTracks().forEach(track => {
        track.addEventListener('ended', handleStreamEnd);
      });

      return () => {
        if (streamRef.current) {
          streamRef.current.getVideoTracks().forEach(track => {
            track.removeEventListener('ended', handleStreamEnd);
          });
        }
      };
    }
  }, [isRecording, streamRef.current]);

  const getMimeType = (format: VideoFormat): string => {
    if (format === 'mp4' && MediaRecorder.isTypeSupported('video/mp4')) {
      return 'video/mp4';
    }
    return 'video/webm;codecs=vp9';
  };

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
      streamRef.current = stream;
      
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

      const mimeType = getMimeType(selectedFormat);
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const extension = selectedFormat === 'mp4' ? 'mp4' : 'webm';
        const blob = new Blob(chunksRef.current, { type: `video/${extension}` });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setRecordedBlob(blob);
        setHasRecorded(true);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
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
      const extension = selectedFormat === 'mp4' ? 'mp4' : 'webm';
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `screen-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.${extension}`;
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
    setHasRecorded(false);
    setIsRecording(false);
  };

  const renderPreRecording = () => (
    <PreRecordingContainer>
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
        <Alert severity="error" sx={{ mb: 3, width: '100%', maxWidth: 500 }}>
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
        
        <FormControl sx={{ minWidth: 200 }} disabled={isRecording}>
          <InputLabel>Formato do vídeo</InputLabel>
          <Select
            value={selectedFormat}
            label="Formato do vídeo"
            onChange={(e) => setSelectedFormat(e.target.value as VideoFormat)}
          >
            <MenuItem value="webm">WebM</MenuItem>
            <MenuItem value="mp4" disabled={!MediaRecorder.isTypeSupported('video/mp4')}>
              MP4 {!MediaRecorder.isTypeSupported('video/mp4') ? '(Não suportado)' : ''}
            </MenuItem>
          </Select>
        </FormControl>
      </ConfigContainer>

      <ControlsContainer>
        <Button
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
          onClick={startRecording}
          sx={{ minWidth: 250, py: 1.5 }}
        >
          Iniciar Gravação
        </Button>
      </ControlsContainer>
    </PreRecordingContainer>
  );

  const renderRecording = () => (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{ color: 'error.main', fontWeight: 'bold' }}>
        🔴 Gravando...
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Clique em "Parar" ou encerre o compartilhamento no navegador
      </Typography>
      
      <Button
        variant="contained"
        color="error"
        size="large"
        startIcon={<Stop />}
        onClick={stopRecording}
        sx={{ minWidth: 250, py: 1.5 }}
      >
        Parar Gravação
      </Button>
    </Box>
  );

  const renderPostRecording = () => (
    <PostRecordingContainer>
      <Typography variant="h5" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
        ✅ Gravação Finalizada!
      </Typography>
      
      <VideoContainer>
        <video
          src={videoUrl}
          controls
          style={{
            width: '100%',
            maxWidth: '800px',
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}
        />
      </VideoContainer>

      <ControlsContainer>
        <Button
          variant="contained"
          size="large"
          startIcon={<Download />}
          onClick={downloadVideo}
          sx={{ minWidth: 200, py: 1.5 }}
        >
          Baixar Vídeo (.{selectedFormat})
        </Button>
        
        <Button
          variant="outlined"
          size="large"
          startIcon={<Refresh />}
          onClick={resetRecording}
          sx={{ minWidth: 200, py: 1.5 }}
        >
          Nova Gravação
        </Button>
      </ControlsContainer>
    </PostRecordingContainer>
  );

  return (
    <Container>
      {!hasRecorded && !isRecording && renderPreRecording()}
      {isRecording && renderRecording()}
      {hasRecorded && !isRecording && renderPostRecording()}
    </Container>
  );
};

export default ScreenRecorder;