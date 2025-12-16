package lk.nibm.kd.hdse252.twintrek_flip_game.auth.controller;


import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
    private final PlayerService playerService;

    @PostMapping("/register")
    public Player register(@RequestParam String name,
                           @RequestParam String username,
                           @RequestParam String email,
                           @RequestParam String password) {
        return playerService.register(name, username, email, password);
    }

    @PostMapping("/login")
    public Player login(@RequestParam String username,
                        @RequestParam String password) {
        return playerService.login(username, password);
    }
}
