import { Component } from '@angular/core';
import { SessionService } from '../../modules/security/services/session.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  user: { label: string } | null = null;

  constructor(private $session: SessionService<{ id: number, label: string }>)
   {
      $session.subscribe((user) => this.user = user);
      console.log(this.user)
   }

  handleLogoutAction(){
    this.$session.close();
  }
}
