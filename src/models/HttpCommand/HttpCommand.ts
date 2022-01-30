import {Model} from 'react3l-common';

export class HttpCommand extends Model {
  public id?: number;

  public cmd?: any;

  public type?: 'POST' | 'GET' | 'CMD';

  public isupload?: boolean;

  public data?: any;

  public resultfn?: any;

  public errorfn?: any;

  public initfn?: any;
}
