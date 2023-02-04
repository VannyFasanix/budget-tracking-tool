import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/modules/entities/menuItem';
import { ConfigService } from 'src/modules/services/config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private config: ConfigService) { }

  darkTheme: boolean = true;
  menu: MenuItem[] | any = [];
  title: string = "";

  ngOnInit(): void {
    this.title = this.config.title;
    this.menu = this.config.menu;
  }

  public changeFlag(flag: string) {
    this.config.nextFlagChange(flag)
  }

  public get innerWidth(): number {
    return window.innerWidth;
  }

  public switchTheme(): void {
    const element = document.getElementById('index-page')!

    if(element.classList.value == 'dark') {
      element.classList.remove('dark');
    } else {
      element.classList.add('dark');
    }

    const style = document.documentElement.style.setProperty('$bg-screen-color',"--tw-bg-opacity: 1; background-color: rgba(17, 24, 39, var(--tw-bg-opacity))");

    this.darkTheme = this.checkTheme()
    this.config.darkTheme = this.darkTheme;
  }

  public checkTheme(): boolean {
    const element = document.getElementById('index-page')!
    return element.classList.value == 'dark'
  }

  public openSidebar(): void {
    const e = document.getElementById('default-sidebar')!;
    e?.classList.toggle('-translate-x-full')
  }
}
