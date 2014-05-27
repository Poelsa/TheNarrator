var ComponentsInit = function() {
	var components = {};

	components.Entity = {
		tip : "This is not the entity you are looking for",
		id : "Entity",
		inVar : [["New","Entity","Entity"]],
		outVar : [["Entity","Entity"]]
	};

	components.Transform = {
		id 		: "Tranform",
		inVar : [["New","Entity","Entity"],["(1,1,1)","Position", "vector3"], ["(1,1,1)","Scale", "vector3"]],
		outVar : [["Position", "vector3"],["Scale", "vector3"]]
	};

	components.Renderable = {
		id 				: "Renderable",
		inVar			: [["New","Entity","Entity"],["cube","Model", "String"],["cube_material","Material", "String"],["0","Shadow Technique", "int"],
							["cube_diffuse","Material Diffuse", "String"],["cube_specular","Material Specular", "String"],["cube_normal","Material Normal", "String"],
							["cube_glow","Material Glow", "String"],["cube_effect","Material Effect", "String"]],
		outVar			: [["Model", "String"],["Material", "String"],["Shadow Technique", "int"],
							["Material Diffuse", "String"],["Material Specular", "String"],["Material Normal", "String"],
							["Material Glow", "String"],["Material Effect", "String"]]
	};

	components.Particle = {
		id 		: "Particle",
		inVar 	: [["New","Entity","Entity"],["cube_emitter","Particle Emitter", "String"]],
		outVar	: [["Particle Emitter", "String"]]
	};

	components.Collision = {
		id 		: "Collision",
		inVar	: [["New","Entity","Entity"],["0","Type", "int"],["false","ExternallyControlled", "bool"]],
		outVar	: [["Type", "int"],["ExternallyControlled", "bool"]]
	};
	
	components.Vector3 = {
		id		: "Vector3",
		inVar	: [["(1,1,1)", "Position", "vector3"]],
		outVar	: [["X","float"],["Y", "float"],["Z", "float"]]
		};

	for(var prop in components) {		
		$("<div class='components'>").html(components[prop].id).appendTo("#Elements-Variables").mousedown(function(){
			$("#TempArea").css("left", $(this).parent().offset().left);
			$("#TempArea").css("top", $(this).parent().offset().top);
			$("#TempArea").css("width", "100%");
			$("#TempArea").css("margin", "0");
		})
		.draggable({
			start: function(e, ui){
				$(this)[0].ui = ui;
				ui.helper.addClass("variable");
				ui.helper.addClass("ui-widget-content");
				ui.helper.removeClass("components");
				ui.helper.removeClass("ui-draggable-dragging");
				$(this).get(0).originalParent = $(this).parent();
				ui.helper.appendTo("#TempArea");
				CreatePorts($(this)[0].component, ui.helper);
			},
			drag: function(e, ui){
			},
			revert: function(){
				var currentTab = $("#Workspace>div")[$("#Workspace").tabs("option", "active")];
				if($(this)[0].ui.helper.offset().left - $(currentTab).offset().left > -100)
					CreateBlock(this, $(this)[0].component, $("<div class='variable ui-widget-content ui-draggable'>"));
					
				return true; // revert
			},
			helper: "clone",
			revertDuration: 0
		}).hover().css("cursor", "pointer")
		.get(0).component = components[prop]
	}
};
