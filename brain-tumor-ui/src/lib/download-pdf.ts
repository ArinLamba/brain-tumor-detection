import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadPDF = async () => {
  const element = document.getElementById("report");
  if (!element) return;

  // wait for images
  const images = element.getElementsByTagName("img");
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  await new Promise((r) => setTimeout(r, 200));

  const canvas = await html2canvas(element, {
    useCORS: true,
    scale: 2,
    backgroundColor: "#000",
  });

  // 🚨 SAFETY CHECK
  if (!canvas.width || !canvas.height) {
    console.error("Canvas is empty!");
    return;
  }

  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = 210;
  const margin = 10;
  const imgWidth = pageWidth - margin * 2;

  // ✅ SAFE HEIGHT CALCULATION
  const ratio = canvas.height / canvas.width;
  const imgHeight = imgWidth * ratio;

  // 🚨 FINAL SAFETY
  if (isNaN(imgHeight) || imgHeight <= 0) {
    console.error("Invalid image height!");
    return;
  }

  pdf.addImage(imgData, "JPEG", margin, margin, imgWidth, imgHeight);

  pdf.save("brain-tumor-report.pdf");
};