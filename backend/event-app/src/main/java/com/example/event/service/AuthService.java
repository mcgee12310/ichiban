package com.example.event.service;

import com.example.event.dto.request.LoginRequest;
import com.example.event.dto.request.SignupRequest;
import com.example.event.dto.response.LoginResponse;
import com.example.event.model.User;
import com.example.event.repository.UserRepository;
import com.example.event.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        // ✅ FIX: Pass both Email AND User ID to generate the token
        String token = jwtUtil.generateToken(user.getEmail(), user.getId());

        return new LoginResponse(
                token,
                user.getEmail(),
                "Đăng nhập thành công"
        );
    }

    public LoginResponse signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());

        if (request.getBirthdate() != null && !request.getBirthdate().isEmpty()) {
            user.setBirthdate(LocalDate.parse(request.getBirthdate()));
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // ✅ IMPORTANT: Save first to generate the ID
        User savedUser = userRepository.save(user);

        // ✅ FIX: Use the ID from the savedUser to generate the token
        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getId());

        return new LoginResponse(
                token,
                savedUser.getEmail(),
                "Đăng ký thành công"
        );
    }
}
