import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html', 
  styleUrl: './contacto.scss'
})
export class ContactoComponent {
  datosContacto = { nombre: '', email: '', mensaje: '' };

  enviarMensaje() {
    if (this.datosContacto.nombre) {
      alert(`¡Gracias ${this.datosContacto.nombre}! Mensaje enviado.`);
      this.datosContacto = { nombre: '', email: '', mensaje: '' };
    }
  }
}