LevelCooldownCompleted = false 
Paused = false
LevelList = [1,2,3,4,5,6]

function Game(State, Level, FirstBoot)
{
	this.State = State
	this.Level = Level
	this.FirstBoot = FirstBoot
	
	switch(this.Level)
	{
		case 1: BackgroundIMG.src = "Assets/Images/Background_Day.png"
			break;
		case 2: BackgroundIMG.src = "Assets/Images/Background_Day.png"
			break;
		case 3: BackgroundIMG.src = "Assets/Images/Background_Sunset.png"
			break;
		case 4: BackgroundIMG.src = "Assets/Images/Background_Sunset.png"
			break;
		case 5: BackgroundIMG.src = "Assets/Images/Background_Night.png"
			break;
		case 6: BackgroundIMG.src = "Assets/Images/Background_Night.png"
			break;
		default: BackgroundIMG.src = "Assets/Images/Background_Day.png"
	}
	
	//Turn Based reset
	PlayerTurn = true
	AITurn = false
	AIFirstLaunch = true
	FirstTurn = true
}

Game.prototype.Start = function() {

	if(this.State === "Prep")
	{	
		console.log("Pushing Buttons")
		Buttons.push(button = 
		{
			Position: {x:(Canvas.width - 150), y: 10},
			Width: 100,
			Height: 25,
			Colour:"#00FFFF", //Light Blue
			Hover: "#0099FF", //Dark Blue
			TextColour:"#000000",
			Text:"Pause or Esc",
			onClick:function() {PauseToogle();},
			Tag:"GUI",
			ID:"PauseToogle",
		});
		Buttons.push(button = 
		{
			Position: {x:(Canvas.width - 150), y: 40},
			Width: 100,
			Height: 25,
			Colour:"#00FFFF", //Light Blue
			Hover: "#0099FF", //Dark Blue
			TextColour:"#000000",
			Text:"Mute/Unmute",
			onClick:function() {SoundsToogle();},
			Tag:"GUI",
			ID:"SoundToogle",
		});
		
		LoadLevel(this.Level)
		TurnBasedLoop = setInterval("TurnBasedManager()", TurnBasedSpeed)
		PhysicsLoop = setInterval("Physics()",SimSpeed)//best values to get a good framerate going 650/40, Smaller is faster the frames and larger is slower
				
		if (!Muted)
		{
			BackgroundTrack.Play();
		}
		LevelCoolDown()
		this.State = "Ready"
	}	
		MainMenu.Destroy()
}

Game.prototype.Pause = function() {
	clearInterval(PhysicsLoop);
	clearInterval(TurnBasedLoop);
	BackgroundTrack.Pause()
}

Game.prototype.Play = function() {
	PhysicsLoop = setInterval("Physics()",SimSpeed);
	TurnBasedLoop = setInterval("TurnBasedManager()", TurnBasedSpeed);
	if (!Muted)
	{
		BackgroundTrack.Play();
	}
}

Game.prototype.Destroy = function () {
	clearInterval(PhysicsLoop);
	clearInterval(TurnBasedLoop);
	BackgroundTrack.Pause();
	UnloadChars()
	DeleteChars()
	for (var i=Balls.length-1;i>=0;i--)//Unload all the balls
	{
		MoveElement("Balls", "InactiveBalls", i)
	}
	for (var j=Blocks.length-1;j>=0;j--)
	{
		Blocks.splice(j, 1)
	}
	MoveElement("Buttons", "InactiveButtons", getButtonByID("PauseToogle"))
	MoveElement("Buttons", "InactiveButtons", getButtonByID("SoundToogle"))

}

function LoadLevel(Level)//This inserts a Javascript file into the body, which will immediately executed. All the files hold is to add new Chars and World Objects to the game. Datatype of Level is an Int.
{
	try//The reason for the try is that sometimes when multiple levels have been played on the same canvas and this code tries to look for it it comes up with a null for the Element, this stops the game in its tracks. The try just catches the error when that happens and lets the game go on.
	{
		if(MainGame.Level !== 1)
		{
			//This is to remove the last level played by the user from the page. There is no need to keep level scripts on the page becuase after they have executed they are useless. 
			var Element = document.getElementById("Level" + (MainGame.Level - 1) )
			Element.parentNode.removeChild(Element)
		}
	}
	catch(e)
	{
		console.log("Caught previous level element null error")
	}

	var LevelJS = document.createElement("script");
	LevelJS.id = "Level" + Level
	LevelJS.src = "Javascript/Levels/Level" + Level + ".js"
	document.body.appendChild(LevelJS)	
}

function PauseToogle()
{
	if (MainGame.State !== "Main Menu") 
	{
		if (Paused)
		{
			MainGame.Play()
			Paused = false
			PauseMenu.Destroy()
		} 
		else if (!Paused) 
		{
			MainGame.Pause()
			Paused = true
			PauseMenu = new Menu("Pause Menu", "Vertical", PauseMenuList, "Active")
		} 
	}
}

function SoundsToogle()
{
	if (Muted)
	{
		Muted = false
		BackgroundTrack.Play()
	}
	else if (!Muted)
	{
		Muted = true
		BackgroundTrack.Pause();
	}
}

//Sometimes when playing on a slow connection the browser can't load everything fast enough and the turn based module thinks that because there are no Player or AI Chars left that must mean the game is over. This is set in place to prevent the levels from switching too fast.
function LevelCoolDown()
{
	LevelCooldownTimer = setTimeout(function () { LevelCoolDownCompleted = true }, 5000)
}


MainGame = new Game("Main Menu", 1, true)