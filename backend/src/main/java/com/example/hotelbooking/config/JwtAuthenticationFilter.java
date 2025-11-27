package com.example.hotelbooking.config;

import com.example.hotelbooking.util.JwtUtils;
import com.example.hotelbooking.util.TokenBlacklist;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Filter to validate JWT, check blacklist and set SecurityContext.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final TokenBlacklist tokenBlacklist;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtUtils jwtUtils, TokenBlacklist tokenBlacklist, UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.tokenBlacklist = tokenBlacklist;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        String token = null;
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
        }

        try {
            if (token != null && jwtUtils.validateJwt(token) && !tokenBlacklist.isBlacklisted(token)) {
                String username = jwtUtils.getUsernameFromJwt(token);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                List<String> roles = jwtUtils.getRolesFromJwt(token);
                Collection<SimpleGrantedAuthority> authorities;
                if (roles != null && !roles.isEmpty()) {
                    authorities = roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
                } else {
                    authorities = userDetails.getAuthorities().stream()
                            .map(gr -> new SimpleGrantedAuthority(gr.getAuthority()))
                            .collect(Collectors.toList());
                }

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}
