import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ContactComponent } from './features/contact/contact.component';
import { ArticalDisplayComponent } from './features/artical-display/artical-display.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: ArticalDisplayComponent },
    { path: 'article/:file', component: ArticalDisplayComponent }
];
