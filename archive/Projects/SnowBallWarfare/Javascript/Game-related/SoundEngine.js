//Firefox,Chrome and IE support mp3. Firefox, chrome support wav but IE doesn't (really strange considering they developed it.)
// I will use mp3 as it is supported by the three major browsers.

Muted = false

function Sound(filePath, SoundID, Loop, Autoplay)
{
	this.filePath = new Audio(filePath);	
	this.SoundID = SoundID;
	this.Loop = Loop;
	this.Autoplay = Autoplay;
	
	//-----initialisation functions----
	if (this.Loop === true)
	{
		LoopSound(this)//must be done external to function as using an anonymous function with "this" actually refers to the Audio itself
	}
	if (this.Autoplay === true)
	{
		this.Play()
	}
}

Sound.prototype.Play = function() {
	this.filePath.play();
}

Sound.prototype.Pause = function() {
	this.filePath.pause();
}

Sound.prototype.Stop = function() {
	this.Pause()
	this.filePath.currentTime = 0;
}

/*
Background track used under creative commons
"Pamgaea" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 3.0
http://creativecommons.org/licenses/by/3.0/

http://incompetech.com/music/royalty-free/index.html?isrc=USUAN1300036
*/
var BackgroundTrack = new Sound("Assets/Audio/Tracks/Background.mp3", "Background", true, false)

var CollisionsSFX = new Sound("Assets/Audio/SFX/Collision.mp3", "Collisions", false, false)


function LoopSound(SoundObj)
{
	SoundObj.filePath.onended = function() {SoundObj.filePath.currentTime=0; SoundObj.Play();}
}