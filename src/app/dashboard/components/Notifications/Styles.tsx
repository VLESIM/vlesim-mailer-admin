import { WarningIcon } from '../../../ui/icons/WarningIcon.tsx';
import { CheckIcon } from '../../../ui/icons/checkIcon.tsx';

export const colors = {
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
  success: '#4caf50',
};

export const icons = {
  error: <WarningIcon fill={colors['error']} />,
  warning: <WarningIcon fill={colors['warning']} />,
  info: <WarningIcon fill={colors['info']} />,
  success: <CheckIcon fill={colors['success']} />,
};
