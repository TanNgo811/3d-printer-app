import {BehaviorSubject, Subscription} from 'rxjs';
import {asyncStorageRepository} from 'src/repositories/async-storage-repository';
import {PRINTER_URL} from 'src/config/const';

export const serverUrl: BehaviorSubject<string> = new BehaviorSubject<string>(
  PRINTER_URL,
);

export class Server {
  protected subscription: Subscription = new Subscription();

  public get serverUrl(): string {
    return serverUrl.getValue();
  }

  public set serverUrl(url: string) {
    serverUrl.next(url);
  }

  public setServerUrl = async (url: string) => {
    this.serverUrl = url;
    await asyncStorageRepository.saveServerUrl(url);
  };

  public subscribeServerUrl = (task: (url: string) => any): Subscription => {
    const subscription: Subscription = serverUrl.subscribe(task);
    this.subscription.add(subscription);
    return subscription;
  };
}

export const server: Server = new Server();
