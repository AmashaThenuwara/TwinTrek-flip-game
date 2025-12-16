package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FlipResponse {
    private boolean match;
    private int newScore;
    private int moves;
    private int combo; // optional
    private boolean gameCompleted;
}