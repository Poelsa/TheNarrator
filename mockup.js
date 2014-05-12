var Variables = [["Variable", "info1", "info2"], ["Another variable", "info1", "info2"], ["A third variable", "info1", "info2"]];
var Functions = [["Function"], ["Another function"]];
var Macros = [["Macro"], ["Another macro"]];
var Templates = [["Template"], ["Another template"]];

$(function() {
	$("#Workspace>div").each(function(){
		this.renderer = Raphael(this,$(this).width(),$(this).height());
	});
	
	// Keep current mouse position accessible from everywhere
	$(document)[0].mousePosition = {};
	$(document).mousemove(function(event) {
		$(document)[0].mousePosition.x = event.pageX;
		$(document)[0].mousePosition.y = event.pageY;
	});

	$("#Elements").tabs();
	$("#SideBar").droppable({
		drop: function(event, ui) {
			if(ui.draggable.hasClass("block"))
				ui.draggable.remove();
		}
	});
	$(".block").draggable({
		stack: 'div',
		start: function(e){$(this).get(0).originalParent = $(this).parent(); $(this).parent().children().appendTo("#TempArea");},
		stop: function(e){$(this).parent().children().appendTo($(this).get(0).originalParent);},
		drag: function(e){
			// Keep the line start and end updated while dragging
			var workspace = $($("#Workspace>div")[$("#Workspace").tabs("option", "active")]);
			$(this).children().filter(".portIn").each(function(){
				if(this.line)
					this.line.Update(this.line.from,
						{x: $(this).offset().left + 6 - workspace.offset().left,
						y: $(this).offset().top + $(this).height()/2 - workspace.offset().top});
			});
			$(this).children().filter(".portOut").each(function(){
				for(var index in this.line)
					this.line[index].Update(
						{x: $(this).offset().left + $(this).width() + 6 - workspace.offset().left,
						y: $(this).offset().top + $(this).height()/2 - workspace.offset().top},
						$(this)[0].line[index].to);
			});
		}
	});
	var tabs = $("#Workspace").tabs();
	tabs.find(".ui-tabs-nav").sortable({
		axis: "x",
		stop: function() {
			tabs.tabs("refresh");
		}
	});
	$("#Workspace").mousedown(function(event){
		$("#Workspace").get(0).drag = true;
		$("#Workspace").get(0).positionX = event.pageX;
		$("#Workspace").get(0).positionY = event.pageY;
		event.preventDefault();
	});
	$("#Workspace").mouseup(function(event){
		$("#Workspace").get(0).drag = false;
		event.preventDefault();
	});
	$("#Workspace").mousemove(function(event){
		if($("#Workspace").get(0).drag == true)
		{
			$("#Workspace").children().each(function(index,element){
				$(this).css('top', parseInt($(this).css('top'))+event.pageY-$("#Workspace").get(0).positionY);
				$(this).css('left', parseInt($(this).css('left'))+event.pageX-$("#Workspace").get(0).positionX);
			});
			$("#Workspace").get(0).positionX = event.pageX;
			$("#Workspace").get(0).positionY = event.pageY;
			event.preventDefault();
		}
	});
	
	// Zoom functionality
	/*$("#Workspace").get(0).scale = 1;
	$("#Workspace>div").bind("mousewheel", function(event){
		var delta = event.originalEvent.wheelDelta;
		if(delta > 0)
			$("#Workspace").get(0).scale *= 1.1;
		else if(delta < 0)
			$("#Workspace").get(0).scale /= 1.1;
		$(this).css('transform', 'scale('+$("#Workspace").get(0).scale+')');
		event.preventDefault();
	});*/
	
	// Populate the sidebar with elements
	for(var v in Variables)
		$("<div>").html(Variables[v][0]).appendTo("#Elements-Variables").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Variables[v];
	for(var v in Functions)
		$("<div>").html(Functions[v][0]).appendTo("#Elements-Functions").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Functions[v];
	for(var v in Macros)
		$("<div>").html(Macros[v][0]).appendTo("#Elements-Macros").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Macros[v];
	for(var v in Templates)
		$("<div>").html(Templates[v][0]).appendTo("#Elements-Templates").click(function(event){
			var info = this.info;
			alert(info);
		}).get(0).info = Templates[v];
		
	PortProcessing();
});