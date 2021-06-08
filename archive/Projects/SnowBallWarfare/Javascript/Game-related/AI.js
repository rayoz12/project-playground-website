var OldHealth = new Array();
var AIFirstLaunch = true

var Angle = 0
var Power
function AIMain()
{	
	AIAim();
	OldHealthUpdater();
}

function AIAim()
{		
	if (AIFirstLaunch)
	{
		//Just take a blind shot and get distance to player
		Angle = Methods.getRandomInt(80, 100); //This function is defined in the methods.js file
		Power = Methods.getRandomInt(60, 100);
		AIFire(Angle, Power)
		FirstLaunch = false
		return;
	}
	//Get distance from ball deletetion to Player and determine to increase and decrease power

	//Tests if the ball has hit the player, by checkign their health. If it has don't change the power level.
	if (OldHealth[PlayerList[0]] > Chars[PlayerList[0]].Health)
	{
		Power = Power
	}
	else if ((InactiveBalls[0].Position.x - Chars[PlayerList[0]].Position.x) > 0) //Simply targets the first Player(Char) and tests distance. If the Distance is greater than 0 then it must mean that the ball fell short on the contrary if it is negative that must of overshot the Character 
	{
		Power+=10;
	}
	else//assume that the ball overshot the player and that power must be toned down.
	{
		Power-=10
	}
	AIFire(Angle, Power)
}

function AIFire(angle, power)
{
	for (var i = InactiveBalls.length-1; i>= 0; i--)
	{
		InactiveBalls[i].Bounces = 0
		InactiveBalls[i].Position.x = Chars[AIList[AIList.length-1]].Position.x - 10
		InactiveBalls[i].Position.y = Chars[AIList[AIList.length-1]].Position.y + Chars[AIList[AIList.length-1]].Height
		MoveElement("InactiveBalls", "Balls", i)
		LaunchBall("AI", AIList[AIList.length-1], angle, power)
	}
}


function OldHealthUpdater()//Update OldHealth array with OldHealth
{
	while (OldHealth.length > 0)//Empty the array 
	{
		OldHealth.pop();
	}
	for (var i = 0;i<PlayerList.length;i++)
		{
			OldHealth.push(health = {
				PlayerChar: i,
				Health: Chars[PlayerList[i]].Health
			});
		}	
}
