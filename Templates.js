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
			$("#TempArea").css("z-index", "9999");
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
				var index = $(this)[0].idx;
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
								//for(var index in templates[this.id].children)
								for(var index = 0; index < templates[this.id].children.length; index++)
								{
									templates[this.id].children[index].children().filter("span.title").html(templates[this.id].id);
								}
								form.dialog("close");
								form.remove();
							});
							form.dialog({
								title: 'Rename'
							});
						});
						var newWorkspace = $("<div id=\"Workspace-"+numTemplates+"\"></div>").appendTo('#Workspace');
						newWorkspace[0].renderer = Raphael(newWorkspace[0],newWorkspace.width(),newWorkspace.height());
						
						TabInput['Input-'+numTemplates+''] = new Array();
					
						$("#Workspace").tabs("refresh");
						index = "Function-" + numTemplates;
						templates[index] =
							{
								id : index,
								children: [],
								inVar : [["","Flow","Flow"]],
								outVar : [["Flow","Flow"]]
							};
						addDraggableElement(false, templates[index].id);
						
						var inputDiv = $("<div class=\"TabInput ui-widget-content\" id=\"Input-"+numTemplates+"\" ><div>Inputs</div></div>").appendTo(newWorkspace);
						var tempObject = {inVar: [], outVar:[["Flow","Flow"]]};
						CreatePorts(tempObject, inputDiv);
						
						
						var outputDiv = $("<div class=\"TabOutput ui-widget-content\" id=\"Output-"+numTemplates+"\" ><div>Outputs</div></div>").appendTo(newWorkspace);
						tempObject = {inVar : [["","Flow","Flow"]], outVar: []};
						CreatePorts(tempObject, outputDiv);
						
						numTemplates++;
					}
					var block = CreateBlock(this, templates[index], $("<div class='block ui-widget-content ui-draggable'>"));
					
					templates[index].children.push(block);
				}
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			stack: "div",
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).idx = (Name == "NewFunction"?Name:"Function-" + numTemplates);
};