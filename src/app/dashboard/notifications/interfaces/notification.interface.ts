export interface Notification {
  message: { id: string; name: string };
  createdAt: string;
  id: string;
  content: string;
  read: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  updatedAt: string;
}
