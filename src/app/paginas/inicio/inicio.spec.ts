import { ComponentFixture, TestBed } from '@angular/core/testing';
// Cambiamos 'Inicio' por 'InicioComponent'
import { InicioComponent } from './inicio'; 

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent] // Importamos la clase correcta
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Es mejor usar detectChanges() aquí
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});