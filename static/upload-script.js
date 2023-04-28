function uploadFolder() {
  var folderInput = document.getElementById("upload");
  var progressBar = document.getElementById("progressBar");
  var xhr = new XMLHttpRequest();
  const urlParams = new URLSearchParams(window.location.search);
  const passwd = urlParams.get('pwd');
  xhr.open("POST", "/handler/?pwd="+passwd);
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total * 100;
      console.log(event.loaded / event.total * 100)
      progressBar.style.visibility = "visible";
      document.getElementsByClassName("bar")[0].style.width = (percentComplete).toString() + "%";

    }
  };
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("status").innerHTML = "Folder uploaded successfully";
    } else {
      document.getElementById("status").innerHTML = "Folder upload failed";
    }
  };
  var formData = new FormData();
  formData.append("folder", folderInput.files);
  xhr.send(formData)
}

function uploadFile() {
  var fileInput = document.getElementById("upload");
  var progressBar = document.getElementById("progressBar");
  var xhr = new XMLHttpRequest();
  const urlParams = new URLSearchParams(window.location.search);
  const passwd = urlParams.get('pwd');
  xhr.open("POST", "/handler/?pwd="+passwd);

  // Set up progress bar
  xhr.upload.onprogress = function (event) {
    if (event.lengthComputable) {
      var percentComplete = event.loaded / event.total * 100;
      console.log(event.loaded / event.total * 100)
      progressBar.style.visibility = "visible";
      document.getElementsByClassName("bar")[0].style.width = (percentComplete).toString() + "%";
    }
  };

  xhr.onload = function () {
    if (xhr.status === 200) {
      document.getElementById("status").innerHTML = "Files uploaded successfully";
    } else if (xhr.status === 500) {
      var response = JSON.parse(xhr.responseText);
      var originalFileName = fileInput.files[0].name;
      var extensionIndex = originalFileName.lastIndexOf(".");
      var extension = originalFileName.substring(extensionIndex);
      var fileNameWithoutExtension = originalFileName.substring(0, extensionIndex);
      var newFileName = prompt("Another file with the same name already exists. Please enter a new file name.");
      if (newFileName) {
        newFileName = newFileName + extension;
        var formData = new FormData();
        for (var i = 0; i < fileInput.files.length; i++) {
          formData.append("file", fileInput.files[i], newFileName);
        }
        const urlParams = new URLSearchParams(window.location.search);
        const passwd = urlParams.get('pwd');
        xhr.open("POST", "/handler/?pwd="+passwd);
        xhr.send(formData);
      } else {
        document.getElementById("status").innerHTML = "File upload cancelled";
      }
    } else {
      document.getElementById("status").innerHTML = "File upload failed";
    }
  };

  // Loop through files and append to FormData object
  var formData = new FormData();
  for (var i = 0; i < fileInput.files.length; i++) {
    formData.append("file", fileInput.files[i]);
  }
  xhr.send(formData);
}



$(document).ready(function() {
  $(".drop .option").click(function() {
    var val = $(this).attr("data-value"),
        $drop = $(".drop"),
        prevActive = $(".drop .option.active").attr("data-value"),
        options = $(".drop .option").length;

    $drop.find(".option.active").addClass("mini-hack");
    $drop.toggleClass("visible");
    $drop.removeClass("withBG");
    $(this).css("top");
    $drop.toggleClass("opacity");
    changeMode(this.getAttribute("data-value"))
    $(".mini-hack").removeClass("mini-hack");
    if ($drop.hasClass("visible")) {
      setTimeout(function() {
        $drop.addClass("withBG");
      }, 400 + options*100); 
    }
    triggerAnimation();
    if (val !== "placeholder" || prevActive === "placeholder") {
      $(".drop .option").removeClass("active");
      $(this).addClass("active");
    };
  });
  
  function triggerAnimation() {
    //var finalWidth = $(".drop").hasClass("visible") ? 22 : 20;
    $(".drop").css("width", "7.5em");
    setTimeout(function() {
      $(".drop").css("width", 7.5 + "em");
    }, 400);
  }
});

function changeMode(value){
  const upload_elem = `<input type="file" id="upload" name="upload" style="visibility: hidden;" onchange="uploadFile()">`
  if(value == "folder"){
    document.getElementById("uploader").style.visibility = "visible";
    document.getElementById("upload").outerHTML = upload_elem.slice(0, -1)+" webkitdirectory directory multiple"+">"

  } else if(value == "file"){
    document.getElementById("uploader").style.visibility = "visible";
    document.getElementById("upload").outerHTML = upload_elem.slice(0, -1)+" multiple"+">"

  }
}

function setupEnv(){
  document.getElementById("progressBar").style.visibility = "hidden"
  document.getElementById("status").innerHTML = ""

}