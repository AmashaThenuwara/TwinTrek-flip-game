package lk.nibm.kd.hdse252.twintrek_flip_game.controller;

import lk.nibm.kd.hdse252.twintrek_flip_game.dto.PlayerUpdateRequest;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.repository.PlayerRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin
public class PlayerController {
    private final PlayerRepository repo;
    public PlayerController(PlayerRepository repo) { this.repo = repo; }

    @PostMapping
    public Player create(@RequestBody Player p) { return repo.save(p); }

    @GetMapping("/{id}")
    public Player get(@PathVariable Long id) { return repo.findById(id).orElseThrow(); }

    @GetMapping
    public List<Player> all() { return repo.findAll(); }

    @PutMapping("/{id}")
    public Player update(@PathVariable Long id, @RequestBody PlayerUpdateRequest req) {
        return repo.findById(id).map(p -> {
            if (req.getName() != null) p.setName(req.getName());
            if (req.getBestScore() != null) p.setBestScore(req.getBestScore());
            if (req.getTotalGames() != null) p.setTotalGames(req.getTotalGames());
            return repo.save(p);
        }).orElseThrow(() -> new RuntimeException("Player not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
