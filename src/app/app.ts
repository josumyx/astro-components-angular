import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Agregamos RouterLink aquí

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 2. Ahora sí funcionará porque está importado arriba
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent { 
  title = 'ejemplo';
  
  // 3. Unimos la lógica del menú aquí adentro, sin repetir "export class"
  menuAbierto = false; 

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
}