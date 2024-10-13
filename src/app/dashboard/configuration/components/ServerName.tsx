import React from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export const ServerName: React.FC = () => {
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
          <Box>
            <Typography variant="h6">Server Name</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter server name"
            />
          </Box>

          {/* Input 2 */}
          <Box>
            <Typography variant="h6">SuperTag Key (Optional)</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Add your SuperTag Key"
            />
          </Box>

          {/* Buttons */}
          <Stack direction="row" justifyContent="start" spacing={2} mt={2}>
            <Button variant="contained" color="primary">
              Save
            </Button>
            <Button variant="outlined" color="error">
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box
        sx={{
          width: 1000,
          padding: 3,
          margin: '0 auto',
          border: '1px solid #ccc',
          borderRadius: 2,
          backgroundColor: 'white',
          marginTop: '20px',
        }}
      >
        <Stack spacing={2}>
          {/* Input 1 */}
          <Box>
            <Typography variant="h6">Server IP Addresses</Typography>
            <Typography>142.0.181.64</Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};
