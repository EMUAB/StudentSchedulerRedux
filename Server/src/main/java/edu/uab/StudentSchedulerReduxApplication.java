package edu.uab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class StudentSchedulerReduxApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentSchedulerReduxApplication.class, args);
    }

    @GetMapping("/")
    public String apiRoot() {
        return "test stuff :)";
    }

}