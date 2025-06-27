package com.auctionapp.backend.service;

import com.auctionapp.backend.dto.AuctionDTO;
import com.auctionapp.backend.dto.CreateAuctionRequest;
import com.auctionapp.backend.model.Auction;
import com.auctionapp.backend.model.Category;
import com.auctionapp.backend.model.User;
import com.auctionapp.backend.repository.AuctionRepository;
import com.auctionapp.backend.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final CategoryRepository categoryRepository;

    public Page<AuctionDTO> getAuctions(Pageable pageable, BigDecimal minPrice, BigDecimal maxPrice, List<Long> categoryIds) {
        Specification<Auction> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startPrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("startPrice"), maxPrice));
            }
            if (categoryIds != null && !categoryIds.isEmpty()) {
                predicates.add(root.get("category").get("id").in(categoryIds));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
        return auctionRepository.findAll(spec, pageable).map(this::convertToDto);
    }

    public AuctionDTO getAuctionById(Long id) {
        return auctionRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new EntityNotFoundException("Auction not found with id: " + id));
    }

    public AuctionDTO createAuction(CreateAuctionRequest request, User seller) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found with id: " + request.getCategoryId()));

        Auction auction = new Auction();
        auction.setTitle(request.getTitle());
        auction.setDescription(request.getDescription());
        auction.setStartPrice(request.getStartPrice());
        auction.setStartTime(request.getStartTime());
        auction.setEndTime(request.getEndTime());
        auction.setImageUrl(request.getImageUrl());
        auction.setCategory(category);
        auction.setSeller(seller);

        Auction savedAuction = auctionRepository.save(auction);
        return convertToDto(savedAuction);
    }

    private AuctionDTO convertToDto(Auction auction) {
        return new AuctionDTO(
            auction.getId(),
            auction.getTitle(),
            auction.getDescription(),
            auction.getStartPrice(),
            auction.getImageUrl(),
            auction.getEndTime(),
            auction.getSeller().getId(),
            auction.getCategory().getName()
        );
    }
}
