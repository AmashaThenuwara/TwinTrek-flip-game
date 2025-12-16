package lk.nibm.kd.hdse252.twintrek_flip_game.service;

import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlayerService {
    private final PlayerRepository playerRepo;
    private final PasswordEncoder passwordEncoder;

    public Player register(String name, String username, String email, String rawPassword) {
        if (playerRepo.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }

        Player player = Player.builder()
                .name(name)
                .username(username)
                .email(email)
                .passwordHash(passwordEncoder.encode(rawPassword))
                .bestScore(0)
                .totalGames(0)
                .build();

        return playerRepo.save(player);
    }

    public Player login(String username, String rawPassword) {
        return playerRepo.findByUsername(username)
                .filter(p -> passwordEncoder.matches(rawPassword, p.getPasswordHash()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
    }
}
