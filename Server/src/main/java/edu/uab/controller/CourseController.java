package edu.uab.controller;

import edu.uab.model.CourseModel;
import edu.uab.service.CourseService;

import org.springframework.lang.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Get all courses
    @GetMapping
    public ResponseEntity<List<CourseModel>> getAllCourses() {
        List<CourseModel> courses = courseService.findAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Get a single course by ID
    @GetMapping("/{id}")
    public ResponseEntity<CourseModel> getCourseById(@PathVariable @NonNull String id) {
        Optional<CourseModel> course = courseService.findCourseById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new course
    @PostMapping
    public ResponseEntity<CourseModel> createCourse(@RequestBody @NonNull CourseModel course) {
        CourseModel savedCourse = courseService.saveCourse(course);
        return ResponseEntity.ok(savedCourse);
    }

    // Update an existing course
    @PutMapping("/{id}")
    public ResponseEntity<CourseModel> updateCourse(@PathVariable String id, @RequestBody CourseModel course) {
        course.setID(id);
        CourseModel updatedCourse = courseService.saveCourse(course);
        return ResponseEntity.ok(updatedCourse);
    }

    // Delete a course
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable @NonNull String id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }

    // Search for courses by name
    @GetMapping("/search")
    public ResponseEntity<List<CourseModel>> findCoursesByName(@RequestParam String name) {
        List<CourseModel> courses = courseService.findCoursesByName(name);
        return ResponseEntity.ok(courses);
    }
}