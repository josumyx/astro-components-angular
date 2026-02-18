import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para usar ciclos

@Component({
  selector: 'app-destacados',
  standalone: true,
  imports: [CommonModule], // Agregamos CommonModule
  templateUrl: './destacados.html',
  styleUrl: './destacados.scss'
})
export class DestacadosComponent {
  // Lista de productos: Solo tienes que editar esto para agregar más
  productosDestacados = [
    { nombre: 'Astro COOLER', imagen: 'img/cooler.png', tag: 'Destacado' },
    { nombre: 'NVIDIA RTX 5070', imagen: 'img/producto1.png', tag: 'Nuevo' },
    { nombre: 'AMD Ryzen 7 5700X', imagen: 'img/ryzen75700x.jpg', tag: 'Top Ventas' },
    { nombre: 'Astro COOLER Pro', imagen: 'img/cooler.png', tag: 'Destacado' },
    { nombre: 'NVIDIA RTX 5080', imagen: 'img/producto1.png', tag: 'Proximamente' },
    { nombre: 'AMD Ryzen 9', imagen: 'img/ryzen75700x.jpg', tag: 'Elite' }
  ];
}