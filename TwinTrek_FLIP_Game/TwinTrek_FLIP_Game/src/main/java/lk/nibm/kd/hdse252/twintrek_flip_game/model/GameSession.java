package lk.nibm.kd.hdse252.twintrek_flip_game.model;

import lk.nibm.kd.hdse252.twintrek_flip_game.model.enums.Difficulty;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long playerId;
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    private Instant startedAt;
    private Instant endedAt;
    private int moves;
    private int score;
    private boolean aiEnabled;
    private int accumulatedPenaltySeconds;
    private double difficultyMultiplier;

    @ElementCollection
    private List<Integer> boardValues; // serialized deck values by position

    @ElementCollection
    private Map<Integer, Boolean> matchedMap; // position -> matched
}
