package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaderboardEntry {
    private Long playerId;
    private String playerName;
    private int score;
    private String difficulty;
    private String date;
}