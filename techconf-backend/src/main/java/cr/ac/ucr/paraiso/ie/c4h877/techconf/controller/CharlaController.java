package cr.ac.ucr.paraiso.ie.c4h877.techconf.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cr.ac.ucr.paraiso.ie.c4h877.techconf.data.CharlaRepository;
import cr.ac.ucr.paraiso.ie.c4h877.techconf.domain.Charla;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/charlas")
@CrossOrigin(origins = "http://localhost:4200")
public class CharlaController {

    private final CharlaRepository charlaRepository;

    public CharlaController(CharlaRepository charlaRepository) {
        this.charlaRepository = charlaRepository;
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
        return ResponseEntity.status(HttpStatus.CREATED).body(charlaRepository.save(charla));
    }
}
