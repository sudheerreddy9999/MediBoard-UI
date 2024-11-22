import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  isSideNavOpen: boolean = true;

  constructor(private router: Router) {}
  @Input() sideNavContent?: { route: string; image: string }[] = [];

  toggleSideNav(): void {
    this.isSideNavOpen = !this.isSideNavOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    // this.isSideNavOpen = false;
  }
}