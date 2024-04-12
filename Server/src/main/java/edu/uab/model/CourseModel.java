package edu.uab.model;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CourseModel {
    private IdWrapper _id;
    private String CRN;
    private String Subject;
    private String CourseNumber;
    private String Section;
    private String Title;
    private String Credit;
    private String Days;
    private String Time;
    private String Capacity;
    private String Enrolled;
    private String Remaining;
    private String Instructor;
    private String DateRange;
    private String Location;

    public static class IdWrapper {

        @JsonProperty("$oid")
        private ObjectId oid;

        public IdWrapper() {
        }

        public IdWrapper(ObjectId oid) {
            this.oid = oid;
        }

        public ObjectId getOid() {
            return oid;
        }

        public void setOid(ObjectId oid) {
            this.oid = oid;
        }
    }

    public String getId() {
        if (_id != null) {
            return _id.getOid().toString(); // Convert ObjectId to String
        }
        return null;
    }

    public void setId(ObjectId id) {
        if (_id == null) {
            _id = new IdWrapper(id);
        } else {
            _id.setOid(id);
        }
    }

    public IdWrapper get_id() {
        return _id;
    }

    public void set_id(IdWrapper _id) {
        this._id = _id;
    }

    public String getCRN() {
        return CRN;
    }

    public void setCRN(String CRN) {
        this.CRN = CRN;
    }

    public String getSubject() {
        return Subject;
    }

    public void setSubject(String subject) {
        this.Subject = subject;
    }

    public String getCourseNumber() {
        return CourseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.CourseNumber = courseNumber;
    }

    public String getSection() {
        return Section;
    }

    public void setSection(String section) {
        this.Section = section;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        this.Title = title;
    }

    public String getCredit() {
        return Credit;
    }

    public void setCredit(String credit) {
        this.Credit = credit;
    }

    public String getDays() {
        return Days;
    }

    public void setDays(String days) {
        this.Days = days;
    }

    public String getTime() {
        return Time;
    }

    public void setTime(String time) {
        this.Time = time;
    }

    public String getCapacity() {
        return Capacity;
    }

    public void setCapacity(String capacity) {
        this.Capacity = capacity;
    }

    public String getEnrolled() {
        return Enrolled;
    }

    public void setEnrolled(String enrolled) {
        this.Enrolled = enrolled;
    }

    public String getRemaining() {
        return Remaining;
    }

    public void setRemaining(String remaining) {
        this.Remaining = remaining;
    }

    public String getInstructor() {
        return Instructor;
    }

    public void setInstructor(String instructor) {
        this.Instructor = instructor;
    }

    public String getDateRange() {
        return DateRange;
    }

    public void setDateRange(String dateRange) {
        this.DateRange = dateRange;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        this.Location = location;
    }

    @Override
    public String toString() {
        return String.format(
                "Course [CRN: %s, Subject: %s, Course Number: %s, Section: %s, Title: %s, Credit: %s, Days: %s, Time: %s, Capacity: %s, Enrolled: %s, Remaining: %s, Instructor: %s, Date Range: %s, Location: %s]",
                CRN, Subject, CourseNumber, Section, Title, Credit, Days, Time, Capacity, Enrolled, Remaining,
                Instructor, DateRange, Location);
    }
}