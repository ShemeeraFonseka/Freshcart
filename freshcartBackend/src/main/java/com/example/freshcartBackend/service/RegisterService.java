package com.example.freshcartBackend.service;

import com.example.freshcartBackend.data.Register;
import com.example.freshcartBackend.data.RegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegisterService {

    @Autowired
    private RegisterRepository registerRepository;

    public Register makeRegister(Register reg){
        return registerRepository.save(reg);
    }

    public boolean isUsernameTaken(String username){
        return registerRepository.findByUsername(username).isPresent();
    }

    public Optional<Register> findByUsername(String username){
        return registerRepository.findByUsername(username);
    }
}
