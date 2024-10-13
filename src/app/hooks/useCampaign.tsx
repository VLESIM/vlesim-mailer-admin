import { useState } from 'react';

interface CampaignData {
  name: string;
  date: string;
  description: string;
  subject: string;
  body: string;
  to: string[];
  attachments: string;
}

export const useCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCampaign = async (campaignData: CampaignData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'http://vlesim-mailer-268611735.us-east-2.elb.amazonaws.com/campaigns',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(campaignData),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create campaign');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCampaign, loading, error };
};
