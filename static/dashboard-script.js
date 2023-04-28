function loadData(){
    const urlParams = new URLSearchParams(window.location.search);
    var available_storage = urlParams.get('storage');
    for (let i = 0; i < document.getElementsByClassName("dynamic-pie__chart").length; i++) {
        if(document.getElementsByClassName("dynamic-pie__chart")[i].getAttribute("id") == "used"){
            document.getElementsByClassName("dynamic-pie__chart")[i].setAttribute("data-percentage", 100-available_storage.toString())
        } else if(document.getElementsByClassName("dynamic-pie__chart")[i].getAttribute("id") == "available"){
            if(available_storage < 20){
                var styleElem = document.head.appendChild(document.createElement("style"));
                styleElem.innerHTML = "#avail:before {border: solid 20px #bf4a4a;}#avail:after {border: solid 20px #bf4a4a;}";
            }
            document.getElementsByClassName("dynamic-pie__chart")[i].setAttribute("data-percentage", available_storage.toString())

        }
        
    }

    
}


window.onload = loadData();