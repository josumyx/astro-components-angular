import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acerca',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss'
})
export class NosotrosComponent {
  // Aquí podrías agregar un arreglo con los valores de la empresa si quisieras hacerlo dinámico
}