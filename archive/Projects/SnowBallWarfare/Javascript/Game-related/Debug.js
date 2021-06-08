//This Module is for testing purposes only and will not be included in the final release of the game

InGameDebug = false

//*************************INITIALISATION**************************
/*
 * 
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, Mass 5
 * beach ball: Mass 0.05, Radius 30
 * lead ball: Mass 10, Restitution -0.05
 */

//******************END INITIALISATION*****************************
//*********************Debug Handler*******************************
function Debug_Output()
{
   	//InGameDebug status
	document.getElementById("InGameDebugStatus").innerHTML=InGameDebug.toString()
	
	//MousePos
	document.getElementById('MouseX').innerHTML = mouse.x
    document.getElementById('MouseY').innerHTML = mouse.y
	
	//BallPos
	if (Balls.length !== 0)
	{
	  document.getElementById('BallX').innerHTML = Math.round(Balls[0].Position.x)
	  document.getElementById('BallY').innerHTML = Math.round(Balls[0].Position.y)
	}
	else
	{
	  document.getElementById('BallX').innerHTML = "<strong>None to Display</strong>"
	  document.getElementById('BallY').innerHTML = "<strong>None to Display</strong>"	
	}
}

function DebugOff()
{
	//Move Debug Buttons from the active buttons to InActivebuttons
	for (var i=Buttons.length-1;i>=0;i--)
	{
		if (Buttons[i].Tag === "Debug")
		{
			MoveElement("Buttons","InactiveButtons",i)
			
		}
	}
	InGameDebug=false
}

function DebugOn()
{
	for (var i=InactiveButtons.length-1;i>=0;i--)
	{
		if (InactiveButtons[i].Tag === "Debug")
		{
			MoveElement("InactiveButtons","Buttons",i)
		}
	}
	InGameDebug=true
}

function ResetChars()
{
	if (InactiveChars.length !== 0)
	{
		for (var r=InactiveChars.length-1;r>=0;r--)
		{
			InactiveChars[r].Health=100;//Health to be modified here because if they go into the active array they will be removed due to 0 health
			MoveElement("InactiveChars", "Chars",  r);
		}
	}
	for (var i=0;i<Chars.length;i++)
	{
		Chars[i].Position.x = Chars[i].OriginalPos.x
		Chars[i].Position.y = Chars[i].OriginalPos.y
	}
}

function ResetBalls()
{
	if (InactiveBalls.length !== 0)
	{
		for (var r=InactiveBalls.length-1;r>=0;r--)
		{
			InactiveBalls[r].Bounces=0
			MoveElement("InactiveBalls", "Balls",  r);
		}
	}
	for (var i=0;i<Balls.length;i++)
	{
		Balls[i].Position.x = Balls[i].OriginalPos.x
		Balls[i].Position.y = Balls[i].OriginalPos.y
		Balls[i].Velocity.x = 0
		Balls[i].Velocity.y = 0
	} 
}

function PrintShapeInfo()
{
	Logging.Info("Position of Boxes and the ball[0].", true)
	Logging.Info("Ball Position X: "+ Balls[0].Position.x)
	Logging.Info("Ball Position Y: "+ Balls[0].Position.y)
	Logging.Info()
	
	for (var i=0;i<Chars.length;i++)
		{
			Logging.Info("Box: " + i + " has position X of: " + Chars[i].Position.x)
			Logging.Info("Box: " + i + " has position Y of: " + Chars[i].Position.y)
			Logging.Info("Box: " + i + " has Rotation of: " + Chars[i].Rotation)
			Logging.Info()
		}
}

function PhysBoxTest()// For the "click for randomness" button
{
		
	  for (var i=0;i<Chars.length;i++)
	  {
		  
		  Chars[i].Velocity.x=Math.random()*10 <5 ? -Math.random()*10 : Math.random()*10
		  Chars[i].Velocity.y=Math.random()*10 <5 ? -Math.random()*10 : Math.random()*10
	  }
	

}
//*********************END Debug Handler***************************





