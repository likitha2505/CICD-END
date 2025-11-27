package com.example.hotelbooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
  private String token;
  private String tokenType = "Bearer";
  public String getToken() {
	return token;
  }
  public void setToken(String token) {
	this.token = token;
  }
  public String getTokenType() {
	return tokenType;
  }
  public void setTokenType(String tokenType) {
	this.tokenType = tokenType;
  }
}
