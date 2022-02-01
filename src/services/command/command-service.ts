import {targetFirmware} from 'src/config/const';
import {httpService} from 'src/repositories/https/https';

export class CommandService {
  public customCommandHistory: string[] = [];
  public customCommandHistoryIndex = -1;
  public monitorOutput: string[] = [];

  public initCommandPanel = () => {};

  public handleMonitorOutputAutoscrollCommand = () => {
    // document.getElementById('cmd_content').scrollTop =
    //   document.getElementById('cmd_content').scrollHeight;
  };

  public handleMonitorCheckAutoscroll =() => {
    // if (document.getElementById('monitor_enable_autoscroll').checked == true) {
    //   this.monitorOutputAutoscrollCommand();
    // }
  }

  public handleMonitorCheckVerboseMode=()=>{
    this.handleMonitorOutputUpdate();
  }

  public handleMonitorOutputClear = () => {
    this.monitorOutput = [];
    this.handleMonitorOutputUpdate();
  }

  public handleMonitorOutputUpdate = (
    message?: string | any,
    isVerboseFilter?: boolean,
  ) => {
    if (message) {
      if (typeof message === 'string') {
        this.monitorOutput = this.monitorOutput.concat(message);
      } else {
        try {
          let msg = JSON.stringify(message, null, ' ');
          this.monitorOutput = this.monitorOutput.concat(msg + '\n');
        } catch (err) {
          this.monitorOutput = this.monitorOutput.concat(
            message.toString() + '\n',
          );
        }
      }
      this.monitorOutput = this.monitorOutput.slice(-300);
    }
    let regex = /ok T:/g;

    if (
      targetFirmware === 'repetier' ||
      targetFirmware === 'repetier4davinci'
    ) {
      regex = /T:/g;
    }

    let output = '';

    let Monitor_outputLength = this.monitorOutput.length;

    for (let i = 0; i < Monitor_outputLength; i++) {
      //Filter the output
      if (
        this.monitorOutput[i].trim().toLowerCase().startsWith('ok') &&
        !isVerboseFilter
      ) {
        continue;
      }
      if (
        this.monitorOutput[i].trim().toLowerCase() == 'wait' &&
        !isVerboseFilter
      ) {
        continue;
      }
      if (target_firmware == 'grbl' || target_firmware == 'grbl-embedded') {
        //no status
        if (
          (this.monitorOutput[i].startsWith('<') ||
            this.monitorOutput[i].startsWith('[echo:')) &&
          !isVerboseFilter
        ) {
          continue;
        }
      } else {
        //no temperatures
        if (!isVerboseFilter && this.monitorOutput[i].match(regex)) {
          continue;
        }
      }
      if (
        this.monitorOutput[i].trim() === '\n' ||
        this.monitorOutput[i].trim() === '\r' ||
        this.monitorOutput[i].trim() === '\r\n' ||
        this.monitorOutput[i].trim() === ''
      ) {
        continue;
      }
      let m = this.monitorOutput[i];
      if (this.monitorOutput[i].startsWith('[#]')) {
      if (this.monitorOutput[i].startsWith('[#]')) {
        if (!isVerboseFilter) {
          continue;
        } else {
          m = m.replace('[#]', '');
        }
      }
      //position
      if (!isVerboseFilter && this.monitorOutput[i].startsWith('X:')) {
        continue;
      }
      if (!isVerboseFilter && this.monitorOutput[i].startsWith('FR:')) {
      if (!isVerboseFilter && this.monitorOutput[i].startsWith('FR:')) {
        continue;
      }
      m = m.replace('&', '&amp;');
      m = m.replace('<', '&lt;');
      m = m.replace('>', '&gt;');
      if (
        m.startsWith('ALARM:') ||
        m.startsWith('Hold:') ||
        m.startsWith('Door:')
      ) {
        m =
          "<font color='orange'><b>" +
          m +
          (m.trim()) +
          '</b></font>\n';
      }
      if (m.startsWith('error:')) {
        m =
          "<font color='red'><b>" +
          m.toUpperCase() +
          (m.trim()) +
          '</b></font>\n';
      }
      if (
        (m.startsWith('echo:') || m.startsWith('Config:')) &&
        !isVerboseFilter
      ) {
        continue;
      }
      if (
        m.startsWith('echo:Unknown command: "echo"') ||
        m.startsWith('echo:enqueueing "*"')
      ) {
        continue;
      }
      output += m;
    }
    // document.getElementById('cmd_content').innerHTML = output;
    this.handleMonitorCheckAutoscroll();
  }

  public handleSendCustomCommand = (command?: string) => {
    let url = '/command?commandText=';
    let editCommand = command?.trim();
    if (editCommand?.trim().length === 0) {
      return;
    }
    this.customCommandHistory.push(editCommand!);
    this.customCommandHistory.slice(-40);
    this.customCommandHistoryIndex = this.customCommandHistory.length;
    // document.getElementById('custom_cmd_txt').value = '';
    this.handleMonitorOutputUpdate(editCommand + '\n');
    editCommand = encodeURI(editCommand!);
    //because # is not encoded
    editCommand = editCommand.replace('#', '%23');
    httpService.handleSendGetHttp(url + command, this.SendCustomCommandSuccess, this.SendCustomCommandFailed);
  }

  // public CustomCommand_OnKeyUp(event) {
  //   if (event.keyCode == 13) {
  //     handleSendCustomCommand();
  //   }
  //   if (event.keyCode == 38 || event.keyCode == 40) {
  //     if (
  //       event.keyCode == 38 &&
  //       CustomCommand_history.length > 0 &&
  //       CustomCommand_history_index > 0
  //     ) {
  //       CustomCommand_history_index--;
  //     } else if (
  //       event.keyCode == 40 &&
  //       CustomCommand_history_index < CustomCommand_history.length - 1
  //     ) {
  //       CustomCommand_history_index++;
  //     }
  //
  //     if (
  //       CustomCommand_history_index >= 0 &&
  //       CustomCommand_history_index < CustomCommand_history.length
  //     ) {
  //       document.getElementById('custom_cmd_txt').value =
  //         CustomCommand_history[CustomCommand_history_index];
  //     }
  //     return false;
  //   }
  //   return true;
  //  }

  public SendCustomCommandSuccess = (response) => {
    if (response[response.length - 1] != '\n') {
      Monitor_output_Update(response + '\n');
    } else {
      Monitor_output_Update(response);
    }
    let tcmdres = response.split('\n');
    for (let il = 0; il < tcmdres.length; il++) {
      process_socket_response(tcmdres[il]);
    }
  }

  public SendCustomCommandFailed(error_code, response) {
    if (error_code == 0) {
      Monitor_output_Update(translate_text_item('Connection error') + '\n');
    } else {
      Monitor_output_Update(
        translate_text_item('Error : ') +
          error_code +
          ' :' +
          decode_entitie(response) +
          '\n',
      );
    }
    console.log('cmd Error ' + error_code + ' :' + decode_entitie(response));
  }
}

export const commandService: CommandService = new CommandService();
