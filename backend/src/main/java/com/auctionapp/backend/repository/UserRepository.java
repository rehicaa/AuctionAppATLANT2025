package com.auctionapp.backend.repository;

import com.auctionapp.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);


    @Query("SELECT u FROM User u LEFT JOIN FETCH u.wishlist WHERE u.id = :userId")
    Optional<User> findByIdWithWishlist(@Param("userId") Long userId);
}
