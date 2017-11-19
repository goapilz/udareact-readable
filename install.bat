@echo off
cd  api-server
echo installing server
call npm install
cd ..
cd frontend
echo installing frontend
call npm install
exit