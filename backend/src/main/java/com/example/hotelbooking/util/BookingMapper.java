package com.example.hotelbooking.util;

import com.example.hotelbooking.dto.BookingDto;
import com.example.hotelbooking.model.Booking;

/**
 * Mapper between Booking entity and BookingDto.
 * Adjust the room/user mapping lines if your BookingDto differs.
 */
public class BookingMapper {

    public static BookingDto toDto(Booking b) {
        if (b == null) return null;

        BookingDto dto = new BookingDto();
        dto.setId(b.getId());
        dto.setGuestName(b.getGuestName());
        dto.setGuestEmail(b.getGuestEmail());

        // Map entity checkIn/checkOut to DTO startDate/endDate
        dto.setStartDate(b.getCheckIn());
        dto.setEndDate(b.getCheckOut());

        dto.setConfirmationCode(b.getConfirmationCode());
        dto.setCancelled(b.isCancelled());

        if (b.getRoom() != null) {
            dto.setRoomId(b.getRoom().getId());
            // dto.setRoomNumber(b.getRoom().getNumber()); // Uncomment/adapt if DTO has this
        }
        if (b.getUser() != null) {
            dto.setUserId(b.getUser().getId());
            // dto.setUsername(b.getUser().getUsername()); // Uncomment/adapt if DTO has this
        }

        return dto;
    }

    public static Booking toEntity(BookingDto dto) {
        if (dto == null) return null;

        Booking b = new Booking();
        b.setId(dto.getId());
        b.setGuestName(dto.getGuestName());
        b.setGuestEmail(dto.getGuestEmail());

        // Map DTO startDate/endDate back to entity checkIn/checkOut
        b.setCheckIn(dto.getStartDate());
        b.setCheckOut(dto.getEndDate());

        b.setConfirmationCode(dto.getConfirmationCode());
        b.setCancelled(dto.isCancelled());

        // Do not set room/user here — resolve in service using repositories
        return b;
    }
}
