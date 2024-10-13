import { Button, Stack, Typography } from '@mui/material';
import { Layout } from '../layout.tsx';

import { useFetch } from '../../hooks/useFetch.tsx';
import { FetchResponseNotification } from './interfaces/fetch-response-notification.interface.ts';
import { TableNotification } from './components/TableNotification.tsx';
import { useEffect, useState } from 'react';
import { RefreshIcon } from '../../ui/icons/RefreshIcon.tsx';
import { patchAlerts } from '../../methods/patchAlerts.ts';

function Notification() {
  const basePath = import.meta.env.VITE_APP_API_URL;
  const url = `${basePath}/alert`;
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh(!refresh);

  const { data, isLoading, errorMessage } = useFetch<FetchResponseNotification>(
    {
      method: 'GET',
      path: url,
      dependencies: [refresh],
    },
  );

  const urlNoRead = `${basePath}/alert?read=false`;
  const { data: dataNoRead } = useFetch<FetchResponseNotification>({
    method: 'GET',
    path: urlNoRead,
  });

  useEffect(() => {
    const handleReadNotifications = async () => {
      if (!dataNoRead?.data || dataNoRead.data.length <= 0) return;
      const idNotifications = dataNoRead.data.map(
        (notification) => notification.id,
      );
      await patchAlerts(idNotifications);
      toggleRefresh();
    };
    handleReadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataNoRead?.data]);

  return (
    <Layout>
      <Stack sx={{ width: '100%', minHeight: 'calc(100vh - 5.5rem)' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography fontSize={'36px'} fontWeight={'600'}>
            Notifications
          </Typography>
          <Button
            sx={{
              bgcolor: '#24244A',
              p: '1rem',
              minHeight: '0',
              minWidth: '0',
            }}
            onClick={toggleRefresh}
          >
            <RefreshIcon fill={'#FFF'} sx={{ fontSize: '1.3rem' }} />
          </Button>
        </Stack>
        {isLoading && !errorMessage && <Typography>Loading...</Typography>}

        {errorMessage && <Typography>{errorMessage.message}</Typography>}

        {!isLoading && !errorMessage && data?.data && (
          <TableNotification notifications={data.data} />
        )}
      </Stack>
    </Layout>
  );
}

export default Notification;
