import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticalRetrivalService } from '../../services/artical-retrival.service';
import { ArticalMetadata } from './models/artical-metadata';

@Component({
  selector: 'app-navagation',
  templateUrl: './navagation.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navagation.component.scss']
})
export class NavagationComponent implements OnInit {

  isNavOpen = false;
  isDropdownOpen: { [key: string]: boolean } = { education: false, products: false };
  
  educationArticles: ArticalMetadata[] = [];
  productArticles: ArticalMetadata[] = [];

  articles: string[] = [];

  constructor(private articalRetrivalService: ArticalRetrivalService) {}

  ngOnInit(): void {
    this.articalRetrivalService.getMarkdownFiles("products").subscribe(files => {
      this.productArticles = files;
    });

    this.articalRetrivalService.getMarkdownFiles("education").subscribe(files => {
      this.educationArticles = files;
    });
  }

  toggleNav(event: MouseEvent) {
    event.stopPropagation(); 
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav() {
    this.isNavOpen = false;
  }

  toggleDropdown(event: MouseEvent, menu: string) {
    event.stopPropagation(); 
    this.isDropdownOpen[menu] = !this.isDropdownOpen[menu];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isNavOpen) {
      this.closeNav();
    }
  }
}
