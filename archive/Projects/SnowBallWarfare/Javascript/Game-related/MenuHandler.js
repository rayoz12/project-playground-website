
//Create the initial Menu object 
function Menu(type,Direction, ArrayItems, State)
{
	this.type = type
	this.List = ArrayItems
	this.Render(Direction)
	this.State = State
}

//Push the buttons to the Buttons Array
Menu.prototype.Render = function(Direction) {
	console.log("Drawing: " + this.type)
	if (Direction === "Horizontal")
	{
		for (var i=0;i<this.List.length;i++)
		{
			console.log("Inside Loop")
			Buttons.push(button =
			{
				Position: {x:(Canvas.width/2 - 400) + (i*300), y: 6/8*Canvas.height},//The "i*300" is the seperation of each menu item, currently it's 300 pixels away from each other
				Width: 200,
				Height: 30,
				Colour:"#00FFFF", //Light Blue
				Hover: "#0099FF", //Dark Blue
				TextColour:"#000000",
				Text:this.List[i].Text,
				onClick:this.List[i].Click,
				Tag:this.type + "Menu",
				ID:"Menu" + this.List[i].Text,
			});			
		}
	}
	else if (Direction === "Vertical")
	{
		for (var i=0;i<this.List.length;i++)
		{
			Buttons.push(button =
			{
				Position: {x:(Canvas.width/2) - 100, y: 1/4*Canvas.height + (i*50)},//The "i*50" is the seperation of each menu item, currently it's 50 pixels away from each other
				Width: 200,
				Height: 30,
				Colour:"#00FFFF", //Light Blue
				Hover: "#0099FF", //Dark Blue
				TextColour:"#000000",
				Text:this.List[i].Text,
				onClick:this.List[i].Click,
				Tag:this.type + "Menu",
				ID:"Menu" + this.List[i].Text,
			});			
		}		
	}
}

Menu.prototype.Destroy = function() {
	console.log("Destroying: " + this.type)
	for (var i=Buttons.length-1;i>=0;i--)
	{
		if (Buttons[i].Tag === this.type + "Menu")
		{
			Buttons.splice(i,1)
		}
	}
}

//Is pointed to by the load button in the main menu, simply asks the user to enter a code and if the code matches the ones below it starts the respective game.
function LevelSelect()
{
	var SecretCode = prompt("Please enter the secret code","");
	switch (SecretCode) {
		case "The Beginning": MainGame = new Game("Prep", 1); MainGame.Start(); MainMenu.Destroy();
		break
		case "More and more": MainGame = new Game("Prep", 2); MainGame.Start(); MainMenu.Destroy();
		break
		case "They came from the hills": MainGame = new Game("Prep", 3); MainGame.Start(); MainMenu.Destroy();
		break
		case "A wall was built": MainGame = new Game("Prep", 4); MainGame.Start(); MainMenu.Destroy();
		break
		case "Offensive attack": MainGame = new Game("Prep", 5); MainGame.Start(); MainMenu.Destroy();
		break
		case "The last of them": MainGame = new Game("Prep", 6); MainGame.Start(); MainMenu.Destroy();
		break
		case "": return
		default: alert("Sorry, That's not a level!")
	}
	 
}

function ExitLevel()
{
	if(confirm("Are you sure you want to lose your progress? You can come back if you know the secret code."))
	{
		if(GameWon || GameLost)//If they have already finished the game and they wish to restart. Both booleans must be reset to prevent the gameover text from being displayed.
		{
			GameWon = false
			GameLost = false
		}
		MainGame.Destroy()
		PauseMenu.Destroy();
		MainMenu = new Menu("Main", "Horizontal", MainMenuList, "Active")
		MainGame = new Game("Main Menu", 1, false)
		Paused = false
	}
}

//----------Processes in this module---------------------------------

Render();//Starts the render loop

//------------The menu's items and actions-------------------

var MainMenuList = new Array();
var PauseMenuList = new Array();

//---------------------Main Menu Items----------------

MainMenuList.push(menuitem = 
{
	Text:"Play", 
	Click: function() {MainGame.State = "Prep";MainGame.Start()}	
});
MainMenuList.push(menuitem = 
{
	Text: "Load",
	Click: function() {LevelSelect()}
});

MainMenuList.push(menuitem =
{
	Text: "Help",
	Click: function() {window.open("Assets/Webpages/Help.html")}
});

//-----------------------Pause Menu items--------------------

PauseMenuList.push(pauseitem = 
{
	Text: "Main Menu",
	Click: function() {ExitLevel()}	
});

PauseMenuList.push(pauseitem = 
{
	Text: "Help",
	Click: function() {window.open("Assets/Webpages/Help.html")}	
});

PauseMenuList.push(pauseitem = 
{
	Text: "Back",
	Click: function() {PauseToogle()}	
});

PauseMenuList.push(pauseitem = 
{
	Text: "Reset Ball",
	Click: function() {PauseToogle(); MoveElement("Balls", "InactiveBalls", 0); }	
});

//-------------------------------Game Over Menu Items-------------------


MainMenu = new Menu("Main", "Horizontal", MainMenuList, "Active")
