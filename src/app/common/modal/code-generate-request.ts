export class CodeGenerateRequest {
  appType: string;
  library: any;
  appName: string;
  loggingFrameWork: string;

  constructor(appType: string, library: any, appName: string, loggingFrameWork: string) {
    this.appType = appType;
    this.library = library;
    this.appName = appName;
    this.loggingFrameWork = loggingFrameWork;
  }

}
