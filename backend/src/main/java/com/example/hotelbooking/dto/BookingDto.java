package com.example.hotelbooking.dto;

import java.time.LocalDate;

/**
 * DTO for Booking. Ensure this class is in package:
 * com.example.hotelbooking.dto
 *
 * Adjust fields if you need extra properties, but keep method names used by BookingMapper.
 */
public class BookingDto {

    private Long id;
    private String guestName;
    private String guestEmail;

    // DTO uses startDate/endDate (mapped from entity checkIn/checkOut)
    private LocalDate startDate;
    private LocalDate endDate;

    private String confirmationCode;
    private boolean cancelled;

    // optional references
    private Long roomId;
    private Long userId;

    private String photoUrl;
    // optional additional fields:
    // private String roomNumber;
    // private String username;

    public BookingDto() {}

    // id
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    // guestName
    public String getGuestName() { return guestName; }
    public void setGuestName(String guestName) { this.guestName = guestName; }

    // guestEmail
    public String getGuestEmail() { return guestEmail; }
    public void setGuestEmail(String guestEmail) { this.guestEmail = guestEmail; }

    // startDate / endDate
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    // confirmationCode
    public String getConfirmationCode() { return confirmationCode; }
    public void setConfirmationCode(String confirmationCode) { this.confirmationCode = confirmationCode; }

    // cancelled
    public boolean isCancelled() { return cancelled; }
    public void setCancelled(boolean cancelled) { this.cancelled = cancelled; }

    // roomId
    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }

    // userId
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getPhotoUrl() {
    return photoUrl;
}

public void setPhotoUrl(String photoUrl) {
    this.photoUrl = photoUrl;
}


    // optional extras if needed:
    // public String getRoomNumber() { return roomNumber; }
    // public void setRoomNumber(String rn) { this.roomNumber = rn; }
    //
    // public String getUsername() { return username; }
    // public void setUsername(String u) { this.username = u; }
}
