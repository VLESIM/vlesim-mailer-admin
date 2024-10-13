import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export const OverageSettings: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          width: 1000,
          padding: 3,
          margin: '0 auto',
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Stack spacing={2}>
          {/* Input 1 */}
          <Box>
            <Typography variant="h6">Overage Settings</Typography>
            <Typography>
              Every SocketLabs On-Demand subscription includes a limited number
              of messages and bandwidth. Once you exceed these limits you will
              be billed for the overages at the rates set forth below. As a
              safeguard to prevent excessive overage billing, by default we
              suspend your server if you reach 200% of your allowances (double
              usage). You can adjust the safeguards for your server, but note
              that you will be responsible for all overage charges.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6">Message Limits</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add your SuperTag Key"
            />
          </Box>
          <Box>
            <Typography variant="h6">Bandwidth Limits</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add your SuperTag Key"
            />
          </Box>
          <Box>
            <Typography variant="h6">Overage Notice Frequency</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add your SuperTag Key"
            />
          </Box>

          {/* Buttons */}
          <Stack direction="row" justifyContent="start" spacing={2} mt={2}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};
