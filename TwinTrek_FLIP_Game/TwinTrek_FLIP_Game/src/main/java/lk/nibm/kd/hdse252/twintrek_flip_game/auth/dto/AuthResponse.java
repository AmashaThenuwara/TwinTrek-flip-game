package lk.nibm.kd.hdse252.twintrek_flip_game.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private Long playerId;
    private String username;
    private String avatar;
}
