import { Injectable, EventEmitter } from '@angular/core'; // 1. Asegúrate de importar EventEmitter

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private STORAGE_KEY = 'astro_sesion';

  // 2. ESTA LÍNEA ES LA QUE ELIMINA EL ERROR EN APP.TS
  onSessionChange = new EventEmitter<any>(); 

  guardarUsuario(usuario: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
    // 3. Emitimos el cambio
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
    // 4. Avisamos que la sesión se cerró
    this.onSessionChange.emit(null);
  }
}