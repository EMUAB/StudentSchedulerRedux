package edu.uab.controller;

import edu.uab.model.SampleScheduleModel;
import edu.uab.service.SampleScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "http://localhost:5173")
public class SampleScheduleController {

    private final SampleScheduleService sampleScheduleService;

    @Autowired
    public SampleScheduleController(SampleScheduleService sampleScheduleService) {
        this.sampleScheduleService = sampleScheduleService;
    }

        @GetMapping
    public ResponseEntity<List<SampleScheduleModel>> getAllCourses() {
        List<SampleScheduleModel> departments = sampleScheduleService.findAllDepartments();
        return ResponseEntity.ok(departments);
    }




    @GetMapping("/{departmentId}/semesters/{academicYear}/{semesterName}/courses")
    public ResponseEntity<List<SampleScheduleModel.Course>> getCoursesBySemester(
            @PathVariable("departmentId") String departmentId,
            @PathVariable("academicYear") String academicYear,
            @PathVariable("semesterName") String semesterName) {

        List<SampleScheduleModel.Course> courses = sampleScheduleService.getCoursesBySemester(departmentId,
                academicYear, semesterName);

        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(courses);
    }
}