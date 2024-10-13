export interface Notification {
  campaign: { id: string; name: string };
  createdAt: string;
  id: string;
  message: string;
  read: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  updatedAt: string;
}
