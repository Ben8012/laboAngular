import { Component, Input, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/session/user-session.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {

  @Input() User : any
  @Input() VoteAvg : any
  @Input() Vote : any

  constructor(
    
  ) {}

  ngOnInit(): void {
   
  } 


 
}
