package com.example.freshcartBackend.control;

import com.example.freshcartBackend.data.Register;
import com.example.freshcartBackend.data.RegisterRepository;
import com.example.freshcartBackend.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api")
public class RegisterController {


    @Autowired
    private RegisterService registerService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/registerUser")
    public ResponseEntity<?> makeRegister(@RequestBody Register register){
        boolean isUsernameTaken= registerService.isUsernameTaken(register.getUsername());

        if (isUsernameTaken){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already taken");
        }

        Register savedRegister = registerService.makeRegister(register);
        return ResponseEntity.ok(savedRegister);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/loginUser")
    public ResponseEntity<String> loginUsername(@RequestBody Register loginRequest){
        Optional<Register> user=registerService.findByUsername(loginRequest.getUsername());

        if(user.isPresent() && user.get().getPassword().endsWith(loginRequest.getPassword())){
            return ResponseEntity.ok("Login Successful");
        }
        else{
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }



}
