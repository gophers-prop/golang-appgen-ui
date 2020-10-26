import { Component, OnInit } from '@angular/core';
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
    ["gin-gonic/gin","go-martini/martini","goji/goji"],
    ["net/http","go-resty/resty","jcmturner/restclient"]
  ]
  loggingFrameworks = ["golang/glog","sirupsen/logrus"]
  logFrameworkChecked = [false,false]
  constructor(private boilerplate:BoilerPlate){}

  isValidAppName() {
    return /^([a-zA-Z]{1,20})$/.test(this.appName);
  }
  
  ngOnInit() {
    this.boilerplate.counter().subscribe(res =>{          
     var somejson =  JSON.stringify(res);        
     document.getElementById("dynamic_counter").innerHTML = JSON.parse(somejson).Count;      
    },err =>{
      console.log(err)
    });     
  }
  
  explore(){
    var btn = document.getElementById("explore");
    btn.innerHTML = 'Preparing';   
    var  logframework = "" 
    for(let i=0;i<this.logFrameworkChecked.length;i++){
      if(this.logFrameworkChecked[i] ==true){
        logframework = this.loggingFrameworks[i]
      }
    } 
    var request ={
      "appType": this.appType[this.selectedAppTypeIndex],
      "library" : this.libraries[this.selectedAppTypeIndex][this.selectedLibraryIndex],
      "appName" : this.appName,
      "loggingframework" : logframework
    };
    console.log(request)
    this.boilerplate.exploreBoilerPlate(request).subscribe(res =>{
       this.boilerplate.counter().subscribe(res =>{          
        var somejson =  JSON.stringify(res);        
        document.getElementById("dynamic_counter").innerHTML = JSON.parse(somejson).Count;      
       },err =>{
         console.log(err)
       });
      btn.innerHTML = 'Explore';
      var childWindow = window.open("https://codesandbox.io/embed/github/gophers-prop/"+this.appName);
    },err =>{
      console.log(err)
    });
    
   
    //use 's' instead of embed for full sandbox
  }

  getBoilerPlate(){
   var  logframework = "" 
    for(let i=0;i<this.logFrameworkChecked.length;i++){
      if(this.logFrameworkChecked[i] ==true){
        logframework = this.loggingFrameworks[i]
      }
    } 
    var request ={
      "appType": this.appType[this.selectedAppTypeIndex],
      "library" : this.libraries[this.selectedAppTypeIndex][this.selectedLibraryIndex],
      "appName" : this.appName,
      "loggingframework" : logframework
    };
    console.log(request)
    this.boilerplate.getBoilerPlate(request).subscribe(res =>{
      this.downloadFile(res);
    },err =>{
      console.log(err)
    });
    this.boilerplate.counter().subscribe(res =>{          
        var somejson =  JSON.stringify(res);        
        document.getElementById("dynamic_counter").innerHTML = JSON.parse(somejson).Count;      
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
}
