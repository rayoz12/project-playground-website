//This Module is for testing purposes only and will not be included in the final release of the game

Log = ""
var DOMLog = document.getElementById("LogOutput")//Gets the DOM element 
Logging = new Object();

Logging.Info = function(Message, Bolded)
{
	//THIS DOES NOT WORK ON INTERNET EXPLORER BUT INSTEAD ASSIGNS A NULL/UNDEFINED, as this is not required for the user it will not be a major issue.
	
	var Caller = (new Error).stack;
	//I realise this is a really hacky way to get the line where it was called from. There is no other way to get a trace. The main purpose is to get where the function was called from by generating an error and running a stack trace on it to get the call to this.
	
	//CalledFrom String Manipulation to get only Folder and file name.
	//It does this by splitting the string using "/" deleteing everything before the second last slash then rejoining and outputing
	var CallerSplit = Caller.split("/");
    var Trace = CallerSplit[CallerSplit.length-2] + "/" + CallerSplit[CallerSplit.length-1]
	
	
	if (Bolded === true)
	{
		Log+= "<strong>" + Message + " @" + Trace + "</strong>" +"<br/>" 
	}
	else if (typeof Message === "undefined" && typeof Bolded === "undefined")
	{
		Log+="<br/>"
	}
	else
	{
		Log+= Message + " @" + Trace + "<br/>" 
	}
	Logging.Output()
};

Logging.Error = function (error, CustomMessage)
{
	//This works on IE, Firefox, Chrome(As tested) even though it is non-standard

	Log+= "<strong>" + "Error: " + "</strong>" + error.name + ": "+ error.message  + "<strong>" + ", Occured at: " + "</strong>" + error.stack + "<br/>"
	if (typeof CustomMessage!=="undefined")//If an error message was reported too, this would not be undefined  
	{
		Log+= "<strong>" + "Custom Message: " + "</strong>" + CustomMessage  + "<br/>" + "<br/>"
	}
	Logging.Output()
}

Logging.Output=function() 
{
	DOMLog.innerHTML=Log;//Just displays 'Log' to the DOM
}

Logging.Clear=function() 
{
	Log=""; 
	DOMLog.innerHTML=Log;//Clears 'Log'
	
}

Logging.Info("Loaded Logging.js", false);
