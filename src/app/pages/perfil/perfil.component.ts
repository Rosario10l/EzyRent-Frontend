import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';

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
    // 1) Tomar el id del usuario guardado en localStorage al hacer login
    // Puedes guardar 'user' en login: localStorage.setItem('user', JSON.stringify(res.user))
    const raw = localStorage.getItem('user');
    const idUsuario = raw ? Number(JSON.parse(raw).id) : null;

    if (!idUsuario) {
      this.error = 'No hay sesión activa';
      this.loading = false;
      return;
    }

    // 2) Llamar a la API: GET /usuario/:id
    this.usuarioService.obtenerUsuario(idUsuario).subscribe({
      next: (data) => {
        this.usuario = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar el perfil';
        this.loading = false;
      },
    });
  }
}
