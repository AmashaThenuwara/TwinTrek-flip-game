package lk.nibm.kd.hdse252.twintrek_flip_game.controller;

import lk.nibm.kd.hdse252.twintrek_flip_game.model.Player;
import lk.nibm.kd.hdse252.twintrek_flip_game.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.Data;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    private final PlayerRepository playerRepo;
    private final PasswordEncoder passwordEncoder;

    // TODO: In a real JWT app, you'd extract the user from the SecurityContext
    // For now, since the frontend isn't sending a real Bearer token (JWT is not fully implemented),
    // we will accept username via a header or parameter. Let's assume the frontend sends the playerId in headers.
    
    @GetMapping("/{id}")
    public Player getProfile(@PathVariable Long id) {
        return playerRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{id}")
    public Player updateProfile(@PathVariable Long id, @RequestBody ProfileUpdateRequest req) {
        return playerRepo.findById(id).map(p -> {
            if (req.getAvatar() != null) p.setAvatar(req.getAvatar());
            if (req.getDisplayName() != null) p.setName(req.getDisplayName());
            return playerRepo.save(p);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PutMapping("/{id}/password")
    public void changePassword(@PathVariable Long id, @RequestBody PasswordChangeRequest req) {
        Player p = playerRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(req.getCurrentPassword(), p.getPasswordHash())) {
            throw new IllegalArgumentException("Incorrect current password");
        }
        p.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        playerRepo.save(p);
    }
}

@Data
class ProfileUpdateRequest {
    private String avatar;
    private String displayName;
}

@Data
class PasswordChangeRequest {
    private String currentPassword;
    private String newPassword;
}
