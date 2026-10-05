package cr.ac.ucr.paraiso.ie.c4h877.techconf.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Charla {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String titulo;

    @NotBlank
    @Column(nullable = false)
    private String ponente;

    @NotBlank
    @Column(nullable = false)
    private String sala;

    @NotBlank
    @Column(nullable = false)
    private String hora;

    @OneToMany(mappedBy = "charla", cascade = CascadeType.ALL)
    private List<@Valid Asistente> asistentes = new ArrayList<>();

    public Charla() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPonente() {
        return ponente;
    }

    public void setPonente(String ponente) {
        this.ponente = ponente;
    }

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public List<Asistente> getAsistentes() {
        return asistentes;
    }

    public void setAsistentes(List<Asistente> asistentes) {
        this.asistentes = asistentes;
    }
}
