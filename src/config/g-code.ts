export enum GCode {
  StartSDPrint = 'M24',

  PauseSDPrint = 'M25',

  ReportSDPrintStatus = 'M27',

  PrintTime = 'M31',

  DeleteSDFile = 'M30',

  AutoHome = 'G28',

  AbortSDPrint = 'M524',

  SelectSDFile = 'M23',

  ListSDFile = 'M20',

  GetNetworkConfiguration = '[ESP400]',

  SubmitNetworkConfiguration = '[ESP401]',

  GetApList = '[ESP410]',

  GetPrinterInfo = '[ESP420]plain',

  RestartPrinter = '[ESP444]RESTART',
}
