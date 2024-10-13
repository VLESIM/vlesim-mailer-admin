import React, { useEffect, useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Refresh as BounceIcon,
  AdsClick,
  Drafts,
  LocalShipping as DeliveryIcon,
  RocketLaunch,
  Report as ComplaintIcon,
} from '@mui/icons-material';
import { useApiGet } from '../../../../hooks/useGetApiCalls';
import { ApiResponse, CampaignStats } from '../interfaces';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}

const StatBox: React.FC<{ stats: StatItem[] }> = ({ stats }) => (
  <Box
    sx={{
      border: '5px dotted #24244A',
      borderRadius: '4px',
      padding: '16px',
      height: '233px',
      width: '1200px',
    }}
  >
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '15%',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      {stats.map((stat, index) => (
        <Stack
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100px',
          }}
        >
          {React.cloneElement(stat.icon as React.ReactElement, {
            sx: { fontSize: 60, color: '#24244A' },
          })}
          <Divider sx={{ width: '100%', my: 1 }} />
          <Typography align="center">{stat.label}</Typography>
          <Typography variant="h6" align="center">
            {stat.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </Box>
);

export const EmailsDataTotal: React.FC = () => {
  const [campaignStats, setCampaignStats] = useState<CampaignStats | null>(
    null,
  );
  const baseUrl = `${import.meta.env.VITE_APP_API_URL}/statistics/accumulated`;

  const {
    data: campaignsData,
    loading: campaignsLoading,
    error: campaignsError,
  } = useApiGet<ApiResponse<CampaignStats>>({ url: baseUrl });

  useEffect(() => {
    if (campaignsData && campaignsData.data) {
      setCampaignStats(campaignsData.data);
    }
  }, [campaignsData]);

  if (campaignsLoading) return <CircularProgress />;
  if (campaignsError)
    return (
      <Typography color="error">
        Error loading campaign data: {campaignsError}
      </Typography>
    );

  const allStats: StatItem[] = [
    {
      icon: <BounceIcon />,
      label: 'Bounces',
      value: campaignStats?.totalBounces || 0,
    },
    {
      icon: <AdsClick />,
      label: 'Clicks',
      value: campaignStats?.totalClicks || 0,
    },
    { icon: <Drafts />, label: 'Opens', value: campaignStats?.totalOpens || 0 },
    {
      icon: <DeliveryIcon />,
      label: 'Deliveries',
      value: campaignStats?.totalDeliveries || 0,
    },
    {
      icon: <RocketLaunch />,
      label: 'Sends',
      value: campaignStats?.totalSends || 0,
    },
    {
      icon: <ComplaintIcon />,
      label: 'Complaints',
      value: campaignStats?.totalComplaints || 0,
    },
    {
      icon: <BounceIcon />,
      label: 'Email Processes',
      value: campaignStats?.totalEmailProcesses || 0,
    },
    {
      icon: <BounceIcon />,
      label: 'Delivery Delays',
      value: campaignStats?.totalDeliveryDelays || 0,
    },
    {
      icon: <BounceIcon />,
      label: 'Rejections',
      value: campaignStats?.totalRejections || 0,
    },
    {
      icon: <BounceIcon />,
      label: 'Rendering Failures',
      value: campaignStats?.totalRenderingFailures || 0,
    },
  ];

  const firstFiveStats = allStats.slice(0, 5);
  const remainingStats = allStats.slice(5);

  return (
    <Stack spacing={2}>
      <StatBox stats={firstFiveStats} />
      <StatBox stats={remainingStats} />
    </Stack>
  );
};
