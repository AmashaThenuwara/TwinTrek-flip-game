package lk.nibm.kd.hdse252.twintrek_flip_game.auth.controller;


import lk.nibm.kd.hdse252.twintrek_flip_game.auth.dto.AuthResponse;
import lk.nibm.kd.hdse252.twintrek_flip_game.auth.util.JwtUtil;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.service.PlayerService;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class AuthController {
    private final PlayerService playerService;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest req) {
        Player player = playerService.register(req.getUsername(), req.getUsername(), req.getEmail(), req.getPassword(), req.getAvatar());
        String token = jwtUtil.generateToken(player.getUsername());
        return new AuthResponse(token, player.getId(), player.getUsername(), player.getAvatar());
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        Player player = playerService.login(req.getUsername(), req.getPassword());
        String token = jwtUtil.generateToken(player.getUsername());
        return new AuthResponse(token, player.getId(), player.getUsername(), player.getAvatar());
    }
}

@Data
class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String avatar;
}

@Data
class LoginRequest {
    private String username;
    private String password;
}
