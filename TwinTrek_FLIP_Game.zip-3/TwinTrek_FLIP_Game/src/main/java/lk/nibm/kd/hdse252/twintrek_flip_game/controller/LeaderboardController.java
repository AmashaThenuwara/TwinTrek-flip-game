package lk.nibm.kd.hdse252.twintrek_flip_game.controller;

import lk.nibm.kd.hdse252.twintrek_flip_game.dto.LeaderboardEntry;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@RequiredArgsConstructor
@CrossOrigin
public class LeaderboardController {
    private final PlayerRepository playerRepo;

    @GetMapping
    public List<LeaderboardEntry> top() {
        return playerRepo.findAll().stream()
                .filter(p -> p.getBestScore() != null)
                .sorted((a,b) -> Integer.compare(b.getBestScore(), a.getBestScore()))
                .limit(20)
                .map(p -> new LeaderboardEntry(
                        p.getId(),                 // playerId
                        p.getName(),               // playerName
                        p.getBestScore() == null ? 0 : p.getBestScore(),
                        "ANY", "TODAY"))
                .toList();
    }
}
