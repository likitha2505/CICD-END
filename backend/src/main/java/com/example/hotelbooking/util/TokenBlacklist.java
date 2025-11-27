package com.example.hotelbooking.util;

import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory token blacklist for demo purposes.
 */
@Component
public class TokenBlacklist {

    private final Set<String> blacklisted = ConcurrentHashMap.newKeySet();

    public void blacklist(String token) {
        if (token != null && !token.isBlank()) {
            blacklisted.add(token);
        }
    }

    public boolean isBlacklisted(String token) {
        if (token == null || token.isBlank()) return false; // null tokens are not "blacklisted"
        return blacklisted.contains(token);
    }
}
