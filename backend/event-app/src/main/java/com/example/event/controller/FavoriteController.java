package com.example.event.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.event.dto.response.EventSearchResponseItem;
import com.example.event.model.User;
import com.example.event.repository.UserRepository;
import com.example.event.service.FavoriteService;
import com.example.event.util.JwtUtil;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "*")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    // Lấy user ID từ token
    private Long getUserIdFromToken(String token) {
        String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    // Lấy danh sách sự kiện yêu thích
    @GetMapping
    public ResponseEntity<?> getFavorites(@RequestHeader("Authorization") String token) {
        try {
            Long userId = getUserIdFromToken(token);
            List<EventSearchResponseItem> favorites = favoriteService.getFavoriteEvents(userId);
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Thêm sự kiện vào yêu thích
    @PostMapping("/{eventId}")
    public ResponseEntity<?> addFavorite(
            @RequestHeader("Authorization") String token,
            @PathVariable Long eventId) {
        try {
            Long userId = getUserIdFromToken(token);
            favoriteService.addFavorite(userId, eventId);
            return ResponseEntity.ok(Map.of("message", "Event added to favorites"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Xóa sự kiện khỏi yêu thích
    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> removeFavorite(
            @RequestHeader("Authorization") String token,
            @PathVariable Long eventId) {
        try {
            Long userId = getUserIdFromToken(token);
            favoriteService.removeFavorite(userId, eventId);
            return ResponseEntity.ok(Map.of("message", "Event removed from favorites"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Kiểm tra xem sự kiện có trong yêu thích không
    @GetMapping("/check/{eventId}")
    public ResponseEntity<?> checkFavorite(
            @RequestHeader("Authorization") String token,
            @PathVariable Long eventId) {
        try {
            Long userId = getUserIdFromToken(token);
            boolean isFavorite = favoriteService.isFavorite(userId, eventId);
            return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
