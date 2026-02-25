import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss'
})
export class ServiciosComponent {
  misServicios = [
    { 
      titulo: 'Ensamble Gratis', 
      img: 'img/ensamblado2.png', 
      desc: 'Montamos su PC sin costo adicional con la compra de componentes.' 
    },
    { 
      titulo: 'Soporte Técnico', 
      img: 'img/soporte.png', 
      desc: 'Expertos listos para ayudarte con cualquier duda o problema.' 
    },
    { 
      titulo: 'Entregas Rápidas', 
      img: 'img/entrega.png', 
      desc: 'Envíos seguros y ultra rápidos a todo el país.' 
    }
  ];
}