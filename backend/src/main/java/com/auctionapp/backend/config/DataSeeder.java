package com.auctionapp.backend.config;

import com.auctionapp.backend.model.Auction;
import com.auctionapp.backend.model.Category;
import com.auctionapp.backend.model.User; 
import com.auctionapp.backend.repository.AuctionRepository;
import com.auctionapp.backend.repository.CategoryRepository;
import com.auctionapp.backend.repository.UserRepository; 
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder; 

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0 && userRepository.count() == 0) { 

            User seller = new User();
            seller.setFirstName("John");
            seller.setLastName("Doe");
            seller.setEmail("seller@auction.com");
            seller.setPassword(passwordEncoder.encode("password123"));
            userRepository.save(seller);

            Category women = new Category();
            women.setName("Women");

            Category men = new Category();
            men.setName("Men");
            
            Category kids = new Category();
            kids.setName("Kids");

            Category electronics = new Category();
            electronics.setName("Electronics");

            Category home = new Category();
            home.setName("Home");
            
            categoryRepository.saveAll(List.of(women, men, kids, electronics, home));
            
            Auction a1 = new Auction();
            a1.setTitle("Vintage Leather Jacket");
            a1.setDescription("A beautiful vintage leather jacket from the 80s. In perfect condition.");
            a1.setStartPrice(new BigDecimal("120.00"));
            a1.setImageUrl("https://picsum.photos/seed/jacket/400/300");
            a1.setStartTime(LocalDateTime.now().minusDays(1));
            a1.setEndTime(LocalDateTime.now().plusDays(10));
            a1.setCategory(men);
            a1.setSeller(seller);

            Auction a2 = new Auction();
            a2.setTitle("Nike Air Max 90");
            a2.setDescription("Classic Nike Air Max 90 sneakers, white color, size 42.");
            a2.setStartPrice(new BigDecimal("75.50"));
            a2.setImageUrl("https://picsum.photos/seed/nike/400/300");
            a2.setStartTime(LocalDateTime.now().minusHours(5));
            a2.setEndTime(LocalDateTime.now().plusDays(5));
            a2.setCategory(men);
            a2.setSeller(seller);

            Auction a3 = new Auction();
            a3.setTitle("Summer Floral Dress");
            a3.setDescription("Light and breezy floral dress, perfect for summer days. Size M.");
            a3.setStartPrice(new BigDecimal("45.00"));
            a3.setImageUrl("https://picsum.photos/seed/dress/400/300");
            a3.setStartTime(LocalDateTime.now().minusDays(2));
            a3.setEndTime(LocalDateTime.now().plusDays(12));
            a3.setCategory(women);
            a3.setSeller(seller);

            Auction a4 = new Auction();
            a4.setTitle("Apple AirPods Pro");
            a4.setDescription("Slightly used Apple AirPods Pro with noise cancellation. Comes with original box.");
            a4.setStartPrice(new BigDecimal("150.00"));
            a4.setImageUrl("https://picsum.photos/seed/airpods/400/300");
            a4.setStartTime(LocalDateTime.now().minusHours(10));
            a4.setEndTime(LocalDateTime.now().plusDays(7));
            a4.setCategory(electronics);
            a4.setSeller(seller);

            Auction a5 = new Auction();
            a5.setTitle("Minimalist Wall Clock");
            a5.setDescription("Modern and silent wall clock. 30cm diameter. Wooden frame.");
            a5.setStartPrice(new BigDecimal("35.00"));
            a5.setImageUrl("https://picsum.photos/seed/clock/400/300");
            a5.setStartTime(LocalDateTime.now().minusDays(3));
            a5.setEndTime(LocalDateTime.now().plusDays(3));
            a5.setCategory(home);
            a5.setSeller(seller);
            
            Auction a6 = new Auction();
            a6.setTitle("Designer Handbag");
            a6.setDescription("Elegant designer handbag in black leather. Perfect for any occasion.");
            a6.setStartPrice(new BigDecimal("250.00"));
            a6.setImageUrl("https://picsum.photos/seed/handbag/400/300");
            a6.setStartTime(LocalDateTime.now().minusDays(4));
            a6.setEndTime(LocalDateTime.now().plusDays(8));
            a6.setCategory(women);
            a6.setSeller(seller);
            
            Auction a7 = new Auction();
            a7.setTitle("Sony WH-1000XM4 Headphones");
            a7.setDescription("Industry-leading noise canceling headphones. Like new.");
            a7.setStartPrice(new BigDecimal("220.00"));
            a7.setImageUrl("https://picsum.photos/seed/sony/400/300");
            a7.setStartTime(LocalDateTime.now().minusHours(20));
            a7.setEndTime(LocalDateTime.now().plusDays(6));
            a7.setCategory(electronics);
            a7.setSeller(seller);

            Auction a8 = new Auction();
            a8.setTitle("Kids' Bicycle");
            a8.setDescription("A sturdy bicycle for kids aged 5-8. Blue color, with training wheels.");
            a8.setStartPrice(new BigDecimal("60.00"));
            a8.setImageUrl("https://picsum.photos/seed/bicycle/400/300");
            a8.setStartTime(LocalDateTime.now().minusDays(1));
            a8.setEndTime(LocalDateTime.now().plusDays(9));
            a8.setCategory(kids);
            a8.setSeller(seller);
            
            Auction a9 = new Auction();
            a9.setTitle("Modern Nordic Sofa");
            a9.setDescription("Three-seater sofa in light grey fabric. Scandinavian design.");
            a9.setStartPrice(new BigDecimal("450.00"));
            a9.setImageUrl("https://picsum.photos/seed/sofa/400/300");
            a9.setStartTime(LocalDateTime.now().minusDays(5));
            a9.setEndTime(LocalDateTime.now().plusDays(15));
            a9.setCategory(home);
            a9.setSeller(seller);

            Auction a10 = new Auction();
            a10.setTitle("Levi's 501 Jeans");
            a10.setDescription("Classic Levi's 501 for men. W32 L32. Stonewash blue.");
            a10.setStartPrice(new BigDecimal("55.00"));
            a10.setImageUrl("https://picsum.photos/seed/jeans/400/300");
            a10.setStartTime(LocalDateTime.now().minusHours(2));
            a10.setEndTime(LocalDateTime.now().plusDays(4));
            a10.setCategory(men);
            a10.setSeller(seller);

            Auction a11 = new Auction();
            a11.setTitle("Samsung 4K Smart TV 55\"");
            a11.setDescription("55-inch 4K UHD Smart TV. Model from 2022. Perfect picture quality.");
            a11.setStartPrice(new BigDecimal("350.00"));
            a11.setImageUrl("https://picsum.photos/seed/tv/400/300");
            a11.setStartTime(LocalDateTime.now().minusDays(6));
            a11.setEndTime(LocalDateTime.now().plusDays(20));
            a11.setCategory(electronics);
            a11.setSeller(seller);

            Auction a12 = new Auction();
            a12.setTitle("Plush Teddy Bear");
            a12.setDescription("A giant, soft, and cuddly teddy bear for kids. 1 meter tall.");
            a12.setStartPrice(new BigDecimal("25.00"));
            a12.setImageUrl("https://picsum.photos/seed/teddy/400/300");
            a12.setStartTime(LocalDateTime.now().minusHours(30));
            a12.setEndTime(LocalDateTime.now().plusDays(2));
            a12.setCategory(kids);
            a12.setSeller(seller);
            
            auctionRepository.saveAll(List.of(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12));
        }
    }
}
