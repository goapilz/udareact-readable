@echo off
cd  api-server
echo starting server
start node server
cd ..
cd frontend
echo starting frontend
start npm start
exit