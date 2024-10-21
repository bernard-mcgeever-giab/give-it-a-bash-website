import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavagationComponent } from './features/navagation/navagation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavagationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'give-it-a-bash-website';
}
