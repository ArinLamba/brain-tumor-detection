from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from ultralytics import YOLO

import uuid
import shutil
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
OUTPUT_BASE = os.path.join(BASE_DIR, "outputs")
OUTPUT_FOLDER = os.path.join(OUTPUT_BASE, "result")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.mount("/outputs", StaticFiles(directory=OUTPUT_BASE), name="outputs")

model = YOLO(os.path.join(BASE_DIR, "best.pt"))


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:

        if not file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
            return JSONResponse(
                status_code=400,
                content={"error": "Only image files allowed"}
            )

        unique_name = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_FOLDER, unique_name)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        results = model.predict(
            source=file_path,
            save=True,
            project=os.path.join(BASE_DIR, "outputs"),
            name="result",
            exist_ok=True
        )

        r = results[0]

        save_dir = results[0].save_dir

        predictions = []

        if r.boxes is not None:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])

                predictions.append({
                    "class": r.names[cls_id],
                    "confidence": round(conf, 3)
                })

        # YOLO saves image with same filename as input
        # output_image_path = os.path.join(save_dir, file.filename)
        output_files = os.listdir(save_dir)
        output_image_path = os.path.join(save_dir, output_files[0])

        # fallback safety
        if not os.path.exists(output_image_path):
            # sometimes YOLO renames file
            output_files = os.listdir(save_dir)
            output_image_path = os.path.join(save_dir, output_files[0])

        output_image_url = f"/outputs/result/{os.path.basename(output_image_path)}"

        return JSONResponse(content={
            "filename": file.filename,
            "predictions": predictions,
            "output_image_url": output_image_url
        })
    
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )