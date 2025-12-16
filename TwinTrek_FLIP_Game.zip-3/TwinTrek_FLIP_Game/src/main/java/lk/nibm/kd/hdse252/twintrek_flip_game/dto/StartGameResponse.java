package lk.nibm.kd.hdse252.twintrek_flip_game.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class StartGameResponse {
    private Long sessionId;
    private List<Integer> deck;       // e.g. [0, 1, 2, 0, 1, 2]
    private List<String> imageNames;  // e.g. ["rabbit", "cat", "lion", "rabbit", "cat", "lion"]
}
