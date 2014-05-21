var TabInput = new Object();
var numTemplates = 0;

var templates = {};
	templates.NewTemplate = {
	id : "NewFunction"
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
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("block");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
				console.log("Template: start");
			},
			drag: function(e, ui){
				console.log("Template: drag");
			},
			revert: function(){
				console.log("Template: revert");
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					{
						var block = $("<div class='block ui-widget-content ui-draggable'>").html(((New == true) ? "Function-"+numTemplates : (Name))).appendTo(currentTab).draggable({
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
						if(!New)
							templates[$(this)[0].idx].children.push(block);
						
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
							$("<div id=\"Workspace-"+numTemplates+"\">\
								<div class=\"TabInput ui-widget-content\" id=\"Input-"+numTemplates+"\" >Input goes here!</div>\
								</div>").appendTo('#Workspace');
								
							TabInput['Input-'+numTemplates+''] = new Array();
						
							$("#Workspace").tabs("refresh");
							templates["Function-" + numTemplates] = {id : "Function-" + numTemplates, children: [block]};
							addDraggableElement(false, templates["Function-" + numTemplates].id);
							numTemplates++;
						}						
					}				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).idx = "Function-" + numTemplates;
};