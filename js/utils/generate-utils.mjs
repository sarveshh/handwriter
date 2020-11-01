const pageEl = document.querySelector(".page-a");
const paperContentEl = document.querySelector(".page-a .paper-content");
const overlayEl = document.querySelector(".overlay");

let paperContentPadding;

function isFontErrory() {
  const currentHandwritingFont = document.body.style.getPropertyValue(
    "--handwriting-font"
  );
  return (
    currentHandwritingFont === "" ||
    currentHandwritingFont.includes("Homemade Apple")
  );
}

function applyPaperStyles() {
  pageEl.style.border = "none";
  pageEl.style.overflowY = "hidden";

  if (document.querySelector("#page-effects").value === "scanner") {
    overlayEl.classList.add("shadows");
  } else {
    overlayEl.classList.add(document.querySelector("#page-effects").value);
  }

  if (document.querySelector("#page-effects").value === "scanner") {
    overlayEl.style.background = `linear-gradient(${
      Math.floor(Math.random() * (120 - 50 + 1)) + 50
    }deg, #0008, #0000)`;
  } else if (document.querySelector("#page-effects").value === "shadows") {
    overlayEl.style.background = `linear-gradient(${
      Math.random() * 360
    }deg, #0008, #0000)`;
  }

  if (isFontErrory() && document.querySelector("#font-file").files.length < 1) {
    paperContentPadding =
      paperContentEl.style.paddingTop.replace(/px/g, "") || 5;
    const newPadding = Number(paperContentPadding) - 5;
    paperContentEl.style.paddingTop = `${newPadding}px`;
  }
}

function removePaperStyles() {
  pageEl.style.overflowY = "auto";
  pageEl.style.border = "1px solid var(--elevation-background)";

  if (document.querySelector("#page-effects").value === "scanner") {
    overlayEl.classList.remove("shadows");
  } else {
    overlayEl.classList.remove(document.querySelector("#page-effects").value);
  }

  if (isFontErrory()) {
    paperContentEl.style.paddingTop = `${paperContentPadding}px`;
  }
}

function renderOutput(outputImages) {
  if (outputImages.length <= 0) {
    document.querySelector("#output").innerHTML =
      'Click "Generate Image" Button to generate new image.';
    document.querySelector("#download-as-pdf-button").classList.remove("show");
    return;
  }

  document.querySelector("#download-as-pdf-button").classList.add("show");
  document.querySelector("#output").innerHTML = outputImages
    .map(
      (outputImageCanvas, index) => `
    <div 
      class="output-image-container" 
      style="position: relative;display: inline-block;"
    >
      <button 
        data-index="${index}" 
        class="close-button close-${index}">
          &times;
      </button>
      <img 
        class="shadow" 
        alt="Output image ${index}" 
        src="${outputImageCanvas.toDataURL("image/jpeg")}"
      />
      <div style="text-align: center">
        <a 
          class="button download-image-button" 
          download 
          href="${outputImageCanvas.toDataURL("image/jpeg")}
        ">Download Image</a>
      </div>
    </div>
    `
    )
    .join("");

  document.querySelector("#previewdiv").innerHTML = outputImages.map(
    (outputImageCanvas, index) => `
    <div 
      class="output-image-container" 
      style="position: relative;display: inline-block;"
    >
      <header class="w3-container w3-teal"> 
        <span onclick="document.getElementById('id01').style.display='none'" 
        class="w3-button w3-display-topright">&times;</span>
        <h2>Image preview</h2>
      </header>
      <button 
        data-index="${index}" 
        class="close-button close-${index}">
          &times;
      </button>
      <img 
        class="shadow" 
        alt="Output image ${index}" 
        src="${outputImageCanvas.toDataURL("image/jpeg")}"
      />
      <footer class="w3-container w3-black">
      <div style="text-align: center">
        <a 
          class="button download-image-button" 
          download 
          href="${outputImageCanvas.toDataURL("image/jpeg")}
        ">Download Image</a>
      </div>
      </footer>
    </div>
    `
  );
}

export { removePaperStyles, applyPaperStyles, renderOutput };
