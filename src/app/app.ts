import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Añadido para formularios si fuera necesario

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Variables de estado
  isDarkMode: boolean = false;
  menuAbierto: boolean = false;
  carritoCount: number = 0;

  // 1. Lista de productos maestros
  productos = [
    { nombre: 'Intel Core Ultra 9', precio: 599, imagen: 'img/intel.jpg', categoria: 'Procesadores' },
    { nombre: 'NVIDIA RTX 5090', precio: 1999, imagen: 'img/rtx5090.jpg', categoria: 'Gráficas' },
    { nombre: 'SSD Predator 2TB', precio: 150, imagen: 'img/ssd.jpg', categoria: 'Almacenamiento' },
    { nombre: 'RAM Corsair 32GB', precio: 120, imagen: 'img/ram.jpg', categoria: 'Memoria' },
  ];

  // 2. Lista que se muestra en el HTML
  productosFiltrados = [...this.productos];

  // Alternar Modo Oscuro
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  // Alternar Menú Desplegable
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  // 3. Lógica del Buscador en tiempo real
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

  // Función extra para el carrito (opcional)
  agregarAlCarrito() {
    this.carritoCount++;
  }
}