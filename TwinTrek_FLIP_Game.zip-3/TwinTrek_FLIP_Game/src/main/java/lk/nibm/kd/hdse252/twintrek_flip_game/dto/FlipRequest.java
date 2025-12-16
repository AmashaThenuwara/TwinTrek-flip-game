package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.Data;

@Data
public class FlipRequest {
    private Long sessionId;
    private int firstIndex;
    private int secondIndex;
}