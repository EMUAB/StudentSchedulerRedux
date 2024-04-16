package edu.uab.service;

import edu.uab.model.SampleScheduleModel;
import edu.uab.repository.SampleScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SampleScheduleService {

    private final SampleScheduleRepository repository;

    @Autowired
    public SampleScheduleService(SampleScheduleRepository repository) {
        this.repository = repository;
    }

    public List<SampleScheduleModel> findAllDepartments() {
        List<SampleScheduleModel> departments = repository.findAll();
        System.out.println(departments.getFirst());
        return departments;
    }

    public Optional<SampleScheduleModel> findDepartment(@NonNull String departmentId) {
        return repository.findByDepartmentId(departmentId);
    }

    //@shak is this needs fixing
//    public List<SampleScheduleModel.AcademicYear> findAcademicYears(@NonNull String departmentId) {
//        Optional<SampleScheduleModel.AcademicYear> years = repository.findByDepartmentId() //something here;
//        return years;
//    }



    public List<SampleScheduleModel.Course> getCoursesBySemester(String departmentId, String academicYear,
                                                                 String semesterName) {
        //could add null checks here
        return repository.findByDepartmentId(departmentId)
                .map(schedule -> schedule.getAcademicYears().get(academicYear))
                .map(year -> year.getSemesters().get(semesterName))
                .orElseGet(Collections::emptyList); // Use orElseGet for a supplier that doesn't throw exceptions
    }
}