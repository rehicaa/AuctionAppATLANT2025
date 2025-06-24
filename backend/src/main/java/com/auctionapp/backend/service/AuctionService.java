package com.auctionapp.backend.service;

import com.auctionapp.backend.dto.AuctionDTO;
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

    private AuctionDTO convertToDto(com.auctionapp.backend.model.Auction auction) {
        AuctionDTO dto = new AuctionDTO();
        dto.setId(auction.getId());
        dto.setTitle(auction.getTitle());
        dto.setStartPrice(auction.getStartPrice());
        dto.setImageUrl(auction.getImageUrl());
        return dto;
    }
}