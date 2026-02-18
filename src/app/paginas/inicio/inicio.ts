import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para el *ngFor

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class InicioComponent {
  // Datos dinámicos para la página principal
  productosNuevos = [
    { 
      nombre: 'UltraCore X9 CPU', 
      desc: 'Rendimiento inigualable para juegos.', 
      img: 'img/intel.jpg',
      precio: '$450' 
    },
    { 
      nombre: 'ASUS ROG ASTRAL', 
      desc: 'Tarjeta Gráfica de última generación.', 
      img: 'img/rtx5090.png',
      precio: '$1200' 
    },
    { 
      nombre: 'Predator SSD 2TB', 
      desc: 'Almacenamiento ultrarrápido NVMe.', 
      img: 'img/nvme.jpg',
      precio: '$180' 
    }
  ];
}