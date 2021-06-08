var Time = 1 / 40; // Seconds, used in formulas
var Friction = 0.2//friction; smaller values result in more frictioned surfaces.
SimSpeed = 16.25//Smaller is faster the frames, and larger is slower default is 16.25(650/40)

function Physics()
{
	if (!mouse.isActive) 
	{
		if (Balls.length !== 0)
		{
		  for (var r=0;r<Balls.length;r++)
		  {
			var Forcex = Calculations.GetFd(Balls[r].Props.Cd, Balls[r].Props.A, rho, Balls[r].Velocity.x)
			var Forcey = Calculations.GetFd(Balls[r].Props.Cd, Balls[r].Props.A, rho, Balls[r].Velocity.y)
			
			Forcex = (isNaN(Forcex) ? 0 : Forcex);//Question mark is a decision i.e If Forcex == NaN, THEN(line before : ) Forcex=0  ELSE(After : ) Forcex=Forcex
			Forcey = (isNaN(Forcey) ? 0 : Forcey);
			// Calculate acceleration ( F = ma )
			var accx = Forcex / Balls[r].Mass;
			var accy = accg + (Forcey / Balls[r].Mass);
			// Integrate to get Velocity
			Balls[r].Velocity.x += accx * Time;
			Balls[r].Velocity.y += accy * Time;
			// Integrate to get position
			Balls[r].Position.x += Balls[r].Velocity.x * Time * 100;
			Balls[r].Position.y += Balls[r].Velocity.y * Time * 100;
		  }
		}
	}
	//CALCULATIONS FOR THE BOXES
	if (Chars.length!==0)
	{
	  for (var i=0;i<Chars.length;i++)
	  {
		var Forcex = Calculations.GetFd(Chars[i].Props.Cd, Chars[i].Props.A, rho, Chars[i].Velocity.x)
		var Forcey = Calculations.GetFd(Chars[i].Props.Cd, Chars[i].Props.A, rho, Chars[i].Velocity.y)
		Forcex = (isNaN(Forcex) ? 0 : Forcex);
		Forcey = (isNaN(Forcey) ? 0 : Forcey);
		// Calculate acceleration ( F = ma )
		var accx = Forcex / Chars[i].Mass;
		var accy = accg + (Forcey / Chars[i].Mass);
		// Integrate to get Velocity
		Chars[i].Velocity.x += accx * Time;
		Chars[i].Velocity.y += accy * Time;
		// Integrate to get position
		Chars[i].Position.x += Chars[i].Velocity.x * Time * 100;
		Chars[i].Position.y += Chars[i].Velocity.y * Time * 100;
		
		
		//Misc Checks for boxes
		if(Chars[i].Position.y+Chars[i].Height>Canvas.height)
		{
			Chars[i].Velocity.x*=Friction
		}
	  }
	}
		
	CollisionsMain()
	
	
}

//Physics loop/step

/***********************COLLISION CHECKS**************************/

function CollisionsMain()
{
    OutofBounds()
    BoxColCheck()
	BlockBallCol()
}
function OutofBounds()
//check if ball is out of bounds
{
	if (Balls.length !== 0)
		{
		  for (var r=0;r<Balls.length;r++)
		  {
			if (Balls[r].Position.y > Canvas.height - Balls[r].Radius) {
				//check if the ball is below the canvas
				Balls[r].Velocity.y *= Balls[r].Restitution;
				Balls[r].Position.y = Canvas.height - Balls[r].Radius;
				//Balls[r].Bounces+=1;
			}
			if (Balls[r].Position.x > Canvas.width - Balls[r].Radius) {
				//check if the ball exceeds the right wall of the canvas
				Balls[r].Velocity.x *= Balls[r].Restitution;
				Balls[r].Position.x = Canvas.width - Balls[r].Radius;
				Balls[r].Bounces+=1;
			}
			//Radius of the ball is taken here because the ball is drawn from the centre.
			if (Balls[r].Position.x < Balls[r].Radius) {
				//check if the ball is less than the left wall of the canvas
				Balls[r].Velocity.x *= Balls[r].Restitution;
				Balls[r].Position.x = Balls[r].Radius;
				Balls[r].Bounces+=1;
			};
			
		  }
		}
		
	if (Chars.length!==0)
	{
	  for (var i=0;i<Chars.length;i++)
	  {
		if (Chars[i].Position.y > Canvas.height - Chars[i].Height) {
			//check if the box is below the canvas
		  	Chars[i].Position.y = Canvas.height - Chars[i].Height;
		}
		if (Chars[i].Position.x > Canvas.width - Chars[i].Width) {
			//check if the box exceeds the right wall of the canvas
			 Chars[i].Position.x = Canvas.width - Chars[i].Width
		}
		if (Chars[i].Position.x < 0) {
			//check if the box is less than the left wall of the canvas
			Chars[i].Position.x = 0			
		}

		
	  }
	}
}



