package com.example.backend.DataBase;

import com.example.backend.Entity.Shot;
import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShotRepository extends JpaRepository<Shot, Long> {
    List<ShotDTO> findAllByUser(User user);
    List<ShotDTO> findAllByUserAndR(User user, Double R);
    void deleteAllByUser(User user);
}
