function loadFiles(){
    var _files = document.getElementsByTagName("data")[0].getAttribute("data-files");
    if(_files == "[]"){
        document.getElementById("inf").style.visibility = "visible";
        return;
    }
    var files = JSON.parse(_files.replace(/'/g, "\""));
    for (let i = 0; i < files.length; i++) {
        if(i > 31){
            document.getElementById("infr").style.visibility = "visible"
            break
        }
        if(files[i].length > 17){
            
            createFiles(files[i].substr(0,10)+"…"+files[i].substr(files[i].length - 5), files[i])

        } else {
            createFiles(files[i], files[i])
        }
        

    }
    /*
    for (let i = 0; i < 24; i++) {
        createFiles(files[i])
    }
    */

}
function downloadFile(element){
    var str = window.location.toString(),
    delimiter = '/',
    start = 3,
    tokens = str.split(delimiter).slice(start),
    result = tokens.join(delimiter);

    const urlParams = new URLSearchParams(window.location.search);
    var passwd = urlParams.get('pwd');
    
    window.open(window.location.toString().replace(result, "")+"download/?file="+element.getAttribute("data-name")+"&pwd="+passwd)

}
function createFiles(text, original){
    if(document.getElementsByClassName("container").length % 4 == 0){
        var div = document.createElement("div");
        div.className = "contain";
        maths = (-18)+(document.getElementsByClassName("contain").length)*3
        div.setAttribute("style", "top: "+maths+"vh;position: relative;")
        var container = document.createElement("div");
        container.className = "container";
        container.setAttribute("data-name", original)
        container.setAttribute("onclick", "downloadFile(this)")
        div.appendChild(container);
        var name = document.createElement("p");
        name.innerHTML = text;
        container.appendChild(name);
        if(name.innerHTML.includes(".")){
            container.appendChild(new Image()).src = "../static/file.png";

        } else {
            container.appendChild(new Image()).src = "../static/folder.png";

        }
        document.body.appendChild(div);
        
    } else {
        div = document.getElementsByClassName("contain")[document.getElementsByClassName("contain").length-1]
        var container = document.createElement("div");
        container.className = "container";
        container.setAttribute("data-name", original)
        container.setAttribute("onclick", "downloadFile(this)")
        div.appendChild(container);
        var name = document.createElement("p");
        name.innerHTML = text
        container.appendChild(name);
        if(name.innerHTML.includes(".")){
            container.appendChild(new Image()).src = "../static/file.png";

        } else {
            container.appendChild(new Image()).src = "../static/folder.png";

        }

    }

}


window.onload = loadFiles();