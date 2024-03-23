package edu.uab.service;

import edu.uab.model.CourseModel;
import edu.uab.repository.CourseRepository;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

@Service
public class DatabaseInitializerService {

    @Autowired
    private CourseRepository courseRepository;

    public void initializeDatabase(Resource jsonResource) {
        try {
            byte[] jsonDataBytes = FileCopyUtils.copyToByteArray(jsonResource.getInputStream());
            String jsonString = new String(jsonDataBytes);

            ObjectMapper objectMapper = new ObjectMapper();
            CourseModel[] courses = objectMapper.readValue(jsonString, CourseModel[].class);

            for (CourseModel course : courses) {
                if (course != null && course.get_id() != null) {
                    String id = course.get_id().getOid();
                    if (id != null) {
                        course.setId(id);
                    }
                    courseRepository.save(course);
                }
            }
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception appropriately
        }
    }
}