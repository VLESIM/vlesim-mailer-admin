import React from 'react';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  Typography,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { Campaign } from '../interfaces';

interface SelectCampaignsReportsProps {
  campaigns: Campaign[];
  onSelectCampaign: (campaign: Campaign | null) => void;
  selectedCampaign: Campaign | null;
}

export const SelectCampaignsReports: React.FC<SelectCampaignsReportsProps> = ({
  campaigns,
  onSelectCampaign,
  selectedCampaign,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const campaign = campaigns.find(
      (c: Campaign) => c.id === event.target.value,
    );
    if (campaign) {
      onSelectCampaign(campaign);
    }
  };

  const handleBack = () => {
    onSelectCampaign(null);
  };

  if (!campaigns.length) return <CircularProgress />;

  return (
    <Stack
      sx={{
        display: 'flex',
        bgcolor: '#F9F9F9',
        flexDirection: 'column',
        padding: '16px',
        gap: '15px',
      }}
    >
      {!selectedCampaign ? (
        <Stack sx={{ minWidth: '1100px' }}>
          <Typography sx={{ marginBottom: '2%' }}>Select Campaign</Typography>
          <FormControl
            fullWidth
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
          >
            <InputLabel id="campaign-select-label">Campaign Name</InputLabel>
            <Select
              labelId="campaign-select-label"
              id="campaign-select"
              value={selectedCampaign || ''}
              label="Campaign Name"
              onChange={handleChange}
            >
              {campaigns.map((campaign: Campaign) => (
                <MenuItem key={campaign.id} value={campaign.id}>
                  {campaign.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ bgcolor: '#F9F9F9', width: '1097px', height: '154px' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#24244A', fontWeight: 600 }}>
                    Campaign Name
                  </TableCell>
                  <TableCell sx={{ color: '#24244A', fontWeight: 600 }}>
                    State
                  </TableCell>
                  <TableCell sx={{ color: '#24244A', fontWeight: 600 }}>
                    Subject Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: '#999797' }}>
                    {selectedCampaign.name}
                  </TableCell>
                  <TableCell sx={{ color: '#999797' }}>
                    {selectedCampaign.status}
                  </TableCell>
                  <TableCell sx={{ color: '#999797' }}>
                    {selectedCampaign.subject}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={2}>
            <Button
              sx={{
                bgcolor: '#24244A',
                height: '32px',
                width: '62px',
                color: 'white',
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};
