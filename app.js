const itemDisplay = document.getElementById("item");
var notDone = document.getElementById("list");
var done = document.getElementById("doneList");

//SUBMIT CLICK
document.getElementById("submit").onclick = function(){
    var node = document.createElement("li"); //creates a new list element
    var item = document.getElementById("item").value; //GET THE İNPUT GİVEN BY USER
    var textnode = document.createTextNode(item); 
    
    //CREATE DONE BUTTON
    const doneButton = document.createElement("button");
    doneButton.innerText = "Done";

    //CREATE DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";

    //CREATE VERY IMPORTANT BUTTON
    const veryImportantButton = document.createElement("button");
    veryImportantButton.innerText = "Very Important";

    node.appendChild(textnode); 
    node.appendChild(doneButton);
    node.appendChild(deleteButton);
    node.appendChild(veryImportantButton);
    document.getElementById("list").appendChild(node); //append all to the list


    //DONE BUTTON FCN
    doneButton.addEventListener("click", strikeFcn);
    function strikeFcn(e){      
        node.style.setProperty("text-decoration","line-through");
        //remove unnecessary buttons
        deleteButton.remove(); 
        veryImportantButton.remove();
        doneButton.remove();

        //UNSTRIKE-THROUGH
        const openButton = document.createElement("button");
        openButton.innerText = "Open Again";
        node.appendChild(openButton);
        openButton.addEventListener("click", unstrike);
        function unstrike(e){
            node.style.textDecoration = "none";
            //get back that previous buttons which are necessary now
            node.appendChild(doneButton);
            node.appendChild(deleteButton);
            node.appendChild(veryImportantButton);
            openButton.remove();
        }
    }


    //VERY IMPORTANT BUTTON FCN
    var clickCounter = 0;
    veryImportantButton.addEventListener("click", makeRed);
    function makeRed(){
        clickCounter ++;
        if (clickCounter%2==0){ //if i click it again : make it normal
            node.style.color = "#000000"; //black
            node.style.fontWeight = "normal";
            node.style.setProperty("text-decoration","");
        }
        else{ //at first click : make it important item
        node.style.color = "#00008B";
        node.style.fontWeight = "900"; //bold
        node.style.setProperty("text-decoration"," red wavy underline");
        }
    }


    //DELETE BUTTON FCN
    deleteButton.addEventListener("click", deleteFcn);
    function deleteFcn(e){
        //remove text and other buttons and place this item into the very bottom of the list
        var newItem = "";
        var newTextNode = document.createTextNode(newItem); 
        node.removeChild(textnode); //remove text
        node.appendChild(newTextNode); //append empty string which will make it look like "removed"
        //delete unnecessary buttons
        node.removeChild(deleteButton); 
        node.removeChild(doneButton);
        node.removeChild(veryImportantButton);

        //if user wants that item back (might forgat what he/she has written on that deleted item)
        const getBackButton = document.createElement("button");
        //ADD GET BACK BUTTON if not exists
        if (!node.contains(getBackButton)){
            getBackButton.innerText = "Get Back";
            node.appendChild(getBackButton);
            document.getElementById("list").appendChild(node);
            getBackButton.addEventListener("click", getBack);

            //make that item visible as before
            function getBack(e){
                node.removeChild(getBackButton);//unnecessary now
                node.removeChild(newTextNode); //remove empty string
                node.appendChild(textnode); //get the item's original text again
                //add neccessary buttons as before
                node.appendChild(doneButton);
                node.appendChild(deleteButton);
                node.appendChild(veryImportantButton);   
            } 
        }
    }        
}           


