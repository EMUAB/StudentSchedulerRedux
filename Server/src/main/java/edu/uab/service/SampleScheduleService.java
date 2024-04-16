package edu.uab.service;

import edu.uab.model.SampleScheduleModel;
import edu.uab.repository.SampleScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class SampleScheduleService {

    private final SampleScheduleRepository repository;

    @Autowired
    public SampleScheduleService(SampleScheduleRepository repository) {
        this.repository = repository;
    }

    public List<SampleScheduleModel.Course> getCoursesBySemester(String departmentId, String academicYear,
            String semesterName) {
        return repository.findByDepartmentId(departmentId)
                .map(schedule -> schedule.getAcademicYears().get(academicYear))
                .map(year -> year.getSemesters().get(semesterName))
                .orElseGet(Collections::emptyList); // Use orElseGet for a supplier that doesn't throw exceptions
    }
}