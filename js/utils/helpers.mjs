const pageEl = document.querySelector(".page-a");
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function addFontFromFile(fileObj) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const newFont = new FontFace("temp-font", e.target.result);
    newFont.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
      pageEl.style.fontFamily = "temp-font";
    });
  };
  reader.readAsArrayBuffer(fileObj);
}

/**
 * @method createPDF
 * @param imgs
 * @description
 */
function createPDF(imgs) {
  const doc = new jsPDF("p", "pt", "a4");
  const width = doc.internal.pageSize.width;
  const height = doc.internal.pageSize.height;
  for (const i in imgs) {
    doc.text(10, 20, "");
    doc.addImage(
      imgs[i],
      "JPEG",
      25,
      50,
      width - 50,
      height - 80,
      "image-" + i
    );
    if (i != imgs.length - 1) {
      doc.addPage();
    }
  }
  doc.save();
}

function formatText(event) {
  event.preventDefault();
  const text = event.clipboardData
    .getData("text/plain")
    .replace(/\n/g, "<br/>");
  document.execCommand("insertHTML", false, text);
}

export { isMobile, addFontFromFile, createPDF, formatText };
