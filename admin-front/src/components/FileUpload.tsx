import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import type { FileUpload as FileUploadType } from '../types';

interface FileUploadProps {
  onFilesUpload?: (files: FileUploadType[]) => void;
  acceptedTypes?: string[];
}

interface UploadAreaProps {
  isDragActive: boolean;
}

const UploadArea = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isDragActive'
})<UploadAreaProps>(({ theme, isDragActive }) => ({
  border: `2px dashed ${isDragActive ? theme.palette.primary.main : theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: isDragActive ? theme.palette.action.hover : theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover
  }
}));

const FileUpload = ({ onFilesUpload, acceptedTypes = ['.xml', '.csv', '.xlsx', '.yml']} : FileUploadProps) => {
  const [files, setFiles] = useState<FileUploadType[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList): void => {
    const newFiles: FileUploadType[] = Array.from(selectedFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending',
      progress: 0,
      error: undefined
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileSelect(droppedFiles);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const uploadFileToServer = async (file: File): Promise<unknown> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', getFileType(file.name));

    const response = await fetch('/api/admin/import', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  };

  const getFileType = (filename: string): string => {
    if (filename.endsWith('.xml')) return 'xml';
    if (filename.endsWith('.csv')) return 'csv';
    if (filename.endsWith('.xlsx')) return 'excel';
    return 'unknown';
  };

  const handleUpload = async (): Promise<void> => {
    for (const fileObj of files) {
      if (fileObj.status === 'pending') {
        try {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, status: 'uploading' } : f
          ));

          // Симуляция прогресса загрузки
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(prev => ({ ...prev, [fileObj.id]: progress }));
            await new Promise(resolve => setTimeout(resolve, 200));
          }

          await uploadFileToServer(fileObj.file);

          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { ...f, status: 'success' } : f
          ));

        } catch (error) {
          setFiles(prev => prev.map(f => 
            f.id === fileObj.id ? { 
              ...f, 
              status: 'error', 
              error: (error as Error).message 
            } : f
          ));
        }
      }
    }
    
    if (onFilesUpload) {
      const successfulFiles = files.filter(f => f.status === 'success');
      onFilesUpload(successfulFiles);
    }
  };

  const removeFile = (fileId: string): void => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const pendingFiles = files.filter(f => f.status === 'pending');
  const hasPendingFiles = pendingFiles.length > 0;

  return (
    <Box sx={{ width: '100%' }}>
      <UploadArea
        isDragActive={isDragging}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Перетащите файлы сюда
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Поддерживаемые форматы: {acceptedTypes.join(', ')}
        </Typography>
        <Button 
          variant="contained" 
          component="span"
          sx={{ mt: 2 }}
        >
          Выбрать файлы
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </UploadArea>

      {/* Список файлов */}
      {files.length > 0 && (
        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Файлы для загрузки ({files.length})
          </Typography>
          
          <List>
            {files.map((fileObj) => (
              <ListItem key={fileObj.id} divider>
                <ListItemIcon>
                  <FileIcon />
                </ListItemIcon>
                
                <ListItemText
                  primary={fileObj.file.name}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      {fileObj.status === 'uploading' && (
                        <LinearProgress 
                          variant="determinate" 
                          value={uploadProgress[fileObj.id] || 0}
                          sx={{ mb: 1 }}
                        />
                      )}
                      {fileObj.status === 'success' && (
                        <Typography variant="body2" color="success.main">
                          <SuccessIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Успешно загружено
                        </Typography>
                      )}
                      {fileObj.status === 'error' && fileObj.error && (
                        <Typography variant="body2" color="error.main">
                          <ErrorIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {fileObj.error}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                
                <IconButton 
                  onClick={() => removeFile(fileObj.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>

          {hasPendingFiles && (
            <Button
              variant="contained"
              onClick={handleUpload}
              sx={{ mt: 2 }}
              disabled={!hasPendingFiles}
            >
              Начать загрузку ({pendingFiles.length})
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default FileUpload;