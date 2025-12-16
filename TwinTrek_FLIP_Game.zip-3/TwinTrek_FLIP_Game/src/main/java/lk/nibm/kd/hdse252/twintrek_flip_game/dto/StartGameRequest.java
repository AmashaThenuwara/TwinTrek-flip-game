package lk.nibm.kd.hdse252.twintrek_flip_game.dto;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.enums.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class StartGameRequest {
    private Long playerId;
    private Difficulty difficulty;
    private boolean aiEnabled;
}