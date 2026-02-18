import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent {
  // Lista de catálogo completa
  catalogo = [
    { 
      nombre: 'UltraCore X9 CPU', 
      img: 'img/intel.jpg', 
      desc: 'Rendimiento inigualable para juegos y productividad.',
      categoria: 'Procesadores'
    },
    { 
      nombre: 'ASUS ROG ASTRAL', 
      img: 'img/rtx5090.png', 
      desc: 'Tarjeta Gráfica de última generación con Ray Tracing.',
      categoria: 'Gráficas'
    },
    { 
      nombre: 'Predator SSD 2TB', 
      img: 'img/nvme.jpg', 
      desc: 'Almacenamiento ultrarrápido NVMe Gen5.',
      categoria: 'Almacenamiento'
    }
    // Puedes repetir estos objetos o agregar más y el diseño se ajustará solo
  ];
}