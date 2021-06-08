var TurnBasedSpeed = 500
Waiting = false

GameWon = false
GameLost = false

PlayerTurn = true
AITurn = false
//Use of two flags to indicate turn also allows opportunity to run some actions between the turns. 

FirstTurn = true
HasFired = false//If the play has fired already, used in the mouse event to signify if it should run LaunchBall() again, which it shouldn't.

PlayerList = new Array();
AIList = new Array();



function TurnBasedManager()
{
	getTeamList();
	
	if(typeof LevelCoolDownCompleted !== 'undefined')//On First Run LevelCoolDownCompleted will be undefined, simply to counter this
	{
		GameOverCheck();
	}
	
	if (AITurn)
	{
		if (!Waiting)// Checks if the AI module has been run already
		{
			AIMain()
			Waiting = true
		}
		if (Balls.length === 0 && Waiting)//Wait for the ball to move to the dead ball array, then finish player's turn.
		{
			PlayerTurn = true
			//Logging.Info("Changing AI to Player, Player=" + PlayerTurn, true)
			Waiting = false
			AITurn = false
		}
		
	}
	
	if (PlayerTurn)
	{
		if (!FirstTurn)
		{
			if (InactiveBalls.length !== 0 && Waiting)//Wait for the ball to move to the dead ball array, then finish player's turn.
			{
				PlayerTurn = false
				//Logging.Info("Changing Player to AI", true)
				AITurn = true //can be moved later to run some actions between the turns
				Waiting = false
				HasFired = false
			}
		}
		
		if(Balls.length === 0 && !Waiting && PlayerTurn)
		{
			for (var r = InactiveBalls.length-1;r>=0;r--)
			{
				InactiveBalls[r].Bounces = 0
				InactiveBalls[r].Velocity.x = 0
				InactiveBalls[r].Velocity.y = 0	
				InactiveBalls[r].Position.x = Chars[PlayerList[PlayerList.length-1]].Position.x + Chars[PlayerList[PlayerList.length-1]].Width + 10
				InactiveBalls[r].Position.y = Chars[PlayerList[PlayerList.length-1]].Position.y + Chars[PlayerList[PlayerList.length-1]].Height - 20
				MoveElement("InactiveBalls", "Balls", r)	
				//Logging.Info("Place Ball")	
			}
			Waiting = true
			if (PlayerList.length !== 0)
			{
				var LastPlayerAvail = PlayerList[PlayerList.length-1]//Simply selects the last player available in the alive Player List
				Balls[0].Position.x = Chars[LastPlayerAvail].Position.x + Chars[LastPlayerAvail].Width
			}
		}
		FirstTurn = false						
	}	
	
	//Check if balls have more than 3 bounces and must be moved to dead array
	DeadBallsCheck()

}


function DeadCharsCheck()
{
	//Move Dead players
	for (var i=0;i<Chars.length;i++)
	{		
		if (Chars[i].Health<=0)
		{			
			MoveElement("Chars","InactiveChars",i)
		}
	}	
}

function DeadBallsCheck()
{
	if (Balls.length !== 0)
	{
		for (var i=Balls.length-1;i>=0;i--)//from bottom to top loop, for the MoveElement function
		{
			if (Balls[i].Bounces >= 3)
			{
				//Logging.Info("Moved Ball, Bounces = " + Balls[i].Bounces)
				MoveElement("Balls", "InactiveBalls", i)
				
			}
		}
	}
}

function CharCollision(Char, Ball)
{
	Balls[Ball].Bounces += 1;			
	HealthLost = Math.abs(Balls[0].Velocity.x)/0.15; //You can change this to increase/decrease health lost by ball impact. Higher vals mean less health lost on impact 
	Chars[Char].Health -= HealthLost;
	//Logging.Info("Char: "+ Char +", " + Chars[Char].Health + ", Lost: " + HealthLost + ", Vel: " + Balls[Ball].Velocity.x);

}

function getTeamList()// gets the list of alive Player and AI chars
{
	//This While block of code for both of the arrays clears the arrays
	//While this proves a more unreadabile way of coding it provides better performace than other methods of clearing arrays
	while (PlayerList.length > 0)
	{
		PlayerList.pop();//the .pop() method removes the last element of an array
	}
	while (AIList.length > 0)
	{
		AIList.pop();
	}
	
		
	for (var i = 0;i<Chars.length;i++)//get list of the ALIVE player chars
	{
		if (Chars[i].Team === "Player")
		{
			PlayerList.push(i)
		}
		
		if (Chars[i].Team === "AI")
		{
			AIList.push(i)
		}
	}
}

function GameOverCheck()
{
	if(LevelCoolDownCompleted)
	{
		if (PlayerList.length === 0 && MainGame.State === "Ready")//All players dead, AI wins
		{
			if (MainGame.Level === LevelList[LevelList.length-1] )//Check if it the last Level
			{
				GameOver("AI");
				MainGame.State = "Finished"
				MainGame.Destroy()
			}
			else
			{
				LevelCoolDownCompleted = false
				var CurrentLevel = MainGame.Level
				MainGame.State = "Finished"
				MainGame.Destroy()
				//Initalise a new game
				MainGame = new Game("Prep", CurrentLevel+1, false)
				MainGame.Start()
			}
			
		}
		if (AIList.length === 0 && MainGame.State === "Ready")//All AI dead, Players win
		{
			if (MainGame.Level === LevelList[LevelList.length-1] )//Check if it the last Level
			{
				GameOver("Player");
				MainGame.State = "Finished"
				MainGame.Destroy()
			}
			else
			{
				LevelCoolDownCompleted = false
				var CurrentLevel = MainGame.Level
				MainGame.State = "Finished"
				MainGame.Destroy()
				//Initalise a new game
				MainGame = new Game("Prep", CurrentLevel+1, false)
				MainGame.Start()
			}
		}
	}	
}

function GameOver(Winner)
{
	if (Winner === "Player")
	{
		GameWon = true
	}
	if (Winner === "AI")
	{
		GameLost = true
	}
	
}
