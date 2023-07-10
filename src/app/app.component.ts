import { Component, OnInit } from '@angular/core';
import { Model } from 'src/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'JAM';
  showModel:boolean= false;
  time: number = 120;
  interval:any;
  selectedQuestion: {id:number,topic:string} = {id:0,topic:'?'};
  randNextNumber :number = 1;
  randArray:number[] = [1]
  constructor(public _model :Model){ }
  ngOnInit():void{
    console.log(this._model.topics);
  }
  getTid(t:number){
    // console.log(t)
    return t <= 9 ? `0${t}` : t;
  }
  checkForDisable(t:number){
    if(t === this.randNextNumber){
      return false
    } else{
      return true
    }
  }
  openModel(t:object){
    while(true){
      this.randNextNumber = Math.floor(Math.random() * this._model.topics.length);
      if (!this.randArray.includes(this.randNextNumber)){
        this.randArray.push(this.randNextNumber);
        break
      }
    }
    this.selectedQuestion = t as {id:number,topic:string};
    console.log('clicked object',t)
    this.showModel = true;
      this.interval = setInterval(() => {
        if(this.time == 0){
          clearInterval(this.interval);
          this.showModel = false;
          this.time = 120;
        } else{
          this.time --;
        }
      },1000)
  }
}
