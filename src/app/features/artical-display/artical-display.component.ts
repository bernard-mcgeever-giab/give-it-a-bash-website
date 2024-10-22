import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarkdownService } from '../../services/markdown.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-artical-display',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artical-display.component.html',
  styleUrls: ['./artical-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticalDisplayComponent implements OnInit {
  public markdownContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private markdownService: MarkdownService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const filePath = `assets/articals/${params['file']}`;
      this.markdownService.getMarkdownContent(filePath).subscribe(content => {
        this.markdownContent = content;
      });
    });
  }
}
