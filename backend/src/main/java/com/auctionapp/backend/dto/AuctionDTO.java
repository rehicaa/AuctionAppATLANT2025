package com.auctionapp.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AuctionDTO {
    private Long id;
    private String title;
    private BigDecimal startPrice;
    private String imageUrl;
}