var TabInput = new Object();
var numTemplates = 0;

var templates = {};
	templates.NewFunction = {
		id : "NewFunction",
		inVar : [["","Flow","Flow"]],
		outVar : [["Flow","Flow"]]
	};
	
var TemplatesInit = function() {
	for(var prop in templates)
		addDraggableElement(true, templates[prop].id)
};

function addDraggableElement(New, Name)
{
		$("<div id='templates-"+Name+"' class='templates'>").html(Name).appendTo("#Elements-Templates").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", "100%");
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("block");
				ui.helper.addClass("ui-widget-content");
				ui.helper.removeClass("templates");
				ui.helper.removeClass("ui-draggable-dragging");
				$(this).get(0).originalParent = $(this).parent();
				ui.helper.appendTo("#TempArea");
				CreatePorts(templates[$(this)[0].idx], ui.helper);
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
				{
					if(New)
					{
						var tabName = $("<li><a href='#Workspace-"+numTemplates+"'>Function-"+numTemplates+"</a></li>").appendTo('#Workspace>ul');
						tabName.children().filter("a").get(0).id = "Function-" + numTemplates;
						tabName.children().filter("a")
						.dblclick(function(e){
							var form = $("<form action='#'><input id='Workspace-Name' value='"+$(this).html()+"'/><br/><input value='Save' type='Submit'/></form>");
							form.get(0).id = this.id;
							form.submit(function(e){
								templates[this.id].id = $("#Workspace-Name").val();
								tabName.children("a").html(templates[this.id].id);
								$("#templates-"+this.id).html(templates[this.id].id);
								for(var index in templates[this.id].children)
									templates[this.id].children[index].html(templates[this.id].id);
								form.dialog("close");
							});
							form.dialog();
						});
						var inputDiv = $("<div class=\"TabInput ui-widget-content\" id=\"Input-"+numTemplates+"\" ><div>Inputs</div></div>").appendTo($("<div id=\"Workspace-"+numTemplates+"\"></div>").appendTo('#Workspace'));
							
						var portDiv = $("<div style=\"float: right; clear: both;\">").appendTo(inputDiv);
						$("<div class=\"portOut\" type=\"Flow\">").html("Flow").appendTo(portDiv);
							
						TabInput['Input-'+numTemplates+''] = new Array();
					
						$("#Workspace").tabs("refresh");
						templates["Function-" + numTemplates] =
							{
								id : "Function-" + numTemplates, children: [block],
								inVar : [["","Flow","Flow"]],
								outVar : [["Flow","Flow"]]
							};
						addDraggableElement(false, templates["Function-" + numTemplates].id);
						numTemplates++;
					}
					
					var block = CreateBlock(this, templates[$(this)[0].idx], $("<div class='block ui-widget-content ui-draggable'>"));
					if(!New)
						templates[$(this)[0].idx].children.push(block);
				}
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).idx = (Name == "NewFunction"?Name:"Function-" + numTemplates);
};