function BoxColCheck()
{
	for (var i=0;i<Chars.length;i++)//first loop to select the shape
	{
		for (var r=0;r<Chars.length;r++)//second loop; to test the collision with other shapes
		{
			if (i!==r)//so it's not testing collision with itself
			{
				if (collides(Chars[i],Chars[r]))
				{
					Chars[i].Velocity.x*=Chars[i].Restitution;
					Chars[r].Velocity.x*=Chars[r].Restitution;
				}
				
			}			
		
		
		//Check Collision with balls
		  for (var t=0;t<Balls.length;t++)
		  {		  
			  if (collides(Chars[i],Balls[t]))
			  {
				  Chars[i].Velocity.x*=Chars[i].Restitution;
				  Balls[t].Velocity.x*=Balls[t].Restitution;
				  CharCollision(i,t)//Additional Char handling code in turnbased module
			  }
		  }
		  
		  //Check Collision with Blocks
		  for (var j=0;j<Blocks.length;j++)
		  {
			  if( collides(Chars[i], Blocks[j]) )
			  {
				  //Find out which side and adjust accordingly
				  if(Chars[i].Position.y + Chars[i].Height > Blocks[j].Position.y)
				  {
					  Chars[i].Position.y = Blocks[j].Position.y - Chars[i].Height					  
				  }
				  //If the char is inside the left of the block 
				  else if(Chars[i].Position.x + Chars[i].Width > Blocks[j].Position.x)
				  {
					 Chars[i].Position.x = Blocks[j].Position.x - Chars[i].Width
				  }
				  //If the char is inside the right of the block
				  else if(Chars[i].Position.x < Blocks[j].Position.x + Blocks[j].Width)
				  {
					  Chars[i].Position.x = Blocks[j].Position.x + Blocks[j].Width
				  }				  				  
				}
		  }
		}
	}
	DeadCharsCheck();    
}


function BlockBallCol()
{
	for (var i=0;i<Balls.length;i++)
	{
		for (var j=0;j<Blocks.length;j++)
		{
			if ( collides(Balls[i], Blocks[j]) )
			{
				if (Balls[i].Position.x + Balls[i].Radius > Blocks[j].Position.x) {
					//check if the ball exceeds the left wall of the block
					Balls[i].Velocity.x *= Balls[i].Restitution;
					if(HasFired || AITurn)
					{
						Balls[i].Bounces +=1
					}
				}
				else if (Balls[i].Position.x < Blocks[j].Position.x + Blocks[j].Width) {
					//check if the ball is less than the right wall of the block
					Balls[i].Position.x = Blocks[j].Position.x
					Balls[i].Velocity.x *= Balls[i].Restitution;
					if(HasFired || AITurn)
					{
						Balls[i].Bounces +=1
					}
				}
				else if (Balls[i].Position.y > Blocks[j].Position.y) {
					//Check if the ball is below the block top
					Balls[i].Position.y = Blocks[j].Position.y
					Balls[i].Velocity.y *= Balls[i].Restitution;
					if(HasFired || AITurn)
					{
						Balls[i].Bounces +=1
					}
		
				}
			}
		}
	}
}
//look at all these CLOUSERES 

function collides(a, b) 
{
	
		 var collided = a.Position.x < b.Position.x + b.Width &&
				 a.Position.x + a.Width > b.Position.x &&
				 a.Position.y < b.Position.y + b.Height &&
				 a.Position.y + a.Height > b.Position.y;
		return collided
		
		 
}//temporary solution for now, doesn't work too well with high velocities or rotated objects.



/*****************************END COLLISION CHECKS****************/



