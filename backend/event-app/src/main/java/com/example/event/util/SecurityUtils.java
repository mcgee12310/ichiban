package com.example.event.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class SecurityUtils {

    /**
     * Extracts the User ID from the SecurityContext.
     * This works with JWT-based authentication where the ID is stored as the Principal.
     * * @return Long userId if authenticated, null if the user is a guest (anonymous).
     */
    public static Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 1. Safety check: Is there an active authentication?
        if (authentication == null || !authentication.isAuthenticated() 
                || authentication.getPrincipal().equals("anonymousUser")) {
            return null;
        }

        Object principal = authentication.getPrincipal();

        // 2. Case: The Principal is already a Long (Common in many JWT setups)
        if (principal instanceof Long) {
            return (Long) principal;
        }

        // 3. Case: The Principal is a String (e.g., the ID was stored as a string in the token)
        if (principal instanceof String) {
            try {
                return Long.valueOf((String) principal);
            } catch (NumberFormatException e) {
                return null;
            }
        }

        // 4. Case: Standard UserDetails (If you are using default Spring Security setup)
        // If your UserDetails doesn't have an ID, this utility cannot find it.
        // You would need to store the ID in the principal during the Filter stage.
        if (principal instanceof UserDetails) {
            // Note: Default UserDetails only has getUsername().
            // If you need the ID, ensure your JwtAuthenticationFilter sets the ID as the principal.
            return null; 
        }

        return null;
    }
}