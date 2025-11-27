package com.example.hotelbooking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequest {
    @NotNull
    private String checkIn; // ISO date string e.g. 2025-09-22
    @NotNull
    private String checkOut;
    @NotNull
    private Long roomId;
    @NotNull
    private String guestName;
    @NotNull
    @Email
    private String guestEmail;
}
