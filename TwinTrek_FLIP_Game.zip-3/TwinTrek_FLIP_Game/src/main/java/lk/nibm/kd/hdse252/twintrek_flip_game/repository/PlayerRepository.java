package lk.nibm.kd.hdse252.twintrek_flip_game.repository;

import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Long> {

    // Find a player by username
    Optional<Player> findByUsername(String username);

    // Check if a username already exists
    boolean existsByUsername(String username);
}
