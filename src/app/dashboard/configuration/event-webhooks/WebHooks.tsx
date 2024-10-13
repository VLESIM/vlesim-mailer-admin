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
import { webhookslData } from './data';

export const WebHooks: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ minWidth: '1400px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Webhooks Overview</Typography>
            <Typography variant="body1">
              Webhooks enable you to receive real-time notifications for every
              email related event, such as: delivered messages, failed messages,
              opens, clicks, and complaints. Create a webhook endpoint that can
              receive and handle HTTPS POST requests to get started. Click Event
              Webhook Documentation for additional information.
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
            <Stack>
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {webhookslData.map((email, index) => (
                  <TableRow key={index}>
                    <TableCell>{email.URL}</TableCell>
                    <TableCell>{email.Events}</TableCell>
                    <TableCell>{email.Date}</TableCell>
                    <TableCell>{email.lastUpdate}</TableCell>
                    <TableCell>{email.Actions}</TableCell>
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
