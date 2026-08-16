package lk.nibm.kd.hdse252.twintrek_flip_game.controller;

import lk.nibm.kd.hdse252.twintrek_flip_game.dto.*;
import lk.nibm.kd.hdse252.twintrek_flip_game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
@CrossOrigin
public class GameController {
    private final GameService gameService;

    @PostMapping("/start")
    public StartGameResponse start(@RequestBody StartGameRequest req) {
        System.out.println("Received start request: " + req);
        return gameService.startGame(req);
    }

    @PostMapping("/flip")
    public FlipResponse flip(@RequestBody FlipRequest req) {
        return gameService.flip(req);
    }

    @PostMapping("/end")
    public void end(@RequestBody EndGameRequest req) {
        gameService.endGame(req);
    }
}
