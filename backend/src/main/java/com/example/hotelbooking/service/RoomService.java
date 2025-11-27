// src/main/java/com/example/hotelbooking/service/RoomService.java
package com.example.hotelbooking.service;

import com.example.hotelbooking.model.Room;
import com.example.hotelbooking.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    public RoomService(RoomRepository roomRepository) { this.roomRepository = roomRepository; }

    public List<Room> listAll() { return roomRepository.findAll(); }

    public Room getById(Long id) {
        return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public Room save(Room room) { return roomRepository.save(room); }

    public void deleteById(Long id) { roomRepository.deleteById(id); }

    public Optional<Room> findById(Long id) { return roomRepository.findById(id); }
}
