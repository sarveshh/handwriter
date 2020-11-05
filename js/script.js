$(function () {
  $(document).on("change", ".uploadFile", function () {
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

    if (/^image/.test(files[0].type)) {
      // only image file
      var reader = new FileReader(); // instance of the FileReader
      reader.readAsDataURL(files[0]); // read the local file

      reader.onloadend = function () {
        // set image data as background of div
        //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
        uploadFile
          .closest(".imgUp")
          .find(".imagePreview")
          .css("background-image", "url(" + this.result + ")");
      };
    }
  });
  $("#loading-modal").modal("hide");

  $("#my-form").submit(function (e) {
    e.preventDefault();
    $("#loading-modal").modal("show");
    var formData = new FormData(this);
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "/detect",
      data: formData,
      processData: false,
      contentType: false,
      success: function (r) {
        console.log("result", r);
        document.getElementsByTagName("pre")[0].innerHTML = r.result;
        $("#loading-modal").modal("hide");
      },
      error: function (e) {
        console.log("some error", e);
      },
    });
  });
});

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);

  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied to clipboard";
}
function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

function toggleTheme(toggleButton) {
  if (document.body.classList.contains("dark")) {
    document.body.classList.add("fade-in-light");
    document.body.classList.remove("dark");
    document.body.classList.remove("fade-in-dark");
    window.localStorage.setItem("prefers-theme", "light");
    if (toggleButton) {
      toggleButton.setAttribute("aria-pressed", false);
      toggleButton.setAttribute("aria-label", "Activate Dark Mode");
    }
  } else {
    document.body.classList.add("fade-in-dark");
    document.body.classList.add("dark");
    document.body.classList.remove("fade-in-light");
    window.localStorage.setItem("prefers-theme", "dark");
    if (toggleButton) {
      toggleButton.setAttribute("aria-pressed", true);
      toggleButton.setAttribute("aria-label", "Activate Light Mode");
    }
  }
}

const localPreference = window.localStorage.getItem("prefers-theme");
if (localPreference) {
  if (localPreference === "light") document.body.classList.remove("dark");
  else document.body.classList.add("dark");
} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.body.classList.add("dark");
}

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

$(".workflow-ocr").click(function() {
  $('html,body').animate({
      scrollTop: $("#workflow-ocr").offset().top},
      'slow');
});
$(".workflow-handwrite").click(function() {
  $('html,body').animate({
      scrollTop: $("#workflow-handwrite").offset().top},
      'slow');
});
$(".workflow-draw").click(function() {
  $('#draw-diagram-button').click();
});

$(".scrollbutton-sm").click(function() {
  $('html,body').animate({
      scrollTop: $("#workflow-sm").offset().top},
      'slow');
});
