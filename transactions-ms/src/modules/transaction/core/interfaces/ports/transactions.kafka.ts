import { Observable } from 'rxjs';

export interface IKafkaPort {
  sendMessage(topic: string, payload: object): Promise<Observable<object>>;
}
