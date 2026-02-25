import { Routes } from '@angular/router';

// Quitamos el ".component" del final porque tus archivos se llaman inicio.ts, clientes.ts, etc.
import { InicioComponent } from './paginas/inicio/inicio';
import { ProductosComponent } from './paginas/productos/productos';
import { ContactoComponent } from './paginas/contacto/contacto';
import { ClientesComponent } from './paginas/clientes/clientes';
import { DestacadosComponent } from './paginas/destacados/destacados';
import { NosotrosComponent } from './paginas/nosotros/nosotros';
import { ServiciosComponent } from './paginas/servicios/servicios';
import { LoginComponent } from './paginas/login/login';
export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'destacados', component: DestacadosComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' } // Si hay error, vuelve al inicio
];