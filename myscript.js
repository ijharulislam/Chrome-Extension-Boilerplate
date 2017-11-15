var isRunning = false;
var isFinished = false;

function updateProgressbar(){
    var port = chrome.runtime.connect({name: "progressbar"});
    port.postMessage({msg: "progress", isRunning:isRunning, isFinished:isFinished});
}

function startCrawling() {
    
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "start") {
        isRunning = true;
        isFinished = false;
        startCrawling()
    }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg=="download" && allFriends.length>0){
        var filename = 'ProfileInfo-'+profileid+'.csv';
        ExportCSV(allFriends, filename);
    } else if (request.msg=="download") {
        alert("There is no data to downalod.Please click on start button before download");
    }
});

setInterval(function(){ updateProgressbar(); }, 200);
updateProgressbar()

