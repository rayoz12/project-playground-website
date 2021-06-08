//Props are the Properties of the objects(in terms of the physics drag formula such as: 
//Cd=Drag Coeffcient;A=Surface area of object.

//---------------------------Ball arrays begins here-----------------------------
Balls = new Array()
InactiveBalls = new Array();

InactiveBalls.push(ball=
{
    Position: {x: 1107, y: 315},
	OriginalPos: {x: 1107, y: 300},
    Velocity: {x: 0, y: 0},
    Mass: 0.1, //kg
    Radius: 15, // 1px = 1cm
    Restitution: -0.7,//meant to -0.7, Higher is more bounce lower is less
	Height: 15,//mainly for collision performance(making it a square collsion box/Bounding box)
	Width: 15,
	Props: {Cd:0.47, A:Math.PI * 15 * 15 / (10000)},
	Colour: "#66FF66",
	Bounces:-10,
});

//-----------------------------------Buttons begin here --------------------------
//Buttons are categorised as the tag attribute and colours:
//yellow = Debug 

Buttons = new Array();
InactiveButtons = new Array();

InactiveButtons.push(button=
{
	Position: {x:1100,y: 10},
	Width: 100,
	Height: 50,
	Colour:"#00CCCC",//Ocean blue
	TextColour:"#000000",
	Text:"Pause/Play Game",
	onClick:function() {if (Paused){MainGame.Play()} else if (!Paused) {MainGame.Pause()} ;},
	Tag:"GUI",
	ID:"Test",
});

//--------------------World Objects------------------------------------
Blocks = new Array();

function Block(PositionX, PositionY, Width, Height, Colour, ID) {
	this.PositionX = PositionX
	this.PositionY = PositionY
	this.Width = Width
	this.Height = Height
	this.Colour = Colour
	this.ID = ID
	
	this.Render()
}

Block.prototype.Render = function() {
	
	Blocks.push(block= 
	{
		Position: {x: this.PositionX, y: this.PositionY},
		Width: this.Width,
		Height: this.Height,
		Colour: this.Colour,
		ID: this.ID
	});
}

Block.prototype.Destroy = function() {
	console.log("Destroying: Block, ID: " + this.ID)
	for (var i=Blocks.length-1;i>=0;i--)
	{
		if (Blocks[i].ID === this.ID)
		{
			Blocks.splice(i,1)
		}
	}
}


//-----------------Health bar Properties----------------------
// This is the object that code will refer to when it needs to get the health bar properties 
HealthBar = 
{
	Width: 60,
	Height: 15,
	HoverHeight: 35,
	BackColour: "#FF3333",
	HealthColour: "#00CC00"
};

//-----------------functions to do with objects----------------

//---------Button Functions------------------------------------
//When referencing from a loop it must go from the bottom of array to the top
//Loop is done in reverse as when splicing(deleting an element) an array everything moves up, that can lead to buttons that weren't the target of the move.
function MoveElement(From, To, Index)//parameters must always be two specific words, the name of the arrays. 
{
	var ArrayFrom=eval(From);//eval() is used to convert string to a useable reference of the array. Strings cannot be used
	var ArrayTo=eval(To);

	if (ArrayFrom.length !== 1 && Index>ArrayFrom.length-1)//checks if Index is outside the range of the arrays. "-1" to account for the 0 index of arrays.
	{
		var error = new Error('Index parsed to function was larger than the "From" length')		
		//Logging.Error(error)
		throw error
	}
	
	//Actual Moving Code
	var Spliced=ArrayFrom.splice(Index, 1)//returns an array with the first element being the spliced object.
	ArrayTo.push(Spliced[0])//Because splice returns an array the "[0]" is necessary to reference the actual object taken out
	return "Successful"	
}

function getButtonByID(ID)//ID is a string, returns the index of the Button
{
	for (var j=Buttons.length-1;j>=0;j--)
	{
		if (Buttons[j].ID === ID)
		{
			return j;
		}
	}
}
