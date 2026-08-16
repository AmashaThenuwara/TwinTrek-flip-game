package lk.nibm.kd.hdse252.twintrek_flip_game.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name; // Equivalent to displayName
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String passwordHash;
    
    // Auth & Profile fields
    private String avatar = "🦄";
    
    // Career Stats
    private Integer bestScore = 0;
    private Integer totalGames = 0;
    private Integer wins = 0;
    private Integer bestCombo = 0;
    private Integer totalMoves = 0;
    private Integer totalTimeSeconds = 0;
}
