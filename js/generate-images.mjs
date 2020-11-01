import {
  applyPaperStyles,
  removePaperStyles,
  renderOutput,
} from "./utils/generate-utils.mjs";
import { createPDF } from "./utils/helpers.mjs";

const pageEl = document.querySelector(".page-a");
const outputImages = [];

async function convertDIVToImage() {
  const options = {
    scrollX: 0,
    scrollY: -window.scrollY,
    scale: document.querySelector("#resolution").value,
  };

  const canvas = await html2canvas(pageEl, options);

  if (document.querySelector("#page-effects").value === "scanner") {
    const context = canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    contrastImage(imageData, 0.55);
    canvas.getContext("2d").putImageData(imageData, 0, 0);
  }

  outputImages.push(canvas);

  if (outputImages.length >= 1) {
    document.querySelector("#output-header").textContent =
      "Output " + "( " + outputImages.length + " )";
  }
}

export async function generateImages() {
  applyPaperStyles();
  pageEl.scrollTo(0, 0);

  const paperContentEl = document.querySelector(".page-a .paper-content");
  const scrollHeight = paperContentEl.scrollHeight;
  const clientHeight = 514;

  const totalPages = Math.ceil(scrollHeight / clientHeight);

  if (totalPages > 1) {
    if (paperContentEl.innerHTML.includes("<img")) {
      alert(
        "You're trying to generate more than one page, Images and some formatting may not work correctly with multiple images" // eslint-disable-line max-len
      );
    }
    const initialPaperContent = paperContentEl.innerHTML;
    const splitContent = initialPaperContent.split(/(\s+)/);

    let wordCount = 0;
    for (let i = 0; i < totalPages; i++) {
      paperContentEl.innerHTML = "";
      const wordArray = [];
      let wordString = "";

      while (
        paperContentEl.scrollHeight <= clientHeight &&
        wordCount <= splitContent.length
      ) {
        wordString = wordArray.join(" ");
        wordArray.push(splitContent[wordCount]);
        paperContentEl.innerHTML = wordArray.join(" ");
        wordCount++;
      }
      paperContentEl.innerHTML = wordString;
      wordCount--;
      pageEl.scrollTo(0, 0);
      await convertDIVToImage();
      paperContentEl.innerHTML = initialPaperContent;
    }
  } else {
    await convertDIVToImage();
  }

  removePaperStyles();
  renderOutput(outputImages);
  setRemoveImageListeners();
}
export const downloadAsPDF = () => createPDF(outputImages);

function setRemoveImageListeners() {
  document
    .querySelectorAll(".output-image-container > .close-button")
    .forEach((closeButton) => {
      closeButton.addEventListener("click", (e) => {
        outputImages.splice(Number(e.target.dataset.index), 1);
        if (outputImages.length >= 0) {
          document.querySelector("#output-header").textContent =
            "Output" +
            (outputImages.length ? " ( " + outputImages.length + " )" : "");
        }
        renderOutput(outputImages);
        setRemoveImageListeners();
      });
    });
}

function contrastImage(imageData, contrast) {
  const data = imageData.data;
  contrast *= 255;
  const factor = (contrast + 255) / (255.01 - contrast);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i + 1] = factor * (data[i + 1] - 128) + 128;
    data[i + 2] = factor * (data[i + 2] - 128) + 128;
  }
  return imageData;
}
