package com.example.event.service;

import com.example.event.dto.request.LoginRequest;
import com.example.event.dto.response.LoginResponse;
import com.example.event.model.User;
import com.example.event.repository.UserRepository;
import com.example.event.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {

        // Tìm người dùng theo email
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        User user = userOptional.get();

        // So sánh mật khẩu
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        // Tạo JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                "Đăng nhập thành công"
        );
    }
}

