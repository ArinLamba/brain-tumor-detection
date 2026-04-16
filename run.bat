@echo off
TITLE YOLO Brain Tumor - FastAPI Server
echo ---------------------------------------------------------
echo Activating Environment and Launching Backend...
echo ---------------------------------------------------------

:: 1. Navigate to the root project folder
cd /d "D:\Project\BrainTumorDetection"

:: 2. Move into the backend folder
cd backend

:: 3. Activate the environment (pointing back to the root) 
:: and start the server
cmd /k "..\yolo-env\Scripts\activate && uvicorn main:app --reload"