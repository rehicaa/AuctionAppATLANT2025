package com.auctionapp.backend.controller;

import com.auctionapp.backend.dto.AuctionDTO;
import com.auctionapp.backend.model.User;
import com.auctionapp.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<AuctionDTO>> getWishlist(@AuthenticationPrincipal User user) {
        List<AuctionDTO> wishlist = wishlistService.getWishlist(user.getId());
        return ResponseEntity.ok(wishlist);
    }

    @PostMapping("/{auctionId}")
    public ResponseEntity<Void> addToWishlist(@AuthenticationPrincipal User user, @PathVariable Long auctionId) {
        wishlistService.addToWishlist(user.getId(), auctionId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<Void> removeFromWishlist(@AuthenticationPrincipal User user, @PathVariable Long auctionId) {
        wishlistService.removeFromWishlist(user.getId(), auctionId);
        return ResponseEntity.noContent().build();
    }
}
