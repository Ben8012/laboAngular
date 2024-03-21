import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteComponent implements OnInit {

  ngOnInit(): void { }

}
