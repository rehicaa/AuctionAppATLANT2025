package com.auctionapp.backend.service;

import com.auctionapp.backend.dto.AuthResponse;
import com.auctionapp.backend.dto.LoginRequest;
import com.auctionapp.backend.dto.RegisterRequest;
import com.auctionapp.backend.model.User;
import com.auctionapp.backend.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Value("${google.client.id}")
    private String googleClientId;

    public AuthResponse register(RegisterRequest request) {
        var user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        var claims = new HashMap<String, Object>();
        claims.put("userId", user.getId());
        claims.put("firstName", user.getFirstName());
        
        var jwtToken = jwtService.generateToken(claims, user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        
        var claims = new HashMap<String, Object>();
        claims.put("userId", user.getId());
        claims.put("firstName", user.getFirstName());
        
        var jwtToken = jwtService.generateToken(claims, user);
        return new AuthResponse(jwtToken);
    }

    public AuthResponse loginWithGoogle(String googleToken) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(googleClientId))
                .build();

            GoogleIdToken idToken = verifier.verify(googleToken);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String firstName = (String) payload.get("given_name");
                String lastName = (String) payload.get("family_name");

                User user = userRepository.findByEmail(email)
                        .orElseGet(() -> {
                            User newUser = new User();
                            newUser.setEmail(email);
                            newUser.setFirstName(firstName != null ? firstName : "");
                            newUser.setLastName(lastName != null ? lastName : "");
                            return userRepository.save(newUser);
                        });
                
                var claims = new HashMap<String, Object>();
                claims.put("userId", user.getId());
                var jwtToken = jwtService.generateToken(claims, user);
                return new AuthResponse(jwtToken);

            } else {
                throw new IllegalArgumentException("Invalid Google Token");
            }
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Token verification failed", e);
        }
    }
}
