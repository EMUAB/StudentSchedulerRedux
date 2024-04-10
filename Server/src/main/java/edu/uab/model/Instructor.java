package edu.uab.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import edu.uab.model.CourseModel;

public class Instructor extends CourseModel {
    private Integer Instructor_Subject_id;
    private Integer Teacher_id;
    private Integer Instructor_Group_id;
    private Integer Subject_id;
    private String Title;
    private Integer Employee_id;


    public Integer getStudent_Group_id() {
        return Student_Group_id;
    }

    public void setStudent_Group_id(Integer student_Group_id) {
        Student_Group_id = student_Group_id;
    }

    public Integer getInstructor_Subject_id() {
        return Instructor_Subject_id;
    }

    public void setInstructor_Subject_id(Integer instructor_Subject_id) {
        Instructor_Subject_id = instructor_Subject_id;
    }

    public Integer getTeacher_id() {
        return Teacher_id;
    }

    public void setTeacher_id(Integer teacher_id) {
        Teacher_id = teacher_id;
    }

    public Integer getInstructor_Group_id() {
        return Instructor_Group_id;
    }

    public void setInstructor_Group_id(Integer instructor_Group_id) {
        Instructor_Group_id = instructor_Group_id;
    }

    public Integer getSubject_id() {
        return Subject_id;
    }

    public void setSubject_id(Integer subject_id) {
        Subject_id = subject_id;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public Integer getEmployee_id() {
        return Employee_id;
    }

    public void setEmployee_id(Integer employee_id) {
        Employee_id = employee_id;
    }
    
}
