import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-formation',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationComponent implements OnInit {

  ngOnInit(): void { }

}
