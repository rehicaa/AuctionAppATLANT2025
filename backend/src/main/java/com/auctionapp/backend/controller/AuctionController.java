package com.auctionapp.backend.controller;

import com.auctionapp.backend.dto.AuctionDTO;
import com.auctionapp.backend.dto.CreateAuctionRequest;
import com.auctionapp.backend.model.User;
import com.auctionapp.backend.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final AuctionService auctionService;

    @GetMapping
    public ResponseEntity<Page<AuctionDTO>> getAllAuctions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "startTime") String sortBy,
            @RequestParam(defaultValue = "desc") String sortOrder) {
        
        Sort.Direction direction = "asc".equalsIgnoreCase(sortOrder) ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        Page<AuctionDTO> auctions = auctionService.getAuctions(pageable);
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionDTO> getAuctionById(@PathVariable Long id) {
        AuctionDTO auction = auctionService.getAuctionById(id);
        return ResponseEntity.ok(auction);
    }

    @PostMapping
    public ResponseEntity<AuctionDTO> createAuction(
            @RequestBody CreateAuctionRequest request,
            @AuthenticationPrincipal User user) {
        AuctionDTO createdAuction = auctionService.createAuction(request, user);
        return new ResponseEntity<>(createdAuction, HttpStatus.CREATED);
    }
}
