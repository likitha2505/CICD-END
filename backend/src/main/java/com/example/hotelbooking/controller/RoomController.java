// src/main/java/com/example/hotelbooking/controller/RoomController.java
package com.example.hotelbooking.controller;

import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    // Public: list all rooms
    @GetMapping
    public List<Room> listAll() {
        return roomRepository.findAll();
    }

    // Public: get room by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Optional<Room> opt = roomRepository.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Room not found"));
        }
    }

    // Admin only: create
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Room r) {
        Room saved = roomRepository.save(r);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Admin only: update
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Room in) {
        Optional<Room> opt = roomRepository.findById(id);
        if (opt.isPresent()) {
            Room r = opt.get();
            r.setTitle(in.getTitle());
            r.setType(in.getType());
            r.setDescription(in.getDescription());
            r.setPricePerNight(in.getPricePerNight());
            r.setPhotoUrl(in.getPhotoUrl());
            r.setCapacity(in.getCapacity());
            Room saved = roomRepository.save(r);
            return ResponseEntity.ok(saved);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Room not found"));
        }
    }

    // Admin only: delete
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Room> opt = roomRepository.findById(id);
        if (opt.isPresent()) {
            roomRepository.delete(opt.get());
            return ResponseEntity.ok(Map.of("message", "Deleted"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Room not found"));
        }
    }
}
