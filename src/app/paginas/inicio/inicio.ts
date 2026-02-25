import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss'
})
export class InicioComponent {
  // 1. Datos de los productos (Asegúrate de que los nombres coincidan con el HTML)
  productos = [
    { nombre: 'Intel Core Ultra 9', precio: 599, imagen: 'img/intel.jpg', categoria: 'Procesadores' },
    { nombre: 'NVIDIA RTX 5090', precio: 1999, imagen: 'img/rtx5090.jpg', categoria: 'Gráficas' },
    { nombre: 'SSD Predator 2TB', precio: 150, imagen: 'img/ssd.jpg', categoria: 'Almacenamiento' },
  ];

  // 2. Variable que soluciona el error 'productosFiltrados'
  productosFiltrados = [...this.productos];

  // 3. Función que soluciona el error 'buscar'
  buscar(event: any) {
    const texto = event.target.value.toLowerCase();
    
    if (!texto) {
      this.productosFiltrados = [...this.productos];
      return;
    }

    this.productosFiltrados = this.productos.filter(p => 
      p.nombre.toLowerCase().includes(texto) || 
      p.categoria.toLowerCase().includes(texto)
    );
  }

  // 4. Variable y función que soluciona el error 'agregarAlCarrito'
  carritoCount = 0;
  agregarAlCarrito() {
    this.carritoCount++;
    console.log('Producto añadido al carrito. Total:', this.carritoCount);
    alert('¡Producto añadido al carrito!');
  }
}