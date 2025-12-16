package lk.nibm.kd.hdse252.twintrek_flip_game.model.enums;

public enum CardImage {
    rabbit,
    cat,
    lion,
    elephant,
    cow,
    monkey,
    octopus,
    panda,
    penguin;

    public static String getName(int value) {
        CardImage[] images = CardImage.values();
        return value >= 0 && value < images.length ? images[value].name() : "unknown";
    }
}
