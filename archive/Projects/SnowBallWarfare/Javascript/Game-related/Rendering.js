//The rendering works like a canvas, one layer on top of the other, so order of execution is 
//crucial to the look of the game. As you cas see below as lables are the different 
//items that must be rendered all in catagories. The first few will be the bottom layer 
//and as a result the code below that layer will be above it.  


function Render() {
    Mouse_Checks()//In Debug/Handlers js file
	//Debug_Output()//In Debug/Handlers js file	
//--------------------------------Canvas Prep------------------------------------	
	//clear the canvas
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);

	
//--------------------Draw Images -----------------------------------------------

    //Background
	if (BackgroundIMG.complete)
	{
		ctx.drawImage(BackgroundIMG,0,0,Canvas.width,Canvas.height);
	}
	//Fallback if the image isn't loaded yet
	else
	{
		ctx.beginPath();
		ctx.fillStyle = "rgb(101, 170, 218)";
		ctx.fillRect(0, 0, Canvas.width, Canvas.height)
		ctx.closePath();
	}
	
	
//---------------------------Draw Snow-----------------------------------------

	ctx.beginPath();
	ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
	for(var k = 0; k < SnowEnv.Particles; k++)
	{
		ctx.moveTo(SnowParticles[k].Position.x, SnowParticles[k].Position.y);
		ctx.arc(SnowParticles[k].Position.x, SnowParticles[k].Position.y, SnowParticles[k].Radius, 0, Math.PI*2, true);
	}
	ctx.fill();
	ctx.closePath();	
	
	if (MainGame.State === "Main Menu")
	{
		ctx.drawImage(LogoIMG,1/2 *Canvas.width - 300 ,0, 600, 125);
	}


//-------------------------------Draw the Ball-----------------------------------
	
	if (Balls.length !== 0)
	{
		//The reason this decision is out of the loop is because it doesn't have to run the check each iteration of the loop, less processing.
		if(PlayerTurn)
		{
			var SnowballIMG = SnowballPlayerIMG			
		}
		if(AITurn)
		{
			var SnowballIMG = SnowballAIIMG
		}
		
		for (var t=0;t<Balls.length;t++)
		{
		  ctx.save();
		  ctx.translate(Balls[t].Position.x, Balls[t].Position.y);
		  ctx.drawImage(SnowballIMG, -30, -22.5)
		  ctx.restore();
		}
	}

//-------------------------------Draw World Objects------------------------------
	for(var j=0;j<Blocks.length;j++)
	{
		ctx.save();
		ctx.beginPath()
		ctx.fillStyle = Blocks[j].Colour
		ctx.fillRect(Blocks[j].Position.x, Blocks[j].Position.y, Blocks[j].Width, Blocks[j].Height)
		ctx.closePath();
	}
	
//-------------------------------Draw the characters-----------------------------	
	
	for (var i=0;i<Chars.length;i++)
	{
		if(Chars[i].Team === "Player")
		{
			SnowmanIMG = SnowmanPlayerIMG
		}
		if(Chars[i].Team === "AI")
		{
			SnowmanIMG = SnowmanAIIMG
		}
		
		ctx.save();
		ctx.translate(Chars[i].Position.x+(Chars[i].Width/2), Chars[i].Position.y+(Chars[i].Height/2))//adding half heights and width to translate 0,0 to centre of the shape
		
		ctx.beginPath()
		ctx.drawImage(SnowmanIMG,0-(Chars[i].Width/2) ,0-(Chars[i].Height/2), Chars[i].Width, Chars[i].Height);//move to the top left of shape, to draw correctly
		ctx.closePath()
		
		//Draw the health Bars
		//Draw the background of the health bars, it will be 50 long and 15 high
		//The HealthBar Object is loacated in the objects.js file
		//The background of the health bar
		ctx.beginPath()
		ctx.fillStyle = HealthBar.BackColour
		ctx.fillRect(0-(HealthBar.Width/2), 0-(Chars[i].Height/2)- HealthBar.HoverHeight, HealthBar.Width, HealthBar.Height)
		ctx.closePath()
		//Now drawing the actual health of the Char
		ctx.beginPath()
		ctx.fillStyle = HealthBar.HealthColour
		ctx.fillRect(0-(HealthBar.Width/2), 0-(Chars[i].Height/2)- HealthBar.HoverHeight, (Chars[i].Health/Chars[i].MaxHealth)*HealthBar.Width, HealthBar.Height)
		ctx.closePath()				
		ctx.restore();
		
	}
	
