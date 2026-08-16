package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlipRequest {
    private Long sessionId;
    private int firstIndex;
    private int secondIndex;
}