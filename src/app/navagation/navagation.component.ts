import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navagation',
  templateUrl: './navagation.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navagation.component.scss']
})
export class NavagationComponent {

  isNavOpen = false;

  toggleNav(event: MouseEvent) {
    event.stopPropagation(); 
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isNavOpen) {
      this.closeNav();
    }
  }
}
