package lk.nibm.kd.hdse252.twintrek_flip_game.repository;

import lk.nibm.kd.hdse252.twintrek_flip_game.model.GameSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> { }
