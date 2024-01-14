package com.example.backend.controllers;

import com.example.backend.DataBase.ShotDTO;
import com.example.backend.DataBase.ShotRepository;
import com.example.backend.Entity.Shot;
import com.example.backend.Entity.User;
import com.example.backend.Utils.JwtUtil;
import com.example.backend.model.DataRequest;
import com.example.backend.service.AreaCheckService;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;
import java.util.List;

@RestController
@RequestMapping("/api/shots")
public class DataController {
    private final AreaCheckService areaCheckService;
    private final ShotRepository shotRepository;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public DataController(AreaCheckService areaCheckService, ShotRepository shotRepository, JwtUtil jwtUtil, UserService userService) {
        this.areaCheckService = areaCheckService;
        this.shotRepository = shotRepository;
        this.jwtUtil = jwtUtil;
        this.userService = userService;

    }
    @Transactional
    @PostMapping
    public ResponseEntity<?> processData(@RequestBody DataRequest dataRequest, HttpServletRequest request) {
        try {
            String jwtToken = extractJwtFromRequest(request);
            if (jwtToken == null) {
                throw new AuthenticationException("No JWT token found in request");
            }

            String username = jwtUtil.extractUsername(jwtToken);
            User user = userService.findByUsername(username);
            if (user == null) {
                throw new AuthenticationException("User not found");
            }

            String res = areaCheckService.isPointInsideArea(dataRequest);
            Shot newShot = new Shot();
            newShot.setX(dataRequest.getX());
            newShot.setY(dataRequest.getY());
            newShot.setR(dataRequest.getR());
            newShot.setResult(res);
            newShot.setUser(user);
            shotRepository.save(newShot);

            ShotDTO returnedShot = new ShotDTO() {
                @Override
                public double getX() {
                    return newShot.getX();
                }

                @Override
                public double getY() {
                    return newShot.getY();
                }

                @Override
                public double getR() {
                    return newShot.getR();
                }

                @Override
                public String getResult() {
                    return newShot.getResult();
                }
            };

            return new ResponseEntity<>(returnedShot, HttpStatus.CREATED);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    @DeleteMapping
    public ResponseEntity<?> clearTable(HttpServletRequest request) {
        try {
            String jwtToken = extractJwtFromRequest(request);
            if (jwtToken == null) {
                throw new AuthenticationException("No JWT token found in request");
            }

            String username = jwtUtil.extractUsername(jwtToken);
            User user = userService.findByUsername(username);
            if (user == null) {
                throw new AuthenticationException("User not found");
            }

            shotRepository.deleteAllByUser(user);
            return ResponseEntity.noContent().build();
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping
    public ResponseEntity<?> getUserData(HttpServletRequest request) {
        try {
            String jwtToken = extractJwtFromRequest(request);
            if (jwtToken == null) {
                throw new AuthenticationException("No JWT token found in request");
            }

            String username = jwtUtil.extractUsername(jwtToken);
            User user = userService.findByUsername(username);
            if (user == null) {
                throw new AuthenticationException("User not found");
            }

            List<ShotDTO> userShots = shotRepository.findAllByUser(user);
            return ResponseEntity.ok(userShots);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Authentication error: " + e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>("Internal server error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
