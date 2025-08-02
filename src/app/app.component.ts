import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,  // Establecer el componente como standalone
  imports: [HttpClientModule, IonicModule, CommonModule, RouterModule],  
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    console.log('App Component Initialized');
  }
}
