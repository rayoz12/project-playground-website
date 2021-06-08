//**************************CALCULATIONS***************************

Calculations = new Object();
// Drag force: Fd = -1/2 * Cd * A * rho * v * v
Calculations.GetFd = function (CD, a, Rho, Vel) {
	var X = -0.5 * CD * a * Rho * Vel * Vel * (Vel / Math.abs(Vel));
    return X
}

//***********************END CALCULATIONS**************************

Methods = new Object()
Methods.ToRadians = function (Degrees) {
	var Deg = parseInt(Degrees)
	var Rads = Deg*(Math.PI/180)
	return Rads
}

//Taken from Stack Overflow http://stackoverflow.com/a/1527820 on the 6/05/14
Methods.getRandomInt = function (Min, Max) {
	return Math.floor(Math.random() * (Max - Min + 1)) + Min;	
}
	
//*********************Character manipulation code******************
//***********Create Charcters/delete********************************



function AdjustBox()
{	
	for (var i = 0;i<Chars.length;i++) //adjusts mass so that the game acts normal according to physics.
	{
		var Mass = Chars[i].Mass
		var New_Mass = Mass*10000
		Chars[i].Mass = New_Mass
	}
}

AdjustBox()



