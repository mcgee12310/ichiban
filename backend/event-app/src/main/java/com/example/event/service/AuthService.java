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

    public LoginResponse signup(SignupRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setGender(request.getGender());

        // convert String -> LocalDate
        if (request.getBirthdate() != null && !request.getBirthdate().isEmpty()) {
            user.setBirthdate(LocalDate.parse(request.getBirthdate())); // yyyy-MM-dd
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                token,
                user.getEmail(),
                "Đăng ký thành công"
        );
    }
}

