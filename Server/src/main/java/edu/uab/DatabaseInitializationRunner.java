package edu.uab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import edu.uab.service.DatabaseInitializerService;

@Component
public class DatabaseInitializationRunner implements ApplicationRunner {

    private final DatabaseInitializerService initializerService;
    private final ResourceLoader resourceLoader;

    @Autowired
    public DatabaseInitializationRunner(DatabaseInitializerService initializerService, ResourceLoader resourceLoader) {
        this.initializerService = initializerService;
        this.resourceLoader = resourceLoader;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource jsonData = resourceLoader.getResource("classpath:scheduler.courses.json");
        initializerService.initializeDatabase(jsonData);
    }
}
