//Js code for spoilers

function Spoiler(element)
{    
    var div = element.parentNode.getElementsByTagName("div")[0];
    if (div.style.display == "none")
        div.style.display = "";
    else
        div.style.display = "none";
}
    