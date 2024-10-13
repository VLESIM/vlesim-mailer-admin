import { Layout } from '../../layout';
import { Box, CssBaseline, Stack, Typography } from '@mui/material';
import { EmailsDataTotal } from './components/EmailsData';
import { LineChartComponent } from './components/LineChart';

export const TotalReports = () => {
  return (
    <Layout>
      <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Total Report</Typography>
          </Stack>
          <Stack>
            <EmailsDataTotal />
            <LineChartComponent />
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
