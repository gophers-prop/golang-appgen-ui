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
  title = 'Golang AppGen';
  selectedAppTypeIndex = 0;
  selectedLibraryIndex = 0;
  activeLibrary = ["spf13/cobra","urfave/cli","alecthomas/kingpin"]
  appName ="";

  appType = ["cli","webservice","webclient"]
  libraries = [
    ["spf13/cobra","urfave/cli","alecthomas/kingpin"],
    ["goji-1","ginrest","martini"],
    ["net/http","go-resty/resty","jcmturner/restclient"]
  ]
  loggingFrameworks = ["golang/glog","sirupsen/logrus"]
  databaseFrameworks = ["mysql"]
  logFrameworkChecked = [false,false]
  databaseFrameworkChecked = [false]
  constructor(private boilerplate:BoilerPlate){}
  

  getBoilerPlate(){
   var  logframework = "" 
    for(let i=0;i<this.logFrameworkChecked.length;i++){
      if(this.logFrameworkChecked[i] ==true){
        logframework = this.loggingFrameworks[i]
        break;
      }
    } 
    var databaseFramework = ""
    for(let i=0;i<this.databaseFrameworkChecked.length;i++){
      if(this.databaseFrameworkChecked[i] ==true){
        databaseFramework = this.databaseFrameworks[i]
      }
    } 
    var functionalities = [];
    if (logframework != ""){
      functionalities.push({
        "name":"logging",
        "library":logframework
      })
    }
    if (databaseFramework != ""){
      functionalities.push({
        "name":"database",
        "library":databaseFramework
      })
    }
    
    
    var request ={
      "appType": this.appType[this.selectedAppTypeIndex],
      "library" : this.libraries[this.selectedAppTypeIndex][this.selectedLibraryIndex],
      "appName" : this.appName,
      "functionalities":  functionalities};

    console.log(request)
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
  setLoggingFramework(event,index){
    this.logFrameworkChecked[index] = event.checked
    for(let i=0;i<this.logFrameworkChecked.length;i++){
      if (i == index )continue;
        this.logFrameworkChecked[i] = false
      } 
  }
  setDatabaseFramework(event,index){
    this.databaseFrameworkChecked[index] = event.checked
    for(let i=0;i<this.databaseFrameworkChecked.length;i++){
      if (i == index )continue;
        this.databaseFrameworkChecked[i] = false
      } 
  }
}
