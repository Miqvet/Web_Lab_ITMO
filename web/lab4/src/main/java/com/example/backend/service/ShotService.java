package com.example.backend.service;

import com.example.backend.DataBase.ShotRepository;
import com.example.backend.Entity.Shot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShotService {

    @Autowired
    private ShotRepository shotRepository;

    public Shot saveShot(Shot shot) {
        return shotRepository.save(shot);
    }

    public List<Shot> getAllShots() {
        return shotRepository.findAll();
    }

    public void deleteAllShots() {
        shotRepository.deleteAll();
    }


}
