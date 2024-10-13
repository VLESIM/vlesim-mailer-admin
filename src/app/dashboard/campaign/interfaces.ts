import { Dayjs } from 'dayjs';

export interface FormData {
  subject: string;
  campaignName: string;
  body: string;
  description: string;
  date: Dayjs | string;
  time: string;
}

export interface FormFieldProps {
  name: keyof FormData;
  control: unknown;
  label: string;
  rules?: object;
  multiline?: boolean;
  minRows?: number;
}

export interface Campaign {
  id: string;
  name: string;
  date: string;
  description: string;
  subject: string;
  status: string;
  attachments: string[];
  to: string[];
}
