//Player Chars
NewChar(false, 1/64*Canvas.width, 100, 75, 100, 5, -0.4, 2.1, "rgb(51,255,51)", 100, 100, "Player")
NewChar(false, 1/64*Canvas.width + 125, 100, 75, 100, 5, -0.4, 2.1, "rgb(51,255,51)", 100, 100, "Player")

//AI Chars
NewChar(false, 15/16*Canvas.width, 100, 75, 100, 5, -0.4, 2.1, "grey", 100, 100, "AI")
NewChar(false, 15/16*Canvas.width - 125, 100, 75, 100, 5, -0.4, 2.1, "grey", 100, 100, "AI")

//Blocks
Block1 = new Block(1/2*Canvas.width, Canvas.height - 100, 50, 100, "#996633", "MiddleWall")