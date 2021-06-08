//Player Module
//Restitution is the amount of bounciness of the particular object or player, it will be used in the physics module.
//When adjusting restitution if you set < -1 the will bounce higher than it's inital height.
//Be careful when setting restituion above +2 as it can lead to graphical and physics glitches.
//so therefore always keep restituion <0 and > -1 to be safe.
//the lower the number the higher the bounce, higher the number, lower the bounce

Chars = new Array();
InactiveChars = new Array();

function UnloadChars()//Unload the chars to the dead array
{
	for (var i=Chars.length-1;i>=0;i--)
	{					
		MoveElement("Chars","InactiveChars",i)		
	}
}

function DeleteChars()//deletes the chars in the Inactive array
{
	for (var i=InactiveChars.length-1;i>=0;i--)
	{					
		InactiveChars.splice(i,1)		
	}
}

function NewChar(GUI,XPos,YPos,width,height,mass,restitution,drag,colour,health, maxHealth,team)// The GUI argument at the start indicates if the call was made from the web page or programmatically, it is required because the function won't know how to execute properly
{
	//Catch the error if GUI is not defined 	
    if (typeof GUI === "undefined")
    {
	  var error = new ReferenceError("GUI is not defined") 
	  //Logging.Error(error, "Character Creation not successful, Function was called from an unknown location(i.e not GUI nor programatically) and could not execute")
	  throw error
    }	
	if (GUI === true)
	{
		var XPos1 = parseFloat(document.getElementById("NewPosX").value)
		var YPos1 = parseFloat(document.getElementById("NewPosY").value)
		var Mass1 = parseFloat(document.getElementById("NewMass").value)
		var Width1 = parseFloat(document.getElementById("NewWidth").value)
		var Height1 = parseFloat(document.getElementById("NewHeight").value)
		var Restitution1 = parseFloat(document.getElementById("NewRestitution").value)
		var Drag1 = parseFloat(document.getElementById("NewDrag").value)
		var Colour1 = document.getElementById("NewColour").value
		var Health1 = parseFloat(document.getElementById("NewHealth").value)
		var MaxHealth1 = parseFloat(document.getElementById("NewMaxHealth").value)
		var Team1 = document.getElementById("NewTeam").value
		
		var Shape=
		{
		Position: {x:XPos1,y:YPos1},
		OriginalPos: {x:XPos1,y:YPos1},
		Velocity: {x:0,y:0},
		Mass:Mass1,		
		Width:Width1,
		Height:Height1,
		Restitution:Restitution1,
		Props: {Cd:Drag1, A:Width1*Height1},
		Colour:Colour1,
		Health:Health1,
		MaxHealth:MaxHealth1,	
		Team:Team1
		}	
		Chars.push(Shape)
		AdjustBox()
	
	}
	
   if (GUI === false)
   {
	var Shape=
	{
		Position: {x:XPos,y:YPos},
		OriginalPos: {x:XPos,y:YPos},
		Width:width,
		Height:height,
		Velocity: {x:0,y:0},
		Mass:mass,		
		Restitution:restitution,
		Props: {Cd:drag, A:width*height},
		Colour:colour,
		Health:health,
		MaxHealth:maxHealth,	
		Team:team
	}	
	Chars.push(Shape)
	AdjustBox()
	
   }		
}