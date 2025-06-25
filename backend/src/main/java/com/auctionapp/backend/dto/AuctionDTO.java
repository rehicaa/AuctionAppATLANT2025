package com.auctionapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionDTO {
    private Long id;
    private String title;
    private BigDecimal startPrice;
    private String imageUrl;
}