import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { crearAsistenteForm } from '../../forms/asistente-form';
import { Asistente } from '../../models/asistente.model';
import { CharlaService } from '../../services/charla.service';

@Component({
  selector: 'app-inscripcion-form',
  imports: [ReactiveFormsModule],
  templateUrl: './inscripcion-form.html',
  styleUrl: './inscripcion-form.css',
})
export class InscripcionForm {
  private fb = inject(FormBuilder);
  private charlaService = inject(CharlaService);

  charlaId = input.required<number>();
  inscrito = output<Asistente>();
  error = signal('');

  inscripcionForm = this.fb.group({
    asistente: crearAsistenteForm(this.fb),
  });

  get asistente() {
    return this.inscripcionForm.controls.asistente.controls;
  }

  inscribir(): void {
    if (this.inscripcionForm.invalid) {
      this.inscripcionForm.markAllAsTouched();
      return;
    }
    const datos = this.inscripcionForm.controls.asistente.getRawValue() as Asistente;
    this.charlaService.inscribirAsistente(this.charlaId(), datos).subscribe({
      next: (nuevo) => {
        this.inscrito.emit(nuevo);
        this.inscripcionForm.reset();
        this.error.set('');
      },
      error: () => this.error.set('No se pudo inscribir al asistente.'),
    });
  }
}
