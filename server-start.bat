@echo off
cd Server
set MONGO_DB_PASSWORD=OaxM9eobBOToHaOy
mvn package
java -jar target\StudentSchedulerRedux-0.0.1-SNAPSHOT.jar