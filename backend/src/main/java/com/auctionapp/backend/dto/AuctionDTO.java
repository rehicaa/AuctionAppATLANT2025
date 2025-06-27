package com.auctionapp.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal startPrice;
    private String imageUrl;
    private LocalDateTime endTime;
    private Long sellerId;
    private String categoryName;
}
