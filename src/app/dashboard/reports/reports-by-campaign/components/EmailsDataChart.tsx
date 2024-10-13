import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, Box } from '@mui/material';
import { Campaign, CampaignStats } from '../interfaces';

interface EmailsDataChartProps {
  selectedCampaign: Campaign | null;
  campaignStats: CampaignStats | null;
}

export const EmailsDataChart: React.FC<EmailsDataChartProps> = ({
  selectedCampaign,
  campaignStats,
}) => {
  if (!selectedCampaign || !campaignStats) {
    return;
  }

  const data = [
    { name: 'Bounces', value: campaignStats.totalBounces },
    { name: 'Clicks', value: campaignStats.totalClicks },
    { name: 'Complaints', value: campaignStats.totalComplaints },
    { name: 'Deliveries', value: campaignStats.totalDeliveries },
    { name: 'Delivery Delays', value: campaignStats.totalDeliveryDelays },
    { name: 'Opens', value: campaignStats.totalOpens },
    { name: 'Rejections', value: campaignStats.totalRejections },
    { name: 'Rendering Failures', value: campaignStats.totalRenderingFailures },
    { name: 'Sends', value: campaignStats.totalSends },
    { name: 'Subscriptions', value: campaignStats.totalSubscriptions },
  ];

  return (
    <Box sx={{ width: '100%', height: 400, marginTop: '2%' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Overview: {selectedCampaign.name}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#24244A" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
