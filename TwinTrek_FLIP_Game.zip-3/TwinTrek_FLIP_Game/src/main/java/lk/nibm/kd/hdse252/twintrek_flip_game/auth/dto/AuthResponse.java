package lk.nibm.kd.hdse252.twintrek_flip_game.auth.dto;

public class AuthResponse {
    public Long playerId;
    public String username;
    public String token;
    public AuthResponse(Long id, String u, String t) {
        this.playerId = id;
        this.username = u;
        this.token = t;
    }
}
