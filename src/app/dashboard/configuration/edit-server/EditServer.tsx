import React from 'react';
import { Box, CssBaseline, Stack, Typography } from '@mui/material';
import { Layout } from '../../layout';
import { ServerName } from '../components/ServerName';
import { OverageSettings } from '../components/OverageSettings';
import { NonDeliveryReports } from '../components/NonDeliveryReports';

export const EditServer: React.FC = () => {
  return (
    <Layout>
      <Box sx={{ minWidth: '1600px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Edit Server</Typography>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <ServerName />
            <OverageSettings />
            <NonDeliveryReports />
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
