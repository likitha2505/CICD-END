package com.example.hotelbooking.service;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.model.Booking;
import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.model.User;
import com.example.hotelbooking.repository.BookingRepository;
import com.example.hotelbooking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepo;
    private final RoomRepository roomRepo;

    public BookingService(BookingRepository bookingRepo, RoomRepository roomRepo) {
        this.bookingRepo = bookingRepo;
        this.roomRepo = roomRepo;
    }

    public Booking createBooking(User user, BookingDto dto) {
        Room room = roomRepo.findById(dto.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Booking b = new Booking();
        b.setUser(user);
        b.setRoom(room);
        b.setGuestName(dto.getGuestName());
        b.setGuestEmail(dto.getGuestEmail());
        b.setCheckIn(dto.getStartDate());
        b.setCheckOut(dto.getEndDate());
        b.setConfirmationCode(generateCode());
        b.setCancelled(false);

        return bookingRepo.save(b);
    }

    public List<Booking> getUserBookings(User user) {
        return bookingRepo.findByUser(user);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public void deleteBooking(Long id, User requester) {
        Booking b = bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        boolean isOwner = b.getUser().getId().equals(requester.getId());
        boolean isAdmin = requester.getRoles().stream()
                .anyMatch(r -> r.getName().equals("ROLE_ADMIN"));

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("Not allowed to delete this booking");
        }
        
        b.setCancelled(true);
        bookingRepo.save(b);
    }

    public Booking findByCode(String code) {
        return bookingRepo.findByConfirmationCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid code"));
    }

    private String generateCode() {
        byte[] bytes = new byte[8];
        new SecureRandom().nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, 10).toUpperCase();
    }
}