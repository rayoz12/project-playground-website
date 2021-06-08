//Player Chars
NewChar(false, 1/64*Canvas.width, 150, 75, 100, 5, -0.4, 2.1, "rgb(51,255,51)", 100, 100, "Player")
NewChar(false, 1/64*Canvas.width + 125, 150, 75, 100, 5, -0.4, 2.1, "rgb(51,255,51)", 100, 100, "Player")

//AI Chars
NewChar(false, 15/16*Canvas.width, 150, 75, 100, 5, -0.4, 2.1, "grey", 100, 100, "AI")
NewChar(false, 15/16*Canvas.width - 125, 150, 75, 100, 5, -0.4, 2.1, "grey", 100, 100, "AI")

//Blocks
Block1 = new Block(0, Canvas.height - 100, 140, 100, "#996633", "PlayerHill")
Block2 = new Block(15.5/16*Canvas.width - 20, Canvas.height - 100, 100, 100, "#996633", "AIHill")