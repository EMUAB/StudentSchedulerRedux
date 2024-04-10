#!/bin/bash
cd Server
export MONGO_DB_PASSWORD='xiCzmBptZREVNcXI'
mvn package
java -jar target/StudentSchedulerRedux-0.0.1-SNAPSHOT.jar