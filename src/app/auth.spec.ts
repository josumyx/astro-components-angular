import { Injectable, EventEmitter } from '@angular/core'; // Verifica esta importación

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STORAGE_KEY = 'astro_sesion';

  // ESTA LÍNEA ES LA QUE QUITA EL ERROR DE LA LÍNEA 27
  onSessionChange = new EventEmitter<any>(); 

  guardarUsuario(usuario: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    // Emitimos el cambio para que el Header lo escuche
    this.onSessionChange.emit(usuario); 
  }

  obtenerUsuario() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }

  cerrarSesion() {
    localStorage.removeItem(this.STORAGE_KEY);
    // Emitimos null para avisar que la sesión se cerró
    this.onSessionChange.emit(null); 
  }
}