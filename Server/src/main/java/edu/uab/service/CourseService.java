package edu.uab.service;

import edu.uab.model.CourseModel;
import edu.uab.repository.CourseRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseModel> findAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<CourseModel> findCourseById(@NonNull String id) {
        return courseRepository.findById(id);
    }

    public CourseModel saveCourse(@NonNull CourseModel course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(@NonNull String id) {
        courseRepository.deleteById(id);
    }

    public List<CourseModel> findCoursesByName(String courseName) {
        return courseRepository.findByCourseNameContainingIgnoreCase(courseName);
    }

    public CourseModel updateCourseId(@NonNull String id, @NonNull CourseModel newCourse) {
        Optional<CourseModel> existingCourseOptional = courseRepository.findById(id);
        if (existingCourseOptional.isPresent()) {
            CourseModel existingCourse = existingCourseOptional.get();
            existingCourse.setId(newCourse.getId()); // Set the new ID
            existingCourse.setCourseName(newCourse.getCourseName());
            existingCourse.setLevel(newCourse.getLevel());
            return courseRepository.save(existingCourse);
        } else {
            throw new IllegalArgumentException("Course with id " + id + " not found");
        }
    }
}