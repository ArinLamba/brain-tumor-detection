export const downloadImage = async (imageUrl: string | null) => {
  if(!imageUrl) return;
  const response = await fetch(imageUrl);
  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "image.jpg"; // file name
  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};