//------------------------------Draw the buttons---------------------------------
	for (var r=0;r<Buttons.length;r++)
	{
		ctx.save();
		ctx.translate(Buttons[r].Position.x+(Buttons[r].Width/2), Buttons[r].Position.y+(Buttons[r].Height/2))//adding half heights and width to translate 0,0 to centre of the shape, to make it the pivot point of the shape
		ctx.beginPath()
		ctx.fillStyle = Buttons[r].Colour
		ctx.fillRect(0-(Buttons[r].Width/2), 0-(Buttons[r].Height/2), Buttons[r].Width, Buttons[r].Height);//move to the top left of shape, to draw correctly		  
		ctx.closePath()
		//write the text
		ctx.beginPath()
		ctx.textAlign = "center"
		ctx.fillStyle = Buttons[r].TextColour
		ctx.fillText(Buttons[r].Text, 0, 3)
		ctx.closePath();
		ctx.restore();
	}
	
	OnButton()
	if (ButtonHovering)
	{
		ctx.save();
		ctx.translate(Buttons[ButtonIndex].Position.x+(Buttons[ButtonIndex].Width/2), Buttons[ButtonIndex].Position.y+(Buttons[ButtonIndex].Height/2))//adding half heights and width to translate 0,0 to centre of the shape, to make it the pivot point of the shape
		ctx.beginPath()
		ctx.fillStyle = Buttons[ButtonIndex].Hover
		ctx.fillRect(0-(Buttons[ButtonIndex].Width/2), 0-(Buttons[ButtonIndex].Height/2), Buttons[ButtonIndex].Width, Buttons[ButtonIndex].Height);//move to the top left of shape, to draw correctly		  
		ctx.closePath();
		//Text Rendering
		ctx.beginPath()
		ctx.textAlign = "center"
		ctx.fillStyle = Buttons[ButtonIndex].TextColour
		ctx.fillText(Buttons[ButtonIndex].Text, 0, 3)
		ctx.closePath();
		ctx.restore();	
	}
	
//----------Draw the line from ball the mouse when it going to launch-----------
	
//---------------Check if game is lost or won-----------------------------------
	if(!Paused)
	{
		if (GameWon)
		{
			ctx.save()
			ctx.beginPath()
			ctx.textAlign = "center"
			ctx.font = 'italic 40pt Calibri';
			ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.
			ctx.fillText('You Have Won :)', Canvas.width/2, Canvas.height/2);
			ctx.closePath()
			ctx.restore()
		}
		if (GameLost)
		{
			ctx.save()
			ctx.beginPath()
			ctx.textAlign = "center"
			ctx.font = 'italic 40pt Calibri';
			ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.
			ctx.fillText('You Have Lost :(', Canvas.width/2, Canvas.height/2);
			ctx.closePath()
			ctx.restore()
		}
	}
	
	
//--------------------General Text Drawing-------------------------------------------

	if (Paused)//Pause text
	{
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "center"
		ctx.font = 'italic 24pt Calibri';
		ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.
      	ctx.fillText('Paused', Canvas.width/2, 14/16 * Canvas.height);
		ctx.closePath()
		ctx.restore()
	}
	
	if(MainGame.State === "Ready")
	{
		//--Draw Who's turn it is
		if (PlayerTurn === true && AITurn === false)
		{
			var turnText = "Your Turn" 
		}
		else if (PlayerTurn === false && AITurn === true)
		{
			var turnText = "Computer's Turn"	
		}
		else
		{
			var turnText = "Switching Turns..."
		}
	
		//Whose turn it is currently
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "left"
		ctx.font = "italic 24pt Calibri";
		ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.		
		ctx.fillText(turnText, 0, 25);
		ctx.closePath()
		ctx.restore()
		
		//What Level it is
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "left"
		ctx.font = "24pt Calibri";
		ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.		
		ctx.fillText("Level " + MainGame.Level, 0, 80);
		ctx.closePath()
		ctx.restore()
		
		//Draw what the secret code is.
		
	 	switch(MainGame.Level)
		{
			case 1: var Secret = "The Beginning"
				break;
			case 2: var Secret = "More and more"
				break;
			case 3: var Secret = "They came from the hills"
				break;
			case 4: var Secret = "A wall was built"
				break;
			case 5: var Secret = "Offensive attack"
				break;
			case 6: var Secret = "The last of them"
				break;			
		}
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "left"
		ctx.font = "20pt Calibri";
		ctx.fillStyle = (MainGame.Level === 5 || MainGame.Level === 6) ? "#FFFFFF" : "#000000";//Check which level it is and apply correct texk colour. Level 5 and 6 background colours are black and need white text.		
		ctx.fillText("Secret code: " + Secret, 0, 50);
		ctx.closePath()
		ctx.restore()
	}
	
	if (MainGame.State === "Main Menu" || MainGame.State === "Finished" )// Credits
	{
		//Main Menu text saying who developed this game  
		var Credit = "A Canvas Project By Foogle Games Pty. Ltd." 
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "left"
		ctx.fillStyle = "#000000"
		ctx.fillText(Credit , Canvas.width - ctx.measureText(Credit).width, 63/64*Canvas.height )
		ctx.closePath();
		ctx.restore();
		
		//Credit to Kevin MacLeod. The original creator of the background track
		/*
		Background track used under creative commons
		"Pamgaea" Kevin MacLeod (incompetech.com)
		Licensed under Creative Commons: By Attribution 3.0
		http://creativecommons.org/licenses/by/3.0/
		
		http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300036
		*/
		ctx.save()
		ctx.beginPath()
		ctx.textAlign = "left"
		ctx.fillStyle = "#000000"
		ctx.fillText('Background track: "Pamgaea" Kevin MacLeod (incompetech.com)' , Canvas.width - ctx.measureText('Background track: "Pamgaea" Kevin MacLeod (incompetech.com)').width, 61/64*Canvas.height )
		ctx.closePath();
		ctx.restore();
	}
		

	if(SnowEnv !=="undefined")
	{
		SnowEnv.Tick();
	}
	
	//Draw the loading screen
	if(Loading)
	{
		ctx.drawImage(LoadIMG,0,0,Canvas.width,Canvas.height);
	}
	
    requestAnimationFrame(Render);// This is the Main animation loop
}

