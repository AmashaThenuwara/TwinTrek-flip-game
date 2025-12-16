package lk.nibm.kd.hdse252.twintrek_flip_game.dto;

import lombok.Data;
@Data
public class PlayerUpdateRequest {
    private String name;        // display name / username
    private Integer bestScore;  // optional manual set (usually computed)
    private Integer totalGames; // optional
    // If you decide to expand entity: add email, avatarUrl, bio here and to Player
}
