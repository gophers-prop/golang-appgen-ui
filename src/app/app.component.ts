import {Component, OnInit} from '@angular/core';
import * as FileSaver from 'file-saver';
import {AppService} from './app-service';
import {AppConstants} from './common/constants/app-constants';
import {CodeGenerateRequest} from "./common/modal/code-generate-request";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  selectedAppTypeIndex = 0;
  selectedLibraryIndex = 0;
  totalApplicationDownloads = 0;
  exploreButtonText: string;
  activeLibrary = ["spf13/cobra", "urfave/cli", "alecthomas/kingpin"]
  appName: string;

  appType = ["cli", "webservice", "webclient"]
  libraries = [
    ["spf13/cobra", "urfave/cli", "alecthomas/kingpin"],
    ["gin-gonic/gin", "go-martini/martini", "goji/goji"],
    ["net/http", "go-resty/resty", "jcmturner/restclient"]
  ]
  loggingFrameworks = ["golang/glog", "sirupsen/logrus"]
  logFrameworkChecked = [false, false]

  constructor(private readonly appService: AppService) {
  }

  isValidAppName() {
    return /^([a-zA-Z]{1,20})$/.test(this.appName);
  }

  ngOnInit() {
    this.exploreButtonText = AppConstants.EXPLORE_DEFAULT_BUTTON_TEXT;
    this.title = AppConstants.APPLICATION_TITLE;
    this.setApplicationDownloadCount();
  }

  setApplicationDownloadCount(): void {
    this.appService.counter().subscribe(res => {
      this.totalApplicationDownloads = JSON.parse(JSON.stringify(res)).Count;
    }, err => {
      console.log(err)
    });
  }

  getCodeGeneratorRequest(): CodeGenerateRequest {
    let logFrameWork = ""
    for (let i = 0; i < this.logFrameworkChecked.length; i++) {
      if (this.logFrameworkChecked[i] == true) {
        logFrameWork = this.loggingFrameworks[i]
      }
    }
    return new CodeGenerateRequest(this.appType[this.selectedAppTypeIndex],
      this.libraries[this.selectedAppTypeIndex][this.selectedLibraryIndex],
      this.appName,
      logFrameWork);
  }


  explore() {
    this.exploreButtonText = AppConstants.PREPARING_BUTTON_TEXT;
    this.appService.exploreBoilerPlate(this.getCodeGeneratorRequest()).subscribe(() => {
      this.setApplicationDownloadCount();
      this.exploreButtonText = AppConstants.EXPLORE_DEFAULT_BUTTON_TEXT;
      window.open(AppConstants.CODE_SAND_BOX_URL + this.appName);
    }, err => {
      console.log(err)
    });
  }

  getBoilerPlate() {
    this.appService.getBoilerPlate(this.getCodeGeneratorRequest()).subscribe(res => {
      this.downloadFile(res);
    }, err => {
      console.log(err)
    });
    this.setApplicationDownloadCount();
  }

  setSelectedAppTypeTab(changeTab: number): void {
    this.selectedAppTypeIndex = changeTab
    this.selectedLibraryIndex = 0
    this.activeLibrary = this.libraries[this.selectedAppTypeIndex]
  }

  setSelectedLibraryTab(changeTab: number): void {
    this.selectedLibraryIndex = changeTab
  }

  downloadFile(response) {
    const blob = new Blob([response], {type: 'application/zip'});
    FileSaver.saveAs(blob, this.appName + ".zip");
  }

  reset() {
    this.selectedAppTypeIndex = 0;
    this.selectedLibraryIndex = 0;
    this.appName = "";
    this.exploreButtonText = AppConstants.EXPLORE_DEFAULT_BUTTON_TEXT;
  }

  setLoggingFramework(event, index) {
    this.logFrameworkChecked[index] = event.checked;
    for (let i = 0; i < this.logFrameworkChecked.length; i++) {
      if (i == index) continue;
      this.logFrameworkChecked[i] = false;
    }
  }
}
