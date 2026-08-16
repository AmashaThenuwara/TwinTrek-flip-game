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
        // Wrap around using modulo so we always return a valid image even if there are more pairs than images (like in HARD mode)
        return images[value % images.length].name();
    }
}
