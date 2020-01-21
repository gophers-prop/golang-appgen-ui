import { Component } from '@angular/core';
import {BoilerPlate} from './shared/boilerplate.service'
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'go-initializr';
  selectedAppTypeIndex = 0;
  selectedLibraryIndex = 0;
  activeLibrary = ["urfave","spf13/kingpin","alecthomas/kingpin"]
  appName ="";

  appType = ["cli","webservice","webclient"]
  libraries = [
    ["urfave","spf13/cobra","alecthomas/kingpin"],
    ["gin-gonic/gin","go-martini/martini","goji/goji"],
    ["net/http","go-resty/resty","jcmturner/restclient"]
  ]

  constructor(private boilerplate:BoilerPlate){}
  

  getBoilerPlate(){
    var request ={
      "appType": this.appType[this.selectedAppTypeIndex],
      "library" : this.libraries[this.selectedAppTypeIndex][this.selectedLibraryIndex],
      "appName" : this.appName
    };
    this.boilerplate.getBoilerPlate(request).subscribe(res =>{
      this.downloadFile(res);
    },err =>{
      console.log(err)
    });
  }
  setSelectedAppTypeTab(changeTab: number) : void {
    this.selectedAppTypeIndex = changeTab
    this.selectedLibraryIndex=0  
    this.activeLibrary = this.libraries[this.selectedAppTypeIndex]
  }
  setSelectedLibraryTab(changeTab: number) : void {
    this.selectedLibraryIndex = changeTab  
  }

  downloadFile(response){
    console.log(response)
    const blob = new Blob([response], { type: 'application/zip' });
    FileSaver.saveAs(blob,this.appName+".zip");
  }
  reset(){
    this.selectedAppTypeIndex=0
    this.selectedLibraryIndex=0
    this.appName=""
  }
}
