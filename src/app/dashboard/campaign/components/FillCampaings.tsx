import { Button, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import DocumentUploadModal from './ModalFiles';
import { Campaign } from '../interfaces';

interface FillCampaignsProps {
  addCampaign: (campaign: Campaign) => void;
}

const FillCampaigns: React.FC<FillCampaignsProps> = ({ addCampaign }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [emailsList, setEmailsList] = useState<string[]>([]);
  const token = localStorage.getItem('authToken');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const clearFields = () => {
    setSelectedDate(null);
    setSubject('');
    setCampaignName('');
    setBody('');
    setDescription('');
    setEmailsList([]);
  };

  const handleAddCampaign = async () => {
    const endpointPost = `${import.meta.env.VITE_APP_API_URL}/message/marketing`;
    if (!selectedDate || !subject || !campaignName || !body || !description) {
      alert('Please fill in all fields');
      return;
    }

    const newCampaign = {
      name: campaignName,
      date: selectedDate.toISOString(),
      description: description,
      subject: subject,
      body: body,
      to: emailsList,
      attachments: [],
    };

    try {
      const response = await fetch(endpointPost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(newCampaign),
      });

      if (!response.ok) {
        throw new Error('Something went wrong with the request.');
      }

      const data = await response.json();
      addCampaign(data.data);
      clearFields();
      addCampaign(data.data);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack sx={{ width: '100%' }} spacing={3}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">E-mail Subject</Typography>
            <TextField
              label="Enter your E-mail Subject"
              variant="outlined"
              sx={{
                width: {
                  xs: '300px',
                  md: '700px',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DD63A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1DD63A',
                },
              }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Campaign Name</Typography>
            <TextField
              label="Enter Campaign Name"
              variant="outlined"
              sx={{
                width: {
                  xs: '300px',
                  md: '700px',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DD63A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1DD63A',
                },
              }}
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Stack spacing={1}>
            <Typography variant="subtitle1">E-mail Body</Typography>
            <TextField
              label="Enter your E-mail Body"
              variant="outlined"
              multiline
              minRows={10}
              sx={{
                width: {
                  xs: '200px',
                  md: '350px',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DD63A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1DD63A',
                },
              }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Description</Typography>
            <TextField
              label="Enter your Description"
              variant="outlined"
              multiline
              minRows={10}
              sx={{
                width: {
                  xs: '200px',
                  md: '350px',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#1DD63A',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#1DD63A',
                },
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
          <Stack
            spacing={1}
            sx={{ bgcolor: '#F6F6F6', minWidth: '300px', padding: '10px' }}
          >
            <Typography variant="subtitle1">E-mails</Typography>
            <Stack
              spacing={1}
              sx={{
                maxHeight: '200px',
                overflowY: 'auto',
                paddingRight: '8px',
              }}
            >
              {emailsList.length > 0 ? (
                emailsList.map((email, index) => (
                  <Typography key={index} variant="body1">
                    {email}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No e-mails added yet.
                </Typography>
              )}
            </Stack>
          </Stack>

          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
            <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1">Date</Typography>
              <DatePicker
                label="Select Start Date"
                value={selectedDate}
                onChange={(newDate: Dayjs | null) => setSelectedDate(newDate)}
                slotProps={{ textField: { variant: 'outlined' } }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#1DD63A',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#1DD63A',
                  },
                }}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '41px' }}>
            <Stack>
              <Button
                sx={{
                  width: '220px',
                  height: '36px',
                  borderRadius: '4px',
                  bgcolor: '#FFA048',
                }}
                onClick={handleOpenModal}
              >
                Create List
              </Button>
            </Stack>
            <DocumentUploadModal
              open={isModalOpen}
              onClose={handleCloseModal}
              setEmailsList={setEmailsList}
            />
            <Stack>
              <Button
                sx={{
                  width: '220px',
                  height: '36px',
                  borderRadius: '4px',
                  bgcolor: '#24244A',
                }}
                onClick={handleAddCampaign}
              >
                Add Campaign
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default FillCampaigns;
