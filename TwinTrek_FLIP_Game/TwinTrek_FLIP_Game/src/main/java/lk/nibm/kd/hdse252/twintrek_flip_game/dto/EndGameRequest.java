package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EndGameRequest {
    private Long sessionId;
    private int finalScore;
    private int timeTakenSeconds;
}