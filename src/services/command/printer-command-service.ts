import {targetFirmware} from 'src/config/const';

export function sendPrinterCommandService() {}

export function SendPrinterCommandSuccess(response) {
  if (targetFirmware === 'grbl' || targetFirmware === 'grbl-embedded') {
    return;
  }
  if (response[response.length - 1] != '\n') {
    Monitor_output_Update(response + '\n');
  } else {
    Monitor_output_Update(response);
  }
}

export function SendPrinterCommandFailed(error_code, response) {
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
  console.log(
    'printer cmd Error ' + error_code + ' :' + decode_entitie(response),
  );
}
