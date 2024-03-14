package edu.uab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ResourceLoader;

import edu.uab.service.DatabaseInitializerService;

@SpringBootApplication
public class StudentSchedulerReduxApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentSchedulerReduxApplication.class, args);
    }

    @Bean
    public DatabaseInitializationRunner databaseInitializationRunner(DatabaseInitializerService initializerService,
            ResourceLoader resourceLoader) {
        return new DatabaseInitializationRunner(initializerService, resourceLoader);
    }
}