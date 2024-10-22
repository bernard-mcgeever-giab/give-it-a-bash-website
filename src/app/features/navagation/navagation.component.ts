import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticalRetrivalService } from '../../services/artical-retrival.service';

@Component({
  selector: 'app-navagation',
  templateUrl: './navagation.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./navagation.component.scss']
})
export class NavagationComponent implements OnInit {
  articles: string[] = [];
  isNavOpen = false;

  constructor(private articalRetrivalService: ArticalRetrivalService) {}

  ngOnInit(): void {
    this.articalRetrivalService.getMarkdownFiles().subscribe(files => {
      this.articles = files;
    });
  }

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
