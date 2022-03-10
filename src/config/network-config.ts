export const baudRateList = [
  {id: 1, name: '9600', code: '9600'},
  {id: 2, name: '19200', code: '19200'},
  {id: 3, name: '38400', code: '38400'},
  {id: 4, name: '57600', code: '57600'},
  {id: 5, name: '115200', code: '115200'},
  {id: 6, name: '230400', code: '230400'},
  {id: 7, name: '250000', code: '250000'},
  {id: 8, name: '500000', code: '500000'},
  {id: 9, name: '921600', code: '921600'},
];

export const sleepModeList = [
  {id: 1, name: 'None', code: '0'},
  {id: 2, name: 'Light', code: '1'},
  {id: 3, name: 'Medium', code: '2'},
];

export const wifiModeList = [
  {id: 1, name: 'Access Point', code: '1'},
  {id: 2, name: 'Client Station', code: '2'},
];

export const stationNetworkModeList = [
  {id: 1, name: '11b', code: '1'},
  {id: 2, name: '11g', code: '2'},
  {id: 3, name: '11n', code: '3'},
];

export const stationIpModeList = [
  {id: 1, name: 'DHCP', code: '1'},
  {id: 2, name: 'Static', code: '2'},
];

export const apNetworkModeList = [
  {id: 1, name: '11b', code: '1'},
  {id: 2, name: '11g', code: '2'},
];

export const ssidVisibleList = [
  {id: 1, name: 'No', code: '0'},
  {id: 2, name: 'Yes', code: '1'},
];

export const apChannelList = [
  {id: 1, name: '1', code: '1'},
  {id: 2, name: '2', code: '2'},
  {id: 3, name: '3', code: '3'},
  {id: 4, name: '4', code: '4'},
  {id: 5, name: '5', code: '5'},
  {id: 6, name: '6', code: '6'},
  {id: 7, name: '7', code: '7'},
  {id: 8, name: '8', code: '8'},
  {id: 9, name: '9', code: '9'},
  {id: 10, name: '10', code: '10'},
  {id: 11, name: '11', code: '11'},
];

export const apAuthenticationList = [
  {id: 1, name: 'Open', code: '0'},
  {id: 2, name: 'WPA', code: '2'},
  {id: 2, name: 'WPA2', code: '3'},
  {id: 2, name: 'WPA/WPA2', code: '4'},
];

export const apIpModeList = [
  {id: 1, name: 'DHCP', code: '1'},
  {id: 2, name: 'Static', code: '2'},
];

export const notificationModeList = [
  {id: 1, name: 'None', code: '0'},
  {id: 2, name: 'Pushover', code: '1'},
  {id: 3, name: 'Email', code: '2'},
  {id: 4, name: 'Line', code: '3'},
];

export const autoNotificationList = [
  {id: 1, name: 'No', code: '0'},
  {id: 2, name: 'Yes', code: '1'},
];

export const networkConfigDropdownList = {
  '112': baudRateList,
  '117': sleepModeList,
  '0': wifiModeList,
  '116': stationNetworkModeList,
  '99': stationIpModeList,
  '330': apNetworkModeList,
  '120': ssidVisibleList,
  '118': apChannelList,
  '119': apAuthenticationList,
  '329': apIpModeList,
  '168': notificationModeList,
};
