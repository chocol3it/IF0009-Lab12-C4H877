import { Component } from '@angular/core';
import { Agenda } from './components/agenda/agenda';

@Component({
  imports: [Agenda],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
