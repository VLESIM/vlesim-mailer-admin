import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import Papa from 'papaparse';

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  setEmailsList: React.Dispatch<React.SetStateAction<string[]>>; // <-- Add this line
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  open,
  onClose,
  setEmailsList,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [emailsList, setEmailsListRead] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

      // Procesar el archivo CSV
      const file = selectedFiles[0];
      if (file && file.type === 'text/csv') {
        Papa.parse(file, {
          complete: (results) => {
            const emails = (results.data as string[][]).map((row) => row[0]);
            setEmailsListRead(emails.filter((email) => email.includes('@')));
          },
          header: false,
        });
      }
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const handleSave = () => {
    if (emailsList.length > 0) {
      console.log('Emails to use:', emailsList.join(', '));
      setEmailsListRead(emailsList);
      setEmailsList(emailsList);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" gutterBottom>
          Recipient List Name
        </Typography>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter List Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: '#f5f5f5',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <CloudUploadIcon
            sx={{ fontSize: 48, color: 'primary.main', mb: 1 }}
          />
          <Typography>Drag and drop a .csv file or</Typography>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button
              component="span"
              variant="contained"
              sx={{ mt: 1, bgcolor: 'lightgray', color: '#000000' }}
            >
              Select Files
            </Button>
          </label>
        </Paper>

        {files.length > 0 && (
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <ListItemText primary={file.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveFile(file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={files.length === 0}
        >
          Create List
        </Button>
      </Box>
    </Modal>
  );
};

export default DocumentUploadModal;
