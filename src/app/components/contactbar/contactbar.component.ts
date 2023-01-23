import { isEmpty } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/interfaces/user.model';
import { ObservableService } from 'src/app/services/observable/observable.service';



@Component({
  selector: 'app-contactbar',
  templateUrl: './contactbar.component.html',
  styleUrls: ['./contactbar.component.scss']
})
export class ContactbarComponent implements OnInit {

  private _friends : any [] = []
  get friends(): any []  { return this._friends; }


  constructor(
    private _observableService: ObservableService,
  ){ }

  ngOnInit(): void {
      this._observableService.$friends.subscribe({
        next : (friends :any) =>{
          if(Object.keys(friends).length != 0){
            this._friends = friends;
            //console.log(this.friends)
          }
        },
        error : (error) =>{
          console.log(error)
        }
      })
  }



}
