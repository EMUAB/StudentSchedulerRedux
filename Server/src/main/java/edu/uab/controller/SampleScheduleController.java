package edu.uab.controller;

import edu.uab.model.SampleScheduleModel;
import edu.uab.service.SampleScheduleService;
import jakarta.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/departments")
public class SampleScheduleController {

    private final SampleScheduleService sampleScheduleService;

    @Autowired
    public SampleScheduleController(SampleScheduleService sampleScheduleService) {
        this.sampleScheduleService = sampleScheduleService;
    }

    @GetMapping("/{departmentId}/semesters/{academicYear}/{semesterName}/courses")
    public ResponseEntity<List<SampleScheduleModel.Course>> getCoursesBySemester(
            @PathParam("departmentId") String departmentId,
            @PathParam("academicYear") String academicYear,
            @PathParam("semesterName") String semesterName) {

        List<SampleScheduleModel.Course> courses = sampleScheduleService.getCoursesBySemester(departmentId,
                academicYear, semesterName);

        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(courses);
    }
}