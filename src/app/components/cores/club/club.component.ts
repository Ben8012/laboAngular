import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClubComponent implements OnInit {

  ngOnInit(): void { }

}
