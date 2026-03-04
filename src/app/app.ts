import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterOutlet, RouterLink, Router } from '@angular/router'; // 1. SE AÑADIÓ 'Router' AQUÍ
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit { 
  // Variables de estado
  isDarkMode: boolean = false;
  menuAbierto: boolean = false;
  carritoCount: number = 0;
  
  // Variables de Autenticación
  isLoggedIn: boolean = false;
  usuarioActivo: any = null;

 // En app.ts
constructor(private authService: AuthService, private router: Router) {
  // Verificamos que 'authService' sea el nombre correcto del parámetro
  this.authService.onSessionChange.subscribe((usuario: any) => { 
    this.isLoggedIn = usuario !== null;
    this.usuarioActivo = usuario;
    console.log("Sesión actualizada:", this.isLoggedIn);
  });
}
  // 2. SE AÑADIÓ ESTE MÉTODO (Obligatorio por el 'implements OnInit')
  ngOnInit() {
    this.verificarSesion();
  }

  // Revisa si hay una sesión activa al cargar o actualizar la app
  verificarSesion() {
    this.isLoggedIn = this.authService.estaAutenticado();
    this.usuarioActivo = this.authService.obtenerUsuario();
  }

  // 1. Lista de productos maestros
  productos = [
    { nombre: 'Intel Core Ultra 9', precio: 599, imagen: 'img/intel.jpg', categoria: 'Procesadores' },
    { nombre: 'NVIDIA RTX 5090', precio: 1999, imagen: 'img/rtx5090.jpg', categoria: 'Gráficas' },
    { nombre: 'SSD Predator 2TB', precio: 150, imagen: 'img/ssd.jpg', categoria: 'Almacenamiento' },
    { nombre: 'RAM Corsair 32GB', precio: 120, imagen: 'img/ram.jpg', categoria: 'Memoria' },
  ];

  productosFiltrados = [...this.productos];

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme');
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

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

  agregarAlCarrito() {
    this.carritoCount++;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.isLoggedIn = false;
    this.usuarioActivo = null;
    this.router.navigate(['/']); // Mejor usar el router en vez de reload
  }
}