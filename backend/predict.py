from ultralytics import YOLO

# load your trained model
model = YOLO("runs/detect/train6/weights/best.pt")

# run prediction on image
results = model.predict(
    source="test.jpg",
    save=True,
    show=True
)

print(results)

print("Saved in runs/detect/predict/")
input("Press Enter to exit...")