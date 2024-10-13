import { BaseResponse } from '../../../interfaces/base-response.interface.ts';
import { Notification } from './notification.interface.ts';

export interface FetchResponseNotification extends BaseResponse {
  data: Notification[];
}
