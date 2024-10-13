import {
  Email,
  Assessment,
  // Settings,
  Notifications,
  ChecklistRtl,
} from '@mui/icons-material';
import { MenuItemData } from './interfaces';

export const menuItems: MenuItemData[] = [
  {
    title: 'Email Tools',
    icon: <Email />,
    subItems: [{ title: 'Campaign', path: '/dashboard/campaign' }],
  },
  {
    title: 'Reports',
    icon: <Assessment />,
    subItems: [
      {
        title: 'Reports by campaign',
        path: '/dashboard/reports/reports-by-campaign',
      },
      {
        title: 'Total report',
        path: '/dashboard/reports/total-reports',
      },
    ],
  },
  // {
  //   title: "Configuration",
  //   icon: <Settings />,
  //   subItems: [
  //     {
  //       title: "Domain Manager",
  //       path: "/dashboard/configuration/domain-management",
  //     },
  //     {
  //       title: "Event Webhooks",
  //       path: "/dashboard/configuration/event-webhooks",
  //     },
  //     {
  //       title: "Server Settings",
  //       path: "/dashboard/configuration/edit-server",
  //     },
  //   ],
  // },
  {
    title: 'Suppression List',
    icon: <ChecklistRtl />,
    path: '/dashboard/supressionList',
  },
  {
    title: 'Notifications',
    icon: <Notifications />,
    subItems: [{ title: 'History', path: '/dashboard/notifications' }],
  },
];
