/*
	Line
		+ New
		- Update
			- Snap to correct inputs
		+ Remove
*/

// This function is loaned and highly modified from http://raphaeljs.com/graffle.html
var Line = function(renderer, styling)
{
	// New-constructor
	{
		this.renderer = renderer;
		this.line = this.renderer.path().attr({stroke: styling.split("|")[0], fill: "none", "stroke-width": styling.split("|")[1] || 3});
	}
	
	this.Update = function (from, to)
	{
		this.from = from;
		this.to = to;
		
		dx = Math.max(Math.abs(from.x - to.x) / 2, 10);
		dy = Math.max(Math.abs(from.y - to.y) / 2, 10);
		var path = ["M", from.x.toFixed(3), from.y.toFixed(3), "C", (from.x+dx).toFixed(3), from.y.toFixed(3), (to.x-dx).toFixed(3), to.y.toFixed(3), to.x.toFixed(3), to.y.toFixed(3)].join(",");
		if (this.line)
			this.line.attr({path: path});
	};
	
	this.Remove = function()
	{
		this.line.remove();
	}
};