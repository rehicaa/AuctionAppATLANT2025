package com.auctionapp.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor 
public class AuthResponse {
    private final String token;
}