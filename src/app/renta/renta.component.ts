import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentaService } from '../services/renta.service';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-renta',
  templateUrl: './renta.component.html',
  styleUrls: ['./renta.component.scss'],
  imports:[ReactiveFormsModule]
})
export class RentaComponent {
  rentaForm!: FormGroup;
  articuloId!: number;
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private rentaService: RentaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener articuloId desde la URL
    this.articuloId = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener usuarioId desde localStorage
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    if (usuario && usuario.id) {
      this.usuarioId = usuario.id;
    } else {
      alert('Debes iniciar sesión para rentar.');
      this.router.navigate(['/login']);
    }

    // Inicializar formulario
    this.rentaForm = this.fb.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      camtidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

onSubmit(): void {
  if (this.rentaForm.invalid) {
    alert('Por favor llena todos los campos correctamente');
    return;
  }

  const formValue = this.rentaForm.value;

  const nuevaRenta = {
    fecha_inicio: formValue.fecha_inicio,
    fecha_fin: formValue.fecha_fin,
    camtidad: formValue.camtidad,  // cuidado con el nombre en el DTO backend
    articuloId: this.articuloId,
    usuarioId: this.usuarioId
  };

  this.rentaService.crearRenta(nuevaRenta).subscribe({
    next: (res) => {
      alert('Renta creada exitosamente');
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error('Error al crear renta:', err);
      alert('Error al crear la renta: ' + (err.error?.message || 'Intenta de nuevo'));
    }
  });
}

}
