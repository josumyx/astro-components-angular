import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  isLoggedIn: boolean = false;

  readonly FOTO_DEFAULT = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  usuario = {
    nombre: '',
    email: '',
    password: '',
    foto: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.verificarEstado();
    this.authService.onSessionChange.subscribe((user) => {
      this.isLoggedIn = user !== null;
      if (user) this.usuario = { ...this.usuario, ...user };
    });
  }

  verificarEstado() {
    this.isLoggedIn = this.authService.estaAutenticado();
    if (this.isLoggedIn) {
      const datos = this.authService.obtenerUsuario();
      if (datos) {
       
        this.usuario = { ...this.usuario, ...datos };
        if (!this.usuario.foto) this.usuario.foto = this.FOTO_DEFAULT;
      }
    }
  }

  togglePanel() {
    this.isLogin = !this.isLogin;
  }

  // --- NUEVA FUNCIÓN PARA SUBIR FOTO ---
  onFileSelected(event: any) {
    const archivo = event.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Actualizamos la foto en el objeto local
        this.usuario.foto = e.target.result;
        // Guardamos los cambios para que se reflejen en toda la app
        this.authService.guardarUsuario(this.usuario);
      };
      reader.readAsDataURL(archivo);
    }
  }

  eliminarFoto() {
    if (confirm('¿Seguro que quieres quitar tu foto de perfil?')) {
      this.usuario.foto = this.FOTO_DEFAULT;
      this.authService.guardarUsuario(this.usuario);
    }
  }

  onSubmit() {
    if (!this.isLogin && !this.usuario.nombre) {
      this.usuario.nombre = 'Piloto Astro';
    }
    this.authService.guardarUsuario(this.usuario);
    this.isLoggedIn = true; 
    alert(this.isLogin ? '¡Bienvenido de nuevo!' : '¡Cuenta creada con éxito!');
    this.router.navigate(['/']); 
  }

  actualizarPerfil() {
    this.authService.guardarUsuario(this.usuario);
    alert('Cambios guardados correctamente ✅');
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.isLoggedIn = false;
    this.isLogin = true; 
    this.router.navigate(['/login']);
  }
}