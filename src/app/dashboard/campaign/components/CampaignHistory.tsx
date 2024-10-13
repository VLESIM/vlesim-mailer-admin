import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { Edit, Delete, CirclePlay } from 'lucide-react';
import { Campaign } from '../interfaces';

interface CampaignHistoryProps {
  campaignsInfo: Campaign[];
}

const CampaignHistory: React.FC<CampaignHistoryProps> = ({ campaignsInfo }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);
  const endpoint = `${import.meta.env.VITE_APP_API_URL}/message`;
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignsInfo]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data = await response.json();
      setCampaigns([...data.data]);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError('Failed to load campaigns. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setEditedCampaign({ ...campaign });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setSelectedCampaign(null);
    setEditedCampaign(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedCampaign(null);
  };

  const handleEditChange = (key: keyof Campaign, value: string | string[]) => {
    if (editedCampaign) {
      setEditedCampaign({ ...editedCampaign, [key]: value });
    }
  };

  const handleEditSubmit = async () => {
    if (!editedCampaign || !selectedCampaign) {
      setSnackbar({
        open: true,
        message: 'No campaign selected for editing.',
        severity: 'error',
      });
      return;
    }

    try {
      // Create a copy of editedCampaign to modify
      const campaignToUpdate = { ...editedCampaign };

      // Ensure attachments are always an array
      if (typeof campaignToUpdate.attachments === 'string') {
        campaignToUpdate.attachments = (campaignToUpdate.attachments as string)
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item !== ''); // Remove empty items
      }

      // Validate required fields
      const requiredFields = ['name', 'date', 'subject', 'to', 'body'];
      for (const field of requiredFields) {
        if (!campaignToUpdate[field as keyof Campaign]) {
          throw new Error(`${field} is required.`);
        }
      }

      const response = await fetch(`${endpoint}/${selectedCampaign.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(campaignToUpdate),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      // Instead of using the server response, use the locally edited data
      // Update the campaigns state with the edited campaign
      setCampaigns(
        campaigns.map((c) =>
          c.id === selectedCampaign.id ? campaignToUpdate : c,
        ),
      );

      setSnackbar({
        open: true,
        message: 'Campaign updated successfully',
        severity: 'success',
      });

      handleEditDialogClose();
    } catch (error) {
      console.error('Error updating campaign:', error);

      let errorMessage = 'Failed to update campaign. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedCampaign) {
      try {
        const response = await fetch(`${endpoint}/${selectedCampaign.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete campaign');
        }
        setCampaigns(campaigns.filter((c) => c.id !== selectedCampaign.id));
        handleDeleteDialogClose();
      } catch (error) {
        console.error('Error deleting campaign:', error);
        setError('Failed to delete campaign. Please try again later.');
      }
    }
  };

  const handleSendEmail = async (campaign: Campaign) => {
    try {
      const response = await fetch(`${endpoint}/${campaign.id}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to send campaign: ${response.status} ${response.statusText}`,
        );
      }
      const responseData = await response.json();
      console.log('Response data:', responseData);

      setSnackbar({
        open: true,
        message: 'Campaign sent successfully',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error sending campaign:', error);
      setSnackbar({
        open: true,
        message: `Failed to send campaign: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (campaigns.length === 0) {
    return <Typography>No campaigns found.</Typography>;
  }

  const renderEditField = (key: keyof Campaign, value: string | string[]) => {
    const isReadOnly = key === 'id' || key === 'status';

    if (key === 'to' && Array.isArray(value)) {
      return (
        <TextField
          key={key}
          fullWidth
          margin="normal"
          label={key}
          value={value.join(', ')}
          onChange={(e) => handleEditChange(key, e.target.value.split(', '))}
          helperText="Separate multiple email addresses with commas"
          InputProps={{
            readOnly: isReadOnly,
          }}
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
      );
    }
    return (
      <TextField
        key={key}
        fullWidth
        margin="normal"
        label={key}
        value={value as string}
        onChange={(e) => handleEditChange(key, e.target.value)}
        InputProps={{
          readOnly: isReadOnly,
        }}
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
    );
  };

  return (
    <Stack sx={{ width: '100%', marginTop: '20px' }} spacing={3}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h2" sx={{ p: '25px' }}>
          Campaign History
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Object.keys(campaigns[0]).map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: 'primary.main',
                      color: '#000000',
                      bgcolor: '#F6F6F6',
                    }}
                  >
                    {key}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'primary.main',
                    color: '#000000',
                    bgcolor: '#F6F6F6',
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaigns
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((campaign, index) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={campaign.id || index}
                  >
                    {Object.values(campaign).map((value, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {Array.isArray(value)
                          ? value.join(', ')
                          : String(value)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(campaign)}>
                        <Edit size={20} />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(campaign)}>
                        <Delete size={20} />
                      </IconButton>
                      <IconButton onClick={() => handleSendEmail(campaign)}>
                        <CirclePlay size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={campaigns.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Campaign</DialogTitle>
        <DialogContent>
          {editedCampaign &&
            Object.entries(editedCampaign).map(([key, value]) =>
              renderEditField(key as keyof Campaign, value),
            )}
        </DialogContent>
        <DialogActions>
          <Button sx={{ bgcolor: 'red' }} onClick={handleEditDialogClose}>
            Cancel
          </Button>
          <Button
            sx={{ bgcolor: '#1DD63A' }}
            onClick={handleEditSubmit}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this campaign?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} sx={{ bgcolor: 'red' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CampaignHistory;
