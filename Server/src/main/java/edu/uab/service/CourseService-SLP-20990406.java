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
        List<CourseModel> courses = courseRepository.findAll();
        System.out.println(courses.get(0));
        return courses;
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

    public CourseModel updateCourseDetails(@NonNull String id, @NonNull CourseModel updatedCourse) {
        Optional<CourseModel> existingCourseOptional = courseRepository.findById(id);
        if (existingCourseOptional.isPresent()) {
            CourseModel existingCourse = existingCourseOptional.get();
            existingCourse.setCRN(updatedCourse.getCRN());
            existingCourse.setSubject(updatedCourse.getSubject());
            existingCourse.setCourseNumber(updatedCourse.getCourseNumber());
            existingCourse.setSection(updatedCourse.getSection());
            existingCourse.setTitle(updatedCourse.getTitle());
            existingCourse.setCredit(updatedCourse.getCredit());
            existingCourse.setDays(updatedCourse.getDays());
            existingCourse.setTime(updatedCourse.getTime());
            existingCourse.setCapacity(updatedCourse.getCapacity());
            existingCourse.setEnrolled(updatedCourse.getEnrolled());
            existingCourse.setRemaining(updatedCourse.getRemaining());
            existingCourse.setInstructor(updatedCourse.getInstructor());
            existingCourse.setDateRange(updatedCourse.getDateRange());
            existingCourse.setLocation(updatedCourse.getLocation());
            return courseRepository.save(existingCourse);
        } else {
            throw new IllegalArgumentException("Course with id " + id + " not found");
        }
    }
}