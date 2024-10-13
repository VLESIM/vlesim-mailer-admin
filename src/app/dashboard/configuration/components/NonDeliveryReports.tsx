import React from 'react';
import { Box, Stack, Switch, Typography } from '@mui/material';

export const NonDeliveryReports: React.FC = () => {
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
            <Typography variant="h6">Non-Delivery Reports</Typography>
            <Typography>
              When a message fails delivery during the SMTP transmission
              process, you may want to receive a Non-Delivery Report (NDR) with
              information about the failed message. Each NDR message will be
              processed through your SocketLabs server and will count as one
              message towards your plan allotment.
            </Typography>
          </Box>

          {/* Input 2 */}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography variant="h6">Non-Delivery Reports</Typography>
            <Switch />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
