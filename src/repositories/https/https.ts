import type {HttpCommand} from 'src/models/HttpCommand/HttpCommand';

export class HttpService {
  public isHttpCommunicationLocked: boolean = false;

  public httpCommandList: HttpCommand[] = [];

  public isProcessingCommand: boolean = false;

  public xmlHttpUpload: any;

  public maxCommand: number = 20;

  public clearCommandList = () => {
    this.httpCommandList = [];
    this.isProcessingCommand = false;
  };

  public httpSuccessFunction = (responseText: string) => {
    if (
      this.httpCommandList.length > 0 &&
      typeof this.httpCommandList[0]?.resultfn !== 'undefined'
    ) {
      let fn = this.httpCommandList[0]?.resultfn!;
      fn(responseText);
    } else {
      console.log('No success function');
    }
    this.httpCommandList.shift();

    this.isProcessingCommand = false;

    this.handleProcessCommand();
  };

  public httpErrorFunction = (errorCode: number, responseText: string) => {
    if (
      this.httpCommandList.length > 0 &&
      typeof this.httpCommandList[0]?.errorfn !== 'undefined'
    ) {
      let fn = this.httpCommandList[0]?.errorfn;

      if (errorCode === 401) {
        // logindlg();
        console.log('Authentication issue pls log');
      }
      fn(errorCode, responseText);
    } //else console.log ("No errorfn");
    this.httpCommandList.shift();

    this.isProcessingCommand = false;

    this.handleProcessCommand();
  };

  public handleProcessCommand = () => {
    if (this.httpCommandList.length > 0 && !this.isProcessingCommand) {
      //console.log("Processing 1/" + http_cmd_list.length);
      //console.log("Processing " + http_cmd_list[0].cmd);
      if (this.httpCommandList[0].type === 'GET') {
        this.isProcessingCommand = true;
        this.handleProcessGetHttp(
          this.httpCommandList[0]?.cmd!,
          this.httpSuccessFunction,
          this.httpErrorFunction,
        );
      } else if (this.httpCommandList[0].type === 'POST') {
        this.isProcessingCommand = true;
        if (!this.httpCommandList[0]?.isupload) {
          this.handleProcessPostHttp(
            this.httpCommandList[0]?.cmd,
            this.httpCommandList[0]?.data,
            this.httpSuccessFunction,
            this.httpErrorFunction,
          );
        } else {
          console.log('Uploading');

          this.handleProcessFileHttp(
            this.httpCommandList[0]?.cmd!,
            this.httpCommandList[0]?.data,
            this.httpCommandList[0].progressfn,
            this.httpSuccessFunction,
            this.httpErrorFunction,
          );
        }
      } else if (this.httpCommandList[0].type === 'CMD') {
        this.isProcessingCommand = true;

        let fn = this.httpCommandList[0].cmd;

        fn();

        this.httpCommandList.shift();

        this.isProcessingCommand = false;

        this.handleProcessCommand();
      }
    } //else if (http_cmd_list.length > 0)console.log("processing");
  };

  public handleAddCommand(commandFunction: any, id: number) {
    if (this.httpCommandList.length > this.maxCommand) {
      //console.log("adding rejected");
      return;
    }

    let commandId = 0;

    if (typeof id !== 'undefined') {
      commandId = id;
    }

    console.log('adding command');

    let newCommand: HttpCommand = {
      cmd: commandFunction,
      type: 'CMD',
      id: commandId,
    };

    this.httpCommandList.push(newCommand);
    console.log('Now ' + this.httpCommandList.length);
    this.handleProcessCommand();
  }

  public handleSendGetHttp(
    url?: string,
    successFunction?: any,
    errorFunction?: any,
    id?: number,
    maxId?: number,
  ) {
    if (
      this.httpCommandList.length > this.maxCommand &&
      this.maxCommand !== -1
    ) {
      console.log('adding rejected');
      errorFunction();
      return;
    }

    let commandId = 0;

    let commandMaxId = 1;

    let p;

    console.log('ID = ' + id);
    console.log('Max ID = ' + maxId);
    console.log('+++ ' + url);

    if (typeof id !== 'undefined') {
      commandId = id;
      if (typeof maxId !== 'undefined') {
        commandMaxId = maxId;
      } else {
        console.log('No Max ID defined');
      }

      for (p = 0; p < this.httpCommandList.length; p++) {
        //console.log("compare " + (max_id - cmd_max_id));
        if (this.httpCommandList[p].id === commandId) {
          commandMaxId--;
          //console.log("found " + http_cmd_list[p].id + " and " + cmd_id);
        }
        if (commandMaxId <= 0) {
          //console.log("Limit reched for " + id);
          return;
        }
      }
    } else {
      console.log('No ID defined');
    }

    console.log('adding ' + url);

    //Command Model
    let newCommand: HttpCommand = {
      cmd: url,
      type: 'GET',
      isupload: false,
      resultfn: successFunction,
      errorfn: errorFunction,
      id: commandId,
    };
    this.httpCommandList.push(newCommand);
    //console.log("Now " + http_cmd_list.length);
    this.handleProcessCommand();
  }

