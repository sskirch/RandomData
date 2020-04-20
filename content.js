//content script
var clickedElement;

document.addEventListener("mousedown", function(event){
	//right click
    if(event.button == 2) { 
    	clickedElement = event.target;
    	//alert(clickedElement.value);
    }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//alert(clickedElement.value);
	if(request.action =='appendClickedEl'){
		clickedElement.value = clickedElement.value + request.text;
	} 
  }
);


