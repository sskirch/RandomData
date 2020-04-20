
var parent = chrome.contextMenus.create({"title": "Random Data", "contexts" : ["editable"]});

var child1 = chrome.contextMenus.create( {"title": "Word", "parentId": parent, "id" : "word", "contexts" : ["editable"], "onclick": randomDataClick});

var child2 = chrome.contextMenus.create(
		  {"title": "Phrase", "parentId": parent, "id" : "phrase", "contexts" : ["editable"], "onclick": randomDataClick});

var child3 = chrome.contextMenus.create(
		  {"title": "Sentence", "parentId": parent, "id" : "sentence", "contexts" : ["editable"], "onclick": randomDataClick});

var child4 = chrome.contextMenus.create(
		  {"title": "Paragraph", "parentId": parent, "id" : "paragraph", "contexts" : ["editable"], "onclick": randomDataClick});

var child5 = chrome.contextMenus.create(
		  {"title": "Page", "parentId": parent, "id" : "page", "contexts" : ["editable"], "onclick": randomDataClick});

var child6 = chrome.contextMenus.create(
		  {"title": "Integer", "parentId": parent, "id" : "integer", "contexts" : ["editable"], "onclick": randomDataClick});

var child7 = chrome.contextMenus.create(
		  {"title": "Real Number", "parentId": parent, "id" : "real", "contexts" : ["editable"], "onclick": randomDataClick});

var child8 = chrome.contextMenus.create(
		  {"title": "Money", "parentId": parent, "id" : "money", "contexts" : ["editable"], "onclick": randomDataClick});

var child8 = chrome.contextMenus.create(
		  {"title": "Unicode", "parentId": parent, "id" : "unicode", "contexts" : ["editable"], "onclick": randomDataClick});


function randomDataClick(info, tab) {
	if(info.menuItemId=='word'){
		sendMetaphorpsum(tab.id, tab.id,1,1,1);
	} else if (info.menuItemId=='phrase') {
		sendMetaphorpsum(tab.id, 1,1,4);
	}else if (info.menuItemId=='sentence') {
		sendMetaphorpsum(tab.id,1,1);
	}else if (info.menuItemId=='paragraph') {
		sendMetaphorpsum(tab.id, 1,4);
	}else if (info.menuItemId=='page') {
		sendMetaphorpsum(tab.id, 4,5);
	}else if (info.menuItemId=='integer') {
		data = Math.floor(Math.random() * 1000)
		chrome.tabs.sendMessage(tab.id, {action: 'appendClickedEl', text: data}); 
	}else if (info.menuItemId=='real') {
		data = Math.floor(Math.random() * 1000) + Math.random();
		chrome.tabs.sendMessage(tab.id, {action: 'appendClickedEl', text: data}); 
	}else if (info.menuItemId=='money') {
		data = Math.floor(Math.random() * 1000) + Math.random();
		data = data.toFixed(2);
		chrome.tabs.sendMessage(tab.id, {action: 'appendClickedEl', text: data});
	}else if (info.menuItemId=='unicode') {
		chrome.tabs.sendMessage(tab.id, {action: 'appendClickedEl', text: '𐌼𐌰𐌲 𐌲𐌻𐌴𐍃 𐌹̈𐍄𐌰𐌽, 𐌽𐌹 𐌼𐌹𐍃 𐍅𐌿 𐌽𐌳𐌰𐌽 𐌱𐍂𐌹𐌲𐌲𐌹𐌸!'}); 
	}
}

function sendMetaphorpsum(tabId, numberOfParagraphs = 1, numberOfSentences = 1, numberOfWords = 0) {
	var url = 'http://metaphorpsum.com/paragraphs/' + numberOfParagraphs +  '/' + numberOfSentences	
	$.ajax({  
        url: url,  
        type: 'GET',  
        success: function (data, textStatus, xhr) {  
        	if (numberOfWords > 0){
        		sentence = data.split(' ');
        		data = '';
        		for (var i = 0; i < sentence.length; i++) {
        			if (sentence[i].length > 3){
        				data += sentence[i] + ' '
        				numberOfWords -= 1
        			} 
        			if(numberOfWords==0){
        				break;
        			}
        		}
        	}
        	chrome.tabs.sendMessage(tabId, {action: 'appendClickedEl', text: data});  
        	
        },  
        error: function (xhr, textStatus, errorThrown) {  
            console.log('Error in Operation');  
        }  
    });  
}


