package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.Data;

@Data
public class EndGameRequest {
    private Long sessionId;
    private int finalScore;
    private int timeTakenSeconds;
}