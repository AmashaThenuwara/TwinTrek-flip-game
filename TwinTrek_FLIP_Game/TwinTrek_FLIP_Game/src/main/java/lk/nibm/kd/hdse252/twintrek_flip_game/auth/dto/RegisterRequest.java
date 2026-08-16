package lk.nibm.kd.hdse252.twintrek_flip_game.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    public String username;
    public String email;
    public String password;
}
