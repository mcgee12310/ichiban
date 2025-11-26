package com.example.event.config;

import com.example.event.model.User;
import com.example.event.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Tạo user admin nếu chưa tồn tại qua email
        if (!userRepository.existsByEmail("admin@example.com")) {
            User admin = new User();
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setFullName("Administrator");
            userRepository.save(admin);

            System.out.println("Đã tạo user mẫu: email=admin@example.com, password=admin123");
        }

        // Tạo user thường
        if (!userRepository.existsByEmail("user@example.com")) {
            User user = new User();
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setFullName("Sample User");
            userRepository.save(user);

            System.out.println("Đã tạo user mẫu: email=user@example.com, password=user123");
        }
    }
}

