import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-artical-display',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artical-display.component.html',
  styleUrls: ['./artical-display.component.scss']
})
export class ArticalDisplayComponent implements OnInit {
  public markdownContent: string = 'hello';

  constructor(private markdownService: MarkdownService) {}

  ngOnInit(): void {
    this.markdownService.getMarkdownContent('assets/articals/example.md').subscribe({
      next: (content: string) => {
        this.markdownContent = content;
      },
      error: (err) => {
        console.error('Error loading markdown content:', err);
      }
    });
  }
}
