var TabInput = new Object();
var numTemplates = 0;

var templates = {};
	templates.NewTemplate = {
	id : "NewTemplate"
	};
	
var TemplatesInit = function() {
	for(var prop in templates)
		addDraggableElement(true, templates[prop].id)
};

function addDraggableElement(New, Name)
{
		$("<div class='templates'>").html(Name).appendTo("#Elements-Templates").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("block");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					{
						$("<div class='block ui-widget-content ui-draggable'>").html(((New == true) ? "Workspace-"+numTemplates : (Name))).appendTo(currentTab).draggable({
							stack: 'div',
							start: function(e){
								$("#TempArea").css("left", $(this).parent().parent().offset().left);
								$("#TempArea").css("top", $(this).parent().parent().offset().top);
								$("#TempArea").css("width", $(this).parent().parent().width());
								$("#TempArea").css("margin", "1px"); // compensate for #Workspace's border
								$(this).get(0).originalParent = $(this).parent();
								$(this).parent().children().appendTo("#TempArea");
								},
							stop: function(e){
								$(this).parent().children().appendTo(currentTab);
								}
						}).tooltip({ hide: { effect: "explode", duration: 1000 } })
						.css("top", $(this)[0].ui.helper.offset().top - $(currentTab).offset().top)
						.css("left", $(this)[0].ui.helper.offset().left - $(currentTab).offset().left)
						.css("cursor","pointer")
						.click(selectFunc);
						
						if(New)
						{
							$("<li><a href='#Workspace-"+numTemplates+"'>Workspace-"+numTemplates+"</a></li>").appendTo('#Workspace>ul');
							$("<div id=\"Workspace-"+numTemplates+"\">\
								<div class=\"TabInput ui-widget-content\" id=\"Input-"+numTemplates+"\" >Input goes here!</div>\
								</div>").appendTo('#Workspace');
								
							TabInput['Input-'+numTemplates+''] = new Array();
						
							$("#Workspace").tabs("refresh");
							templates["Workspace-" + numTemplates] = {id : "Workspace-" + numTemplates};
							addDraggableElement(false, templates["Workspace-" + numTemplates].id);
							numTemplates++;
						}
						
						}
						
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer");
};