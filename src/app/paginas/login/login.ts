import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  // Variable clave para la animación de giro
  isLogin: boolean = true;

  usuario = {
    email: '',
    password: ''
  };

  // Función que dispara el giro al hacer clic
  togglePanel() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    console.log('Ingresando...', this.usuario);
  }
}