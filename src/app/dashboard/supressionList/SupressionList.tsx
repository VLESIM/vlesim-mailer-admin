import React, { useEffect, useState } from 'react';
import {
  Button,
  Box,
  CssBaseline,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Layout } from '../layout';
import SearchIcon from '@mui/icons-material/Search';
import { ApiResponse, SuppressionListItem } from './interfaces';

export const SuppressionList: React.FC = () => {
  const [list, setList] = useState<SuppressionListItem[]>([]);
  const [filteredList, setFilteredList] = useState<SuppressionListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const urlParams = new URLSearchParams({ isSubscribed: 'false' });
  const endpoint = `${import.meta.env.VITE_APP_API_URL}/user`;
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = list.filter((item) =>
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredList(filtered);
  }, [list, searchTerm]);

  const fetchList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${endpoint}?${urlParams.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch suppression list');
      }

      const data: ApiResponse = await response.json();
      setList(data.data);
      setFilteredList(data.data);
    } catch (error) {
      console.error('Error fetching list:', error);
      setError('Failed to load suppression list. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Suppression List</Typography>
            <Typography variant="body1">
              Delivering email to invalid addresses or recipients that complain
              hurts your sender reputation, which reduces your ability to
              deliver email to the inbox. Our suppression list system
              automatically blocks email to any known invalid email address or
              any email address from which you have received a complaint.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '300px',
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

          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email Address</TableCell>
                    <TableCell>Subscribed</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.isSubscribed ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Button variant="contained" color="primary">
              Download CSV
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
