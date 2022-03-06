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
}
