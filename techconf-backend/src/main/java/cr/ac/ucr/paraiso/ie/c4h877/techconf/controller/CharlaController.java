package cr.ac.ucr.paraiso.ie.c4h877.techconf.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cr.ac.ucr.paraiso.ie.c4h877.techconf.data.AsistenteRepository;
import cr.ac.ucr.paraiso.ie.c4h877.techconf.data.CharlaRepository;
import cr.ac.ucr.paraiso.ie.c4h877.techconf.domain.Asistente;
import cr.ac.ucr.paraiso.ie.c4h877.techconf.domain.Charla;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/charlas")
@CrossOrigin(origins = "http://localhost:4200")
public class CharlaController {

    private final CharlaRepository charlaRepository;
    private final AsistenteRepository asistenteRepository;

    public CharlaController(CharlaRepository charlaRepository, AsistenteRepository asistenteRepository) {
        this.charlaRepository = charlaRepository;
        this.asistenteRepository = asistenteRepository;
    }

    @GetMapping
    public List<Charla> listar() {
        return charlaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Charla> obtener(@PathVariable Long id) {
        return charlaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Charla> crear(@Valid @RequestBody Charla charla) {
        charla.getAsistentes().forEach(asistente -> asistente.setCharla(charla));
        return ResponseEntity.status(HttpStatus.CREATED).body(charlaRepository.save(charla));
    }

    @PostMapping("/{id}/asistentes")
    public ResponseEntity<Asistente> inscribirAsistente(@PathVariable Long id, @Valid @RequestBody Asistente asistente) {
        Charla charla = charlaRepository.findById(id).orElse(null);
        if (charla == null) {
            return ResponseEntity.notFound().build();
        }
        asistente.setCharla(charla);
        return ResponseEntity.status(HttpStatus.CREATED).body(asistenteRepository.save(asistente));
    }
}
