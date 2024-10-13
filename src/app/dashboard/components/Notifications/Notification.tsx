import { Notification as NotificationInterface } from './../../notifications/interfaces/notification.interface.ts';
import { Stack, Typography } from '@mui/material';
import { colors, icons } from './Styles.tsx';
import { useNavigate } from 'react-router-dom';
import { patchAlert } from '../../../methods/patchAlert.ts';
import { timeAgo } from '../../../methods/timeAgo.ts';

interface NotificationProps extends NotificationInterface {
  handleCloseNotifications: () => void;
  handleReadNotifications: () => void;
}

export function Notification({
  message,
  type,
  campaign,
  handleCloseNotifications,
  id,
  updatedAt,
  handleReadNotifications,
}: NotificationProps) {
  const handleClick = async () => {
    await handleReadNotifications();
    await patchAlert(id);
    handleCloseNotifications();
    navigate('/dashboard/notifications');
  };

  const navigate = useNavigate();
  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Stack
        direction={'row'}
        p={1}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack flex={1} alignItems={'center'}>
          {icons[type]}
        </Stack>
        <Stack flex={4}>
          <Typography fontSize={'14px'} fontWeight={600} color={colors[type]}>
            {message}
          </Typography>
          <Typography fontSize={'11px'} fontWeight={400}>
            {campaign.name}
          </Typography>
        </Stack>
        <Stack height={'100%'} flex={1}>
          <Typography fontSize={'11px'} fontWeight={400}>
            {timeAgo(updatedAt)}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
}
