package com.example.freshcartBackend.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegisterRepository extends JpaRepository<Register,String> {

    Optional<Register> findByUsername(String username);



}
