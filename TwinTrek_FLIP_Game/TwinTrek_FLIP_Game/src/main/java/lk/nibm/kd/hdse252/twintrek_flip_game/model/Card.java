package lk.nibm.kd.hdse252.twintrek_flip_game.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    private int id;           // unique card id (position index)
    private int value;        // pair value
    private boolean matched;  // removed or not
}
