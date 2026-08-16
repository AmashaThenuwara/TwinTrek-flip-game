@echo off
echo Cleaning up any stuck server processes on port 8080...
FOR /F "tokens=5" %%T IN ('netstat -a -n -o ^| findstr :8080') DO (
    taskkill /F /PID %%T >nul 2>&1
)
echo Starting the TwinTrek backend server...
.\mvnw spring-boot:run
