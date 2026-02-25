import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Esto es vital para *ngFor y *ngIf

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class ProductosComponent {
  // 1. La variable que te daba el error TS2339
  searchTerm: string = '';

  // 2. La lista de productos que el *ngFor necesita recorrer
  productos = [
    { 
      nombre: 'NVIDIA RTX 5090', 
      precio: 1999, 
      imagen: 'img/nvme.jpg', 
      categoria: 'Tarjetas Gráficas' 
    },
    { 
      nombre: 'Intel Core Ultra 9', 
      precio: 599, 
      imagen: 'img/intel.jpg', 
      categoria: 'Procesadores' 
    },
    { 
      nombre: 'SSD Predator 2TB', 
      precio: 150, 
      imagen: 'img/producto1.png', 
      categoria: 'Almacenamiento' 
    }
  ];

  // 3. La lista filtrada que se muestra en pantalla
  productosFiltrados = [...this.productos];

  // 4. Función para que el botón de añadir no dé error
  agregarAlCarrito() {
    console.log('Producto añadido');
  }
}