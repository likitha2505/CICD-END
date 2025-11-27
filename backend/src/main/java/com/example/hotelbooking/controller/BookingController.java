package com.example.hotelbooking.controller;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.model.Booking;
import com.example.hotelbooking.model.User;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserRepository userRepo;

    public BookingController(BookingService bookingService, UserRepository userRepo) {
        this.bookingService = bookingService;
        this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> create(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestBody BookingDto dto) {
        User u = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Booking b = bookingService.createBooking(u, dto);
        return ResponseEntity.ok(b);
    }

    @GetMapping("/me")
    public List<Booking> myBookings(@AuthenticationPrincipal UserDetails userDetails) {
        User u = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingService.getUserBookings(u);
    }

    @GetMapping
    public List<Booking> all() {
        return bookingService.getAllBookings();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserDetails userDetails,
                                    @PathVariable Long id) {
        User u = userRepo.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        bookingService.deleteBooking(id, u);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<?> byCode(@PathVariable String code) {
        Booking b = bookingService.findByCode(code);
        return ResponseEntity.ok(b);
    }
}
