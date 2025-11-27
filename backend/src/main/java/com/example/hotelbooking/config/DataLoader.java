// src/main/java/com/example/hotelbooking/config/DataLoader.java
package com.example.hotelbooking.config;

import com.example.hotelbooking.model.Role;
import com.example.hotelbooking.model.User;
import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoleRepository;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Configuration
public class DataLoader implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final RoomRepository roomRepo;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(RoleRepository roleRepo, UserRepository userRepo, RoomRepository roomRepo, PasswordEncoder passwordEncoder) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Role adminRole = roleRepo.findByName("ROLE_ADMIN").orElseGet(() -> roleRepo.save(new Role("ROLE_ADMIN")));
        Role userRole = roleRepo.findByName("ROLE_USER").orElseGet(() -> roleRepo.save(new Role("ROLE_USER")));

        // Default admin
        userRepo.findByEmail("admin@example.com").ifPresentOrElse(
            u -> {},
            () -> {
                User admin = new User();
                admin.setName("Administrator");
                admin.setEmail("admin@example.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRoles(Set.of(adminRole, userRole));
                userRepo.save(admin);
                System.out.println("✅ Created default admin: admin@example.com / admin123");
            }
        );

        // Default user
        userRepo.findByEmail("user@example.com").ifPresentOrElse(
            u -> {},
            () -> {
                User user = new User();
                user.setName("Demo User");
                user.setEmail("user@example.com");
                user.setPassword(passwordEncoder.encode("user123"));
                user.setRoles(Set.of(userRole));
                userRepo.save(user);
                System.out.println("✅ Created default user: user@example.com / user123");
            }
        );

        // Sample rooms
        if (roomRepo.count() == 0) {
            Room r1 = new Room();
            r1.setTitle("Cozy Single Room");
            r1.setType("Single");
            r1.setDescription("A cozy single room with a comfortable bed and a garden view.");
            r1.setPricePerNight(BigDecimal.valueOf(30.0));
            r1.setPhotoUrl("https://picsum.photos/seed/room1/800/400");
            r1.setCapacity(1);

            Room r2 = new Room();
            r2.setTitle("Deluxe Double Room");
            r2.setType("Double");
            r2.setDescription("Spacious double room with ensuite bathroom and city view.");
            r2.setPricePerNight(BigDecimal.valueOf(60.0));
            r2.setPhotoUrl("https://picsum.photos/seed/room2/800/400");
            r2.setCapacity(2);

            Room r3 = new Room();
            r3.setTitle("Family Suite");
            r3.setType("Suite");
            r3.setDescription("Large family suite with two bedrooms and living area.");
            r3.setPricePerNight(BigDecimal.valueOf(120.0));
            r3.setPhotoUrl("https://picsum.photos/seed/room3/800/400");
            r3.setCapacity(4);

            roomRepo.saveAll(List.of(r1, r2, r3));
            System.out.println("✅ Seeded sample rooms.");
        }
    }
}
