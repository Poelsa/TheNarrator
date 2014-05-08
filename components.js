var ComponentsInit = function() {
	var components = {};

	components.Entity = {
	id : "Entity",
	entity : ["Entity", "Entity"]
	};

	components.Transform = {
	id : "Tranform",
	pos : ["Position", "vector3"],
	scale : ["Scale", "vector3"]
	};

	components.Renderable = {
	id : "Renderable",
	model : ["Model", "String"],
	material : ["Material", "String"],
	shadowTechnique : ["Shadow Technique", "int"],
	matDiffuse : ["Material Diffuse", "String"],
	matSpec : ["Material Specular", "String"],
	matNormal : ["Material Normal", "String"],
	matGlow : ["Material Glow", "String"],
	matEffect : ["Material Effect", "String"]
	};

	components.Particle = {
	id : "Particle",
	entity : ["Entity", "Entity"],
	part : ["Particle Emitter", "String"]
	};

	components.Collision = {
	id : "Collision",
	entity : ["Entity", "Entity"],
	number : ["SOMETHING", "int"],
	bool : ["Collide with something i dont remember", "bool"]
	};

for(var prop in components)
		$("<div class='components'>").html(components[prop].id).appendTo("#Elements-Variables").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", $(this).parent().width());
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("variable");
				$(this).get(0).originalParent = $(this).parent();
				$(this).parent().children().appendTo("#TempArea");
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					$("<div class='variable ui-widget-content ui-draggable'>").html($(this).html()).appendTo(currentTab).draggable({
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
					.hover().css("cursor","pointer");
				
				$(this).parent().children().appendTo($(this).get(0).originalParent);
				
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer");
};