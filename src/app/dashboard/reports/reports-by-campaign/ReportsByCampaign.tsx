import { useState, useEffect } from 'react';
import { Layout } from '../../layout';
import { Box, CssBaseline, Stack, Typography } from '@mui/material';
import { SelectCampaignsReports } from './components/SelectCampaignsReports';
import { EmailsData } from './components/EmailsData';
import { EmailsDataChart } from './components/EmailsDataChart';
import { useApiGet } from '../../../hooks/useGetApiCalls';
import { ApiResponse, Campaign, CampaignStats } from './interfaces';

export const ReportsByCampaign = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  console.log('🚀 ~ ReportsByCampaign ~ selectedCampaign:', selectedCampaign);
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(
    null,
  );
  console.log('🚀 ~ ReportsByCampaign ~ campaignStats:', campaignStats);

  const baseApiUrl = import.meta.env.VITE_APP_API_URL;
  const campaignsUrl = `${baseApiUrl}/message`;
  const statisticsByCampaign = `${baseApiUrl}/statistics/message`;

  const { data: campaignsData } = useApiGet<ApiResponse<Campaign[]>>({
    url: campaignsUrl,
  });

  const { data: statsData } = useApiGet<ApiResponse<CampaignStats>>({
    url: selectedCampaign
      ? `${statisticsByCampaign}/${selectedCampaign.id}`
      : null,
    skip: !selectedCampaign,
  });

  useEffect(() => {
    if (statsData && statsData.data) {
      setCampaignStats(statsData.data);
    }
  }, [statsData]);

  const handleCampaignSelect = (campaign: Campaign | null) => {
    setSelectedCampaign(campaign);
    if (campaign === null) {
      setCampaignStats(null);
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: '1600px', margin: '0 auto' }}>
        <CssBaseline />
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography variant="h1">Reports by campaign</Typography>
          </Stack>
          <Stack>
            <SelectCampaignsReports
              campaigns={campaignsData?.data || []}
              onSelectCampaign={handleCampaignSelect}
              selectedCampaign={selectedCampaign}
            />
            <EmailsData
              campaignStats={campaignStats}
              selectedCampaign={selectedCampaign}
            />
            <EmailsDataChart
              selectedCampaign={selectedCampaign}
              campaignStats={campaignStats}
            />
          </Stack>
        </Stack>
      </Box>
    </Layout>
  );
};
