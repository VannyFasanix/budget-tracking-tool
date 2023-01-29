import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/modules/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private config: ConfigService) { }

  ngOnInit(): void {
  }

  public changeFlag(flag: string) {
    this.config.nextFlagChange(flag)
  }

}
