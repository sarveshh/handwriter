import { addFontFromFile, formatText } from "./utils/helpers.mjs";
import { generateImages, downloadAsPDF } from "./generate-images.mjs";
import { setInkColor, toggleDrawCanvas } from "./utils/draw.mjs";

const pageEl = document.querySelector(".page-a");

const setTextareaStyle = (attrib, v) => (pageEl.style[attrib] = v);

const EVENT_MAP = {
  "#generate-image-form": {
    on: "submit",
    action: (e) => {
      e.preventDefault();
      generateImages();
    },
  },
  "#handwriting-font": {
    on: "change",
    action: (e) =>
      document.body.style.setProperty("--handwriting-font", e.target.value),
  },
  "#font-size": {
    on: "change",
    action: (e) => setTextareaStyle("fontSize", e.target.value + "pt"),
  },
  "#letter-spacing": {
    on: "change",
    action: (e) => setTextareaStyle("letterSpacing", e.target.value + "pt"),
  },
  "#word-spacing": {
    on: "change",
    action: (e) => setTextareaStyle("wordSpacing", e.target.value + "px"),
  },
  "#top-padding": {
    on: "change",
    action: (e) => {
      document.querySelector(".page-a .paper-content").style.paddingTop =
        e.target.value + "px";
    },
  },
  "#font-file": {
    on: "change",
    action: (e) => addFontFromFile(e.target.files[0]),
  },
  "#ink-color": {
    on: "change",
    action: (e) => {
      document.body.style.setProperty("--ink-color", e.target.value);
      setInkColor(e.target.value);
    },
  },
  "#canvas-background": {
    on: "change",
    action: (e) => {
      document
        .querySelector(".page-a")
        .style.setProperty("--background-img", e.target.value);
      if ($(this).val() != "#fff") {
        $("#hidden-div").show();
      } else {
        $("#hidden-div").hide();
      }
    },
  },
  "#canvas-style": {
    on: "change",
    action: (e) => {
      document
        .querySelector(".page-a")
        .style.setProperty("--background-img", e.target.value);
    },
  },
  "#margin-color": {
    on: "change",
    action: (e) => {
      document
        .querySelector(".margined")
        .style.setProperty("--border-bottom", e.target.value);
    },
  },
  "#paper-margin-toggle": {
    on: "change",
    action: () => {
      if (pageEl.classList.contains("margined")) {
        pageEl.classList.remove("margined");
      } else {
        pageEl.classList.add("margined");
      }
    },
  },
  "#paper-line-toggle": {
    on: "change",
    action: () => {
      if (pageEl.classList.contains("lines")) {
        pageEl.classList.remove("lines");
      } else {
        pageEl.classList.add("lines");
      }
    },
  },
  "#draw-diagram-button": {
    on: "click",
    action: () => {
      toggleDrawCanvas();
    },
  },
  ".draw-container .close-button": {
    on: "click",
    action: () => {
      toggleDrawCanvas();
    },
  },
  "#download-as-pdf-button": {
    on: "click",
    action: () => {
      downloadAsPDF();
    },
  },
  ".page-a .paper-content": {
    on: "paste",
    action: formatText,
  },
};

for (const eventSelector in EVENT_MAP) {
  document
    .querySelector(eventSelector)
    .addEventListener(
      EVENT_MAP[eventSelector].on,
      EVENT_MAP[eventSelector].action
    );
}

document.querySelectorAll(".switch-toggle input").forEach((toggleInput) => {
  toggleInput.addEventListener("change", (e) => {
    if (toggleInput.checked) {
      document.querySelector(
        `label[for="${toggleInput.id}"] .status`
      ).textContent = "on";
      toggleInput.setAttribute("aria-checked", true);
    } else {
      toggleInput.setAttribute("aria-checked", false);
      document.querySelector(
        `label[for="${toggleInput.id}"] .status`
      ).textContent = "off";
    }
  });
});
