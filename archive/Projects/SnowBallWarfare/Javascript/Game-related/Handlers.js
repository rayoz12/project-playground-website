//------------------Keyboard Handlers -----------------------------
document.onkeydown = function(e) {
	
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 27: PauseToogle();
		break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

//*******************MOUSE HANDLERS********************************

mouse = 
{
    x: 0,
    y: 0,
    isActive: false
};


function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}


var mouseDown = function (e) {
    if (e.which == 1) {
		if (Loading)
		{
			return
		}

        getMousePosition(e);	
		OnButton()
		if (ButtonHovering)
		{
			Buttons[ButtonIndex].onClick()//ButtonIndex is a variable set in the onButton 
			return // if the button is clicked it stops execution of function and returns
		}
				if (AITurn === true)//Disable ball manipulation when it's the computer's turn
		{
			return
		}

		if (Balls.length !== 0 && HasFired === false)
		{
			LaunchBall("Player")
			HasFired = true
		}
		else if (Balls.length === 0)
		{
			var error = new Error("There are no balls on screen at the moment hence none to launch")
			//Logging.Error(error)
			throw error
		}
		
    }
}


var mouseUp = function (e) {
    if (e.which == 1) {
		if(ButtonHovering)
		{			
			return
		}
		else
		{
        mouse.isActive = false;
		}
    }
}
//**********************END MOUSE HANDLERS*************************


function Mouse_Checks() 
{
    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
}

function OnButton()
{
	ButtonHovering=false
	for (var i=0;i<Buttons.length;i++)
		{
			if (mouse.x >= Buttons[i].Position.x && mouse.x <= Buttons[i].Position.x+Buttons[i].Width)
			{
				if (mouse.y >= Buttons[i].Position.y && mouse.y <= Buttons[i].Position.y+Buttons[i].Height)
				{
					ButtonHovering=true
					ButtonIndex=i // this only works when one button is pressed at a time, in my game though i'm not expecting more than one button pressed at a time.
				}
			}
		}
}

function LaunchBall(Character, AIChar,  Angle, Power)//Helps to determine if the Player launched the ball or the AI initiated this function. Angle and Power are exclusive to the AI part of the function, they will never work for the player as it relies on the mouse. All params are numbers except for Char which is a string.
{
	if (Character !== "Player" && Character !== "AI")
	{
		var error = new Error("Parameter is neither Player nor AI, the function could not execute"); 
		//Logging.Error(error, "The parameter passed was: " + Character);
		throw error;
	}
	else if (Character === "Player")
	{
		for (var r=0;r<Balls.length;r++)
		{
			mouse.isActive = true;
			Balls[r].Velocity.x = (mouse.x - Balls[r].Position.x)/ 10 ;	//The "30" is there to provide somesort of regulator as to the speed of the ball
			Balls[r].Velocity.y =(mouse.y - Balls[r].Position.y)/ 5; //val 25
			mouse.isActive = false
			//With these settings ^^^^ the ball will always go through the mouse at where the ball was launched
		}
	}
	else if (Character === "AI")
	{
		//To decide the angle and power that will be displayed on screen I will be using an imaginary right angle triangle, only the base will be power and height will be sin(Angle) TIMES a certain number, once these two are calculated the ball will launch in the direction of the hypotenuse. The Velocity will be the length of the hypotenuse.
		for (var u=0;u<Balls.length;u++)
		{
			var Height = Power * Math.tan(Angle)
			//Get the Points on the canvas now. All points are relative to each other with Angle point relative to the AIChar calling this function. PowerPoint is the end of the line from the AnglePoint
			AnglePoint = {x:Chars[AIChar].Position.x-10, y:Chars[AIChar].Position.y}
			PowerPoint = {x:AnglePoint.x-Power, y:AnglePoint.y}
			HypEndPoint = {x:PowerPoint.x, y:PowerPoint.y+Height}
			//Get the length of the Hypotenuse, using Point 1 as HypEndPoint and Point 2 as AnglePoint
			Balls[u].Velocity.x = (HypEndPoint.x - AnglePoint.x)/8;// "10" is a regulator of it's speed applies to the y Velocity as well.
			Balls[u].Velocity.y = (HypEndPoint.y - AnglePoint.y)/8;			
		}
		
	}	
}


