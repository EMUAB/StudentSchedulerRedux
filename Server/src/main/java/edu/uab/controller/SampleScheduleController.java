package edu.uab.controller;

import edu.uab.model.SampleScheduleModel;
import edu.uab.service.SampleScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sampleSchedule")
@CrossOrigin(origins = "http://localhost:5173")
public class SampleScheduleController {

    private final SampleScheduleService sampleScheduleService;

    @Autowired
    public SampleScheduleController(SampleScheduleService sampleScheduleService) {
        this.sampleScheduleService = sampleScheduleService;
    }

    @GetMapping
    public ResponseEntity<List<SampleScheduleModel>> getAllDepartments() {
        List<SampleScheduleModel> departments = sampleScheduleService.findAllDepartments();
        return ResponseEntity.ok(departments);
    }

    @GetMapping("/{departmentId}")
    public ResponseEntity<SampleScheduleModel> getDepartmentById(
            @PathVariable("departmentId") String departmentId) {
        Optional<SampleScheduleModel> department = sampleScheduleService.findDepartment(departmentId);
        return department.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //@shak this needs fixing
    // I'm not the most skilled database person but this should be close
//    @GetMapping("/{departmentId}/semesters")
//    public ResponseEntity<List<SampleScheduleModel.AcademicYear>> getAcademicYear(
//            @PathVariable("departmentId") String departmentId) {
//        List<SampleScheduleModel.AcademicYear> years = sampleScheduleService.findAcademicYears(departmentId);
//        if (!years.isEmpty()) {
//            return ResponseEntity.ok(years);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


    // @GetMapping("/{departmentId}/semesters/{academicYear}/{semesterName}/courses")
    // public ResponseEntity<List<SampleScheduleModel.Course>> getCoursesBySemester(
    //         @PathVariable("departmentId") String departmentId,
    //         @PathVariable("academicYear") String academicYear,
    //         @PathVariable("semesterName") String semesterName) {

    //     List<SampleScheduleModel.Course> courses = sampleScheduleService.getCoursesBySemester(departmentId,
    //             academicYear, semesterName);

    //     if (courses.isEmpty()) {
    //         return ResponseEntity.notFound().build();
    //     }

    //     return ResponseEntity.ok(courses);
    // }
}