  public handleProcessGetHttp(
    url: string,
    successFunction: any,
    errorFunction: any,
  ) {
    if (this.isHttpCommunicationLocked) {
      errorFunction(503, 'Communication locked!');
      console.log('locked');
      return;
    }
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          //console.log("*** " + url + " done");
          if (
            typeof successFunction !== 'undefined' &&
            successFunction !== null
          ) {
            successFunction(xmlHttp.responseText);
          }
        } else {
          // if (xmlhttp.status == 401) GetIdentificationStatus();
          if (typeof errorFunction !== 'undefined' && errorFunction !== null) {
            errorFunction(xmlHttp.status, xmlHttp.responseText);
          }
        }
      }
    };
    // Todo: navigate when error
    // if (url.indexOf("?") != -1) url += "&PAGEID=" + page_id;
    //console.log("GET:" + url);
    xmlHttp.open('GET', url, true);
    xmlHttp.send();
  }

  public handleSendPostHttp = (
    url: string,
    postData: any,
    successFunction: any,
    errorFunction: any,
    id: number,
    max_id: number,
  ) => {
    if (
      this.httpCommandList.length > this.maxCommand &&
      this.maxCommand !== -1
    ) {
      console.log('adding rejected');
      errorFunction();
      return;
    }
    let cmd_id = 0;

    let cmd_max_id = 1;

    let p;

    if (typeof id !== 'undefined') {
      cmd_id = id;
      if (typeof max_id !== 'undefined') {
        cmd_max_id = max_id;
      }
      for (p = 0; p < this.httpCommandList.length; p++) {
        if (this.httpCommandList[p]?.id === cmd_id) {
          cmd_max_id--;
        }
        if (cmd_max_id <= 0) {
          return;
        }
      }
    }

    console.log('adding ' + url);

    let newCommand: HttpCommand = {
      cmd: url,
      type: 'POST',
      isupload: false,
      data: postData,
      resultfn: successFunction,
      errorfn: errorFunction,
      // initfn: init_fn,
      id: cmd_id,
    };
    this.httpCommandList.push(newCommand);
    this.handleProcessCommand();
  };

  public handleProcessPostHttp(
    url: string,
    postData: any,
    successFunction: any,
    errorFunction: any,
  ) {
    if (this.isHttpCommunicationLocked) {
      errorFunction(503, 'Communication locked!');
      return;
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          if (
            typeof successFunction !== 'undefined' &&
            successFunction !== null
          ) {
            successFunction(xmlhttp.responseText);
          }
        } else {
          // if (xmlhttp.status == 401) GetIdentificationStatus();
          if (typeof errorFunction !== 'undefined' && errorFunction !== null) {
            errorFunction(xmlhttp.status, xmlhttp.responseText);
          }
        }
      }
    };
    //console.log(url);
    xmlhttp.open('POST', url, true);
    xmlhttp.send(postData);
  }

  public handleSendFileHttp(
    url: string,
    postData: any,
    progressFunction: any,
    successFunction: any,
    errorFunction: any,
  ) {
    if (
      this.httpCommandList.length > this.maxCommand &&
      this.maxCommand !== -1
    ) {
      //console.log("adding rejected");
      errorFunction();
      return;
    }

    // if (this.http_cmd_list.length != 0) {
    //     process = false;
    // }

    let newCommand: HttpCommand = {
      cmd: url,
      type: 'POST',
      isupload: true,
      data: postData,
      progressfn: progressFunction,
      resultfn: successFunction,
      errorfn: errorFunction,
      id: 0,
    };
    this.httpCommandList.push(newCommand);

    this.handleProcessCommand();
  }

  public handleCancelCurrentUpload() {
    this.xmlHttpUpload.abort();
    //http_communication_locked = false;
    console.log('Cancel Upload');
  }

  public handleProcessFileHttp(
    url: string,
    postData: any,
    progressFunction: any,
    successFunction: any,
    errorFunction: any,
  ) {
    if (this.isHttpCommunicationLocked) {
      errorFunction(503, 'Communication locked!');
      return;
    }
    this.isHttpCommunicationLocked = true;

    this.xmlHttpUpload = new XMLHttpRequest();

    this.xmlHttpUpload.onreadystatechange = () => {
      if (this.xmlHttpUpload.readyState === 4) {
        this.isHttpCommunicationLocked = false;

        if (this.xmlHttpUpload.status === 200) {
          if (
            typeof successFunction !== 'undefined' &&
            successFunction !== null
          ) {
            successFunction(this.xmlHttpUpload.responseText);
          }
        } else {
          if (this.xmlHttpUpload.status === 401) {
            //Todo: Error 401
            // GetIdentificationStatus();
          }

          if (typeof errorFunction !== 'undefined' && errorFunction !== null) {
            errorFunction(
              this.xmlHttpUpload.status,
              this.xmlHttpUpload.responseText,
            );
          }
        }
      }
    };
    //console.log(url);
    this.xmlHttpUpload.open('POST', url, true);

    if (typeof progressFunction !== 'undefined' && progressFunction !== null) {
      this.xmlHttpUpload.upload.addEventListener(
        'progress',
        progressFunction,
        false,
      );
    }

    this.xmlHttpUpload.send(postData);
  }
}

export const httpService: HttpService = new HttpService();
