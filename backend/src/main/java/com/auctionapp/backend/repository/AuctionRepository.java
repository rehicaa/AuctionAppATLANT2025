package com.auctionapp.backend.repository;

import com.auctionapp.backend.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}