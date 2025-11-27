package com.example.hotelbooking.service;

import com.example.hotelbooking.model.Role;
import com.example.hotelbooking.model.User;
import com.example.hotelbooking.repository.RoleRepository;
import com.example.hotelbooking.repository.UserRepository;
import com.example.hotelbooking.util.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public String register(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already in use");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("ROLE_USER not found"));

        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(password));
        u.setRoles(Set.of(userRole));
        userRepository.save(u);

        List<String> roles = u.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return jwtUtils.generateToken(email, roles);
    }

    public String login(String email, String password) {
        User u = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, u.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        List<String> roles = u.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());

        return jwtUtils.generateToken(email, roles);
    }
}
