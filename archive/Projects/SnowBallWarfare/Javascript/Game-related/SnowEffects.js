//Code based off http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect?s=rl
//Code is adapted to suit this environment more.

//The Code works by using an array called Snow
SnowParticles = new Array();
xGraphPos = 0.00

function Snow(Particles)//You can vary Intensity by changing the amount of particles
{
	this.Particles = Particles
	this.Setup();
}

Snow.prototype.Setup = function () {
	for(var i=0;i<this.Particles;i++)
	{
		SnowParticles.push({
			Position: {x:Math.random()*Canvas.width, y:Math.random()*Canvas.height},
			Radius: Math.random()*4+1,
			Mass: Math.random()*this.Particles								
		});
	}
}

Snow.prototype.Tick = function () {
	xGraphPos += 0.001
	
	for(var i=0;i<this.Particles;i++)
	{
		//Update Positions
		//Y Pos
		SnowParticles[i].Position.y += Math.cos(xGraphPos+SnowParticles[i].Mass) + (SnowParticles[i].Radius/2) + 1;
		//X Pos
		SnowParticles[i].Position.x += Math.sin(xGraphPos) * 2;
		
		//Check if any snow has exceeded the boundaries of the canvas
		//Below the canvas
		if(SnowParticles[i].Position.x > Canvas.width || SnowParticles[i].Position.x < 0 || SnowParticles[i].Position.y > Canvas.height )
		{
			if(i%12 > 0) //66.67% of the flakes
			{
				SnowParticles[i].Position.x = Math.random()*Canvas.width 
				SnowParticles[i].Position.y = -10
			}
			else
			{
				//If the flake is exitting from the right
				if(Math.sin(xGraphPos) > 0)
				{
					//Enter from the left
					SnowParticles[i].Position.x = 0 
					SnowParticles[i].Position.y = Math.random()*Canvas.height
				}
				else
				{
					//Enter from the right
					SnowParticles[i].Position.x = Canvas.width 
					SnowParticles[i].Position.y = Math.random()*Canvas.height
				}
			}
		
		}
	}	
}

SnowEnv = new Snow(200)
