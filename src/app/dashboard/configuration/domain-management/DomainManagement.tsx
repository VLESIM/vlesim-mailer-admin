import React from 'react';
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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Layout } from '../../layout';
import { emailData } from '../../supressionList/data';

export const DomainManagement: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ minWidth: '1600px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Domain Management</Typography>
            <Typography variant="body1">
              Your sending domain defines how your recipients and inbox
              providers know that you are you.
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '300px' }}
            />
            <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
              <Button variant="contained" color="primary">
                Configure Details
              </Button>
              <Button variant="contained" color="primary">
                + Add entry
              </Button>
            </Stack>
          </Stack>

          {/* Table for Suppression List */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Details</TableCell>
                  <TableCell>Last Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emailData.map((email, index) => (
                  <TableRow key={index}>
                    <TableCell>{email.address}</TableCell>
                    <TableCell>{email.status}</TableCell>
                    <TableCell>{email.details}</TableCell>
                    <TableCell>{email.lastUpdate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Button sx={{ backgroundColor: 'error.main', color: 'white' }}>
              Delete Entries
            </Button>
            <Button variant="contained" color="primary">
              Download CSV
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
