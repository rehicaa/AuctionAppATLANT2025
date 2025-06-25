package com.auctionapp.backend.service;

import com.auctionapp.backend.dto.AuctionDTO;
import com.auctionapp.backend.model.Auction; 
import com.auctionapp.backend.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;

    public Page<AuctionDTO> getAuctions(Pageable pageable) {
        return auctionRepository.findAll(pageable).map(this::convertToDto);
    }

    private AuctionDTO convertToDto(Auction auction) { 
        return new AuctionDTO(
            auction.getId(),
            auction.getTitle(),
            auction.getStartPrice(),
            auction.getImageUrl()
        );
    }
}