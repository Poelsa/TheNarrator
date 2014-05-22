/*
	Line
		+ New
		- Update
			- Snap to correct inputs
		+ Remove
*/

// This function is loaned and highly modified from http://raphaeljs.com/graffle.html
var Line = function(styling, renderer)
{
	// New-constructor
	{
		if(renderer)
			this.renderer = renderer;
		else
			this.renderer = $("#Workspace>div")[$("#Workspace").tabs("option", "active")].renderer;
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

function UpdatePortLines(element)
{
	var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
	$(element).children().children().filter(".portIn").each(function(){
		if($(this)[0].line)
			$(this)[0].line.Update($(this)[0].line.from,
				{x: $(this).offset().left + 6 - workspace.offset().left,
				y: $(this).offset().top + $(this).height()/2 - workspace.offset().top});
	});
	$(element).children().children().filter(".portOut").each(function(){
		if($(this)[0].line)
		{
			var port = $(this);
			$.each($(this)[0].line, function(){this.Update(
				{x: port.offset().left + port.width() + 6 - workspace.offset().left,
				y: port.offset().top + port.height()/2 - workspace.offset().top},
				this.to);
			});
		}
	});
}