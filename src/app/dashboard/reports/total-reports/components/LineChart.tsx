import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Typography, CircularProgress, Box } from '@mui/material';
import { useApiGet } from '../../../../hooks/useGetApiCalls';
import { ApiResponse, CampaignStats } from '../interfaces';

interface ChartData {
  name: string;
  value: number;
}

export const LineChartComponent: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const baseUrl = `${import.meta.env.VITE_APP_API_URL}/statistics/accumulated`;

  const {
    data: statsData,
    loading,
    error,
  } = useApiGet<ApiResponse<CampaignStats>>({ url: baseUrl });

  useEffect(() => {
    if (statsData && statsData.data) {
      const data: ChartData[] = [
        { name: 'Bounces', value: statsData.data.totalBounces },
        { name: 'Clicks', value: statsData.data.totalClicks },
        { name: 'Opens', value: statsData.data.totalOpens },
        { name: 'Deliveries', value: statsData.data.totalDeliveries },
        { name: 'Sends', value: statsData.data.totalSends },
        { name: 'Complaints', value: statsData.data.totalComplaints },
        { name: 'Email Processes', value: statsData.data.totalEmailProcesses },
        { name: 'Delivery Delays', value: statsData.data.totalDeliveryDelays },
        { name: 'Rejections', value: statsData.data.totalRejections },
        {
          name: 'Rendering Failures',
          value: statsData.data.totalRenderingFailures,
        },
      ];
      setChartData(data);
    }
  }, [statsData]);

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error loading chart data: {error}</Typography>
    );

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Trends
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
