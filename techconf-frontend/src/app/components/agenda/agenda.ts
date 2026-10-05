import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Asistente } from '../../models/asistente.model';
import { Charla } from '../../models/charla.model';
import { CharlaService } from '../../services/charla.service';
import { InscripcionForm } from '../inscripcion-form/inscripcion-form';

@Component({
  selector: 'app-agenda',
  imports: [ReactiveFormsModule, InscripcionForm],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  private fb = inject(FormBuilder);
  private charlaService = inject(CharlaService);

  charlas = signal<Charla[]>([]);
  error = signal('');
  charlaAbierta = signal<number | null>(null);

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

  toggleInscripcion(charlaId: number): void {
    this.charlaAbierta.set(this.charlaAbierta() === charlaId ? null : charlaId);
  }

  agregarAsistente(charlaId: number, asistente: Asistente): void {
    this.charlas.update((lista) =>
      lista.map((c) => (c.id === charlaId ? { ...c, asistentes: [...c.asistentes, asistente] } : c)),
    );
  }
}
