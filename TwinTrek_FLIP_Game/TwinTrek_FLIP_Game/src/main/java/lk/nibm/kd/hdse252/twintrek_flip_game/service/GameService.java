package lk.nibm.kd.hdse252.twintrek_flip_game.service;

import lk.nibm.kd.hdse252.twintrek_flip_game.dto.*;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.GameSession;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.enums.Difficulty;
import lk.nibm.kd.hdse252.twintrek_flip_game.repository.GameSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import lk.nibm.kd.hdse252.twintrek_flip_game.model.enums.CardImage;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameSessionRepository sessionRepo;
    private final SecureRandom random = new SecureRandom();
    private final lk.nibm.kd.hdse252.twintrek_flip_game.repository.PlayerRepository playerRepo;

    public StartGameResponse startGame(StartGameRequest req) {
        int size = gridSize(req.getDifficulty());
        List<Integer> values = generatePairs(size);
        fisherYatesShuffle(values);

        Map<Integer, Boolean> matched = new HashMap<>();
        for (int i = 0; i < size; i++) matched.put(i, false);

        GameSession session = GameSession.builder()
                .playerId(req.getPlayerId())
                .difficulty(req.getDifficulty())
                .startedAt(Instant.now())
                .moves(0).score(0).aiEnabled(req.isAiEnabled())
                .accumulatedPenaltySeconds(0)
                .difficultyMultiplier(1.0)
                .boardValues(values)
                .matchedMap(matched)
                .build();
        sessionRepo.save(session);

        // Map each value to its image name
        List<String> imageNames = values.stream()
                .map(CardImage::getName)
                .toList();

        return new StartGameResponse(session.getId(), values, imageNames);
    }

    public FlipResponse flip(FlipRequest req) {
        GameSession s = sessionRepo.findById(req.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));
        int a = req.getFirstIndex(), b = req.getSecondIndex();

        if (s.getMatchedMap().getOrDefault(a, false) || s.getMatchedMap().getOrDefault(b, false)) {
            return new FlipResponse(false, s.getScore(), s.getMoves(), 0, isCompleted(s));
        }

        s.setMoves(s.getMoves() + 1);
        
        String imgA = CardImage.getName(s.getBoardValues().get(a));
        String imgB = CardImage.getName(s.getBoardValues().get(b));
        boolean match = Objects.equals(imgA, imgB);
        
        int comboBonus = 0;

        if (match) {
            s.getMatchedMap().put(a, true);
            s.getMatchedMap().put(b, true);
            // scoring: base 10 + combo
            comboBonus = computeComboBonus(s);
            s.setScore(s.getScore() + 10 + comboBonus);
        } else {
            resetComboState(s);
        }

        sessionRepo.save(s);
        return new FlipResponse(match, s.getScore(), s.getMoves(), comboBonus, isCompleted(s));
    }

    public void endGame(EndGameRequest req) {
        GameSession s = sessionRepo.findById(req.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));
        s.setEndedAt(Instant.now());
        s.setScore(req.getFinalScore()); // trust frontend or recompute
        sessionRepo.save(s);

        // update player best score
        playerRepo.findById(s.getPlayerId()).ifPresent(player -> {
            Integer current = player.getBestScore();
            if (current == null || s.getScore() > current) {
                player.setBestScore(s.getScore());
            }
            player.setTotalGames((player.getTotalGames() == null ? 0 : player.getTotalGames()) + 1);
            playerRepo.save(player);
        });
    }

    private int gridSize(Difficulty d) {
        return switch (d) {
            case CASUAL -> 16;
            case MEDIUM -> 36;
            case HARD -> 64;
        };
    }

    private List<Integer> generatePairs(int size) {
        int pairs = size / 2;
        List<Integer> vals = new ArrayList<>(size);
        for (int v = 0; v < pairs; v++) {
            vals.add(v); vals.add(v);
        }
        return vals;
    }

    private void fisherYatesShuffle(List<Integer> list) {
        for (int i = list.size() - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            Collections.swap(list, i, j);
        }
    }

    private boolean isCompleted(GameSession s) {
        return s.getMatchedMap().values().stream().allMatch(Boolean::booleanValue);
    }

    // Simple combo system using session-scoped temp map (could store in DB or cache)
    private int computeComboBonus(GameSession s) {
        // Example: +5 per consecutive match in a streak. For demo, return fixed bonus.
        return 5;
    }
    private void resetComboState(GameSession s) { /* implement if tracking streak in session */ }
}
