function authenticateFrame(frame){
    const urlParams = new URLSearchParams(window.location.search);
    var passwd = urlParams.get('pwd');
    document.getElementById("frame").src = "./"+frame+"/?pwd="+passwd;
}

function changeFrame(element){
    if(element.getAttribute("class").split("-")[0] == "dashboard"){
        authenticateFrame("dashboard")
    } else if(element.getAttribute("class").split("-")[0] == "files"){
        authenticateFrame("files")
    } else if(element.getAttribute("class").split("-")[0] == "upload"){
        authenticateFrame("upload")
    } 
}

authenticateFrame("dashboard")