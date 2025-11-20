var script = `
"Hey!"
"It’s a watch."
+ A watch? ->watch
+ What is it for? ->forWhat
===watch===
"Yeah, it’s a watch. It tells the time."
"My father gave it to me. Went through hell and back with him"
+ What is it for? ->forWhat
+ can I have it? ->give
+ It's not vey usefull? ->angry
===forWhat===
"It tells time."
"When to eat, sleep, wake up, work." ->end
===give===
"Sure, take it"
"I cannot tell the time now" ->end
===angry===
"You are very rude"
"Go Away" ->end
===end===
END
`

export var createDialogueEngine = function (script, displayMessage,displayQuestion) {
    var self = {};
    var storyItems=undefined;

    /////////////// Preparation ////////////////
    // transcrire le script en une liste
    var scriptAsList = scriptToList(script);
    function scriptToList(script) {
        return script.split('\n')
    };
    // transposer la liste de textes en objets
    storyItems = toObject(scriptAsList)
    function toObject(scriptAsList) {
        var listOfObjects = [];
        for (let i = 0; i < scriptAsList.length; i++) {
            if (scriptAsList[i][0] == "=") { //if is a scene
                var formatedText = scriptAsList[i].replace("===","").replace("===","");
                listOfObjects.push({s:formatedText});
            }else if (scriptAsList[i][0] == "+"){//if question
                var splitedQuestion  = scriptAsList[i].split('->');
                var formatedQuestion = splitedQuestion[0].substring(1).trim();
                listOfObjects.push({q:formatedQuestion, go:splitedQuestion[1]})
            }else{ //un message
                var splitedMessage = scriptAsList[i].split('->');
                listOfObjects.push({m:splitedMessage[0].trim(), go:splitedMessage[1]});    
            }
        }
        // console.log(listOfObjects);
        return listOfObjects
    }

    /////////////// Traitement ////////////

    function readStory(storyItems) {
        for (let i = 0; i < storyItems.length; i++) {

            if (storyItems[i].m) {
                if (displayMessage) {
                    displayMessage(storyItems[i])
                }
            }else if (storyItems[i].q) {
                if (displayQuestion) {
                    displayQuestion(storyItems[i])
                }
            }else if (storyItems[i].s) {
                return 'waiting for choice'
            }
           
        }
    }

    function start() {
        readStory(storyItems);
    }

    self.start = start;
    return self
};

function displayMessage(data) {
    console.log(data);
    var domElement = document.createElement("div");
    domElement.innerHTML = data.m
    document.body.appendChild(domElement)
}
function displayQuestion(data) {
    console.log(data)
    var domElement = document.createElement("button");
    domElement.innerHTML = data.q
    domElement.style.backgroundColor = 'green';
    domElement.style.display = 'block';
    domElement.style.margin = '2px';
    domElement.style.borderRadius = '5px';
    document.body.appendChild(domElement)
}

// var dialogue = createDialogueEngine(script,displayMessage, displayQuestion )
// dialogue.start()

 