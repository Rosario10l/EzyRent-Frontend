import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule, DatePipe],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  loading = true;
  error: string | null = null;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    // TODO: Reemplaza por el id real (p.ej. decodificado del JWT o guardado en localStorage)
    const idUsuario = Number(localStorage.getItem('user_id') ?? 1);

    this.usuarioService.obtenerUsuario(idUsuario).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
