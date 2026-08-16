package lk.nibm.kd.hdse252.twintrek_flip_game.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AiService {
    //HashMap memory
    // AI memory: value -> set of indices
    private final Map<Integer, Set<Integer>> memory = new HashMap<>();
    private final Random random = new Random();

    public void remember(int index, int value) {
        memory.computeIfAbsent(value, k -> new HashSet<>()).add(index);
    }

    public Optional<int[]> chooseMove(List<Integer> deck, Set<Integer> matchedIndices) {
        // 1) If memory contains a pair not matched, pick those
        for (Map.Entry<Integer, Set<Integer>> e : memory.entrySet()) {
            List<Integer> known = e.getValue().stream()
                    .filter(i -> !matchedIndices.contains(i))
                    .toList();
            if (known.size() >= 2) return Optional.of(new int[]{ known.get(0), known.get(1) });
        }
        // 2) Else pick a random unmatched pair candidate (two random distinct indices)
        List<Integer> candidates = new ArrayList<>();
        for (int i = 0; i < deck.size(); i++) if (!matchedIndices.contains(i)) candidates.add(i);
        if (candidates.size() < 2) return Optional.empty();
        Collections.shuffle(candidates);
        return Optional.of(new int[]{ candidates.get(0), candidates.get(1) });
    }

    public void forgetMatched(Set<Integer> matchedIndices) {
        // Clean memory to avoid stale indices
        for (Set<Integer> set : memory.values()) set.removeAll(matchedIndices);
    }
}
