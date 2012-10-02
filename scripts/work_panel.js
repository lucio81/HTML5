var context;
var context_width; 
var context_height; 
var scene_el;
var offset_left;
var offset_top ;

var selected;
var startX = 50;
var startY = 50;

//ACTION CONSTANTS
var SET_LINK = 1;
var DEL_LINK = 2;
var DEL_NODE = 3;
var ADD_NODE = 4;


function node(pX,pY){
    this.x = pX;
    this.y = pY;
    this.r = 10;
    this.selected = false;
    this.style = "black"
    this.links = new Array();
    this.draw = function(){
	if (this.selected){
	    this.style = "red";
	}else{
	    this.style = "black"
	}
	context.beginPath();
	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.strokeStyle = this.style;
	context.stroke();
	for (var i=0;i<this.links.length;i++){
	    context.beginPath();
	    context.moveTo(this.x,this.y);
	    context.lineTo(this.links[i].x,this.links[i].y);
	    context.strokeStyle = "black";
	    context.stroke();
	}

    }
    this.draggable=false;
    this.collide = function(mx,my){
	return (mx>this.x-this.r && mx<this.x+this.r && my>this.y-this.r && my<this.y+this.r)
    }
    this.createLink= function(el){
	var found = false;
	for (var i=0;i<this.links.length;i++){
	    if (el==this.links[i]){
		found = true;
	    }
	}
	if (!found) {
	    this.links.push(el);
	}
    }
    this.removeLink= function(el){
	var found = false;
	for (var i=0;i<this.links.length;i++){
	    if (el==this.links[i]){
		this.links[i]=this.links[length];
		found = true;
	    }
	}
	if (found) {
	    this.links.pop();
	}
    }

    
}

function clear() {
    context.clearRect(0,0,context_width,context_height);
}


function draw(){
    clear();
    for (var i=0;i<scene_el.length;i++){
	scene_el[i].draw();
    }
}

function performAction(val){
    switch (val){
    case SET_LINK:
	if (selected.length==2){
	    selected[0].createLink(selected[1]);
	} else {
	    alert("Please select 2 nodes");
	}
	break;
    case DEL_LINK:
	if (selected.length==2){
	    selected[0].removeLink(selected[1]);
	}else {
	    alert("Please select 2 nodes");
	}
	break;
    case DEL_NODE:
	if (selected.length==1){
	    removeNode(selected[0]);
	}else {
	    alert("Please select 1 node");
	} 
	break;
    case ADD_NODE:
	addNode();
	break;
    }
}

function removeNode(node){
    var new_array = new Array();
    var i=0;
    var j=0;
    for (var i=0;i<scene_el.length;i++){
	if (node!=scene_el[i]){
	    new_array[j]=scene_el[i];
	    j++;
	}
    }
    scene_el=new_array;
}

function addNode(){
    scene_el.push(new node(startX, startY));
}

function onMouseDown(e){
    found = false;
    for (var i=0;i<scene_el.length;i++){
	if (scene_el[i].collide(e.pageX-offset_left,e.pageY-offset_top)){
 	    scene_el[i].selected = !scene_el[i].selected
	    if (scene_el[i].selected){
		scene_el[i].draggable=true;
		selected.push(scene_el[i])
	    }else{
		scene_el[i].draggable=false;
		newsel = new Array()
		for (j=0;j<selected.length;j++){
		    if (selected[j]!=scene_el[i]){
			newsel.push(selected[j]);
		    }
		}
		selected = newsel;
	    }
	}
    }
}



function onMouseMove(e){
   for (var i=0;i<scene_el.length;i++){
	if (scene_el[i].draggable){
	    scene_el[i].x = e.pageX-offset_left;
	    scene_el[i].y = e.pageY-offset_top;
	    $("#X").html(e.pageX);
	    $("#Y").html(e.pageY);
	}
   }
}

function onMouseUp(e){
   for (var i=0;i<scene_el.length;i++){
	if (scene_el[i].draggable){
	    scene_el[i].draggable=false;
	}
   }
}

function init(){
    context = $("#work_panel")[0].getContext("2d");
    context_width = $("#work_panel")[0].width;
    context_height = $("#work_panel")[0].height;
    offset_left=$("#work_panel").offset().left;
    offset_top=$("#work_panel").offset().top;
    scene_el = new Array();
    selected = new Array();
    mainInterval = setInterval(draw, 10);
}
   

$(document).ready(init);
$(document).mousedown(onMouseDown);
$(document).mousemove(onMouseMove);
$(document).mouseup(onMouseUp);
