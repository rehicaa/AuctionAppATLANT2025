package com.auctionapp.backend.service;

import com.auctionapp.backend.dto.AuctionDTO;
import com.auctionapp.backend.model.Auction;
import com.auctionapp.backend.model.User;
import com.auctionapp.backend.repository.AuctionRepository;
import com.auctionapp.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final UserRepository userRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionService auctionService; 

    @Transactional
    public List<AuctionDTO> getWishlist(Long userId) {
        User user = userRepository.findByIdWithWishlist(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        return user.getWishlist().stream()
                .map(auctionService::convertToDto) 
                .collect(Collectors.toList());
    }

    @Transactional
    public void addToWishlist(Long userId, Long auctionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new EntityNotFoundException("Auction not found with id: " + auctionId));

        user.getWishlist().add(auction);
        userRepository.save(user);
    }

    @Transactional
    public void removeFromWishlist(Long userId, Long auctionId) {
        User user = userRepository.findByIdWithWishlist(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        user.getWishlist().removeIf(auction -> auction.getId().equals(auctionId));
        userRepository.save(user);
    }
}
