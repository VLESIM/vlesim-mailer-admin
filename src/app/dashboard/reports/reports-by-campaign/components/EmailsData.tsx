import React from 'react';
import { Stack, Box, Typography, Divider } from '@mui/material';
import {
  Refresh as BounceIcon,
  Report as ComplaintIcon,
  LocalShipping as DeliveryIcon,
  AccessTime as DelayIcon,
  Block as RejectIcon,
  BrokenImage as RenderFailIcon,
  RocketLaunch,
  AdsClick,
  Drafts,
  PersonAdd as SubscribeIcon,
} from '@mui/icons-material';
import { Campaign, CampaignStats } from '../interfaces';

interface EmailsDataProps {
  selectedCampaign: Campaign | null;
  campaignStats: CampaignStats | null;
}

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

export const EmailsData: React.FC<EmailsDataProps> = ({
  selectedCampaign,
  campaignStats,
}) => {
  if (!selectedCampaign || !campaignStats) {
    return (
      <Typography>
        Please select a campaign to view its data and its chart.
      </Typography>
    );
  }

  const allStats: StatItem[] = [
    {
      icon: <BounceIcon />,
      label: 'Bounces',
      value: campaignStats.totalBounces,
    },
    { icon: <AdsClick />, label: 'Clicks', value: campaignStats.totalClicks },
    {
      icon: <ComplaintIcon />,
      label: 'Complaints',
      value: campaignStats.totalComplaints,
    },
    {
      icon: <DeliveryIcon />,
      label: 'Deliveries',
      value: campaignStats.totalDeliveries,
    },
    {
      icon: <DelayIcon />,
      label: 'Delivery Delays',
      value: campaignStats.totalDeliveryDelays,
    },
    { icon: <Drafts />, label: 'Openings', value: campaignStats.totalOpens },
    {
      icon: <RejectIcon />,
      label: 'Rejects',
      value: campaignStats.totalRejections,
    },
    {
      icon: <RenderFailIcon />,
      label: 'Rendering Failures',
      value: campaignStats.totalRenderingFailures,
    },
    { icon: <RocketLaunch />, label: 'Sent', value: campaignStats.totalSends },
    {
      icon: <SubscribeIcon />,
      label: 'Subscribed',
      value: campaignStats.totalSubscriptions,
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
