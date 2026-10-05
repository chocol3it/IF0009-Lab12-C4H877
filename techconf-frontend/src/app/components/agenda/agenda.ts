import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Charla } from '../../models/charla.model';
import { CharlaService } from '../../services/charla.service';

@Component({
  selector: 'app-agenda',
  imports: [ReactiveFormsModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  private fb = inject(FormBuilder);
  private charlaService = inject(CharlaService);

  charlas = signal<Charla[]>([]);
  error = signal('');

  charlaForm = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    ponente: ['', Validators.required],
    sala: ['', Validators.required],
    hora: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cargarCharlas();
  }

  cargarCharlas(): void {
    this.charlaService.listar().subscribe({
      next: (data) => this.charlas.set(data),
      error: () => this.error.set('No se pudo conectar con el servidor.'),
    });
  }

  registrarCharla(): void {
    if (this.charlaForm.invalid) {
      this.charlaForm.markAllAsTouched();
      return;
    }
    this.charlaService.crear({ ...this.charlaForm.getRawValue(), asistentes: [] }).subscribe({
      next: (nueva) => {
        this.charlas.update((lista) => [...lista, nueva]);
        this.charlaForm.reset();
      },
      error: () => this.error.set('No se pudo registrar la charla.'),
    });
  }
}
