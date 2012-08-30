var context;
var context_width; 
var context_height; 
var scene_el;
var offset_left;
var offset_top;
//var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

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
    this.style = "black";
    this.links = new Array();
    this.draw = function(){
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
	return (mx>this.x && mx<this.x+2*this.r && my>this.y && my<this.y+2*this.r)
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
    for (var i=0;i<selected.length;i++){
	selected[i].style = "black";
	selected.pop();
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
	if (scene_el[i].collide(e.pageX,e.pageY)){
 	    scene_el[i].draggable=true;	    
	    for (var j=0;j<selected.length;j++){
		if (scene_el[i]==selected[j]){
		    selected[j]=selected[selected.length-1];		    
		    selected.pop();
		    scene_el[i].style = "black";
		    found=true;
		}
	    }
	    if (!found){
		scene_el[i].style = "red";
		selected.push(scene_el[i]);
	    }
	}
    }
}



function onMouseMove(e){
   for (var i=0;i<scene_el.length;i++){
	if (scene_el[i].draggable){
	    scene_el[i].x = e.pageX;
	    scene_el[i].y = e.pageY;
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

// function dbStuff(){
//     db.transaction(function(qry){
// 	qry.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
// 	qry.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
//     });
// }

// function getDbVal(){
//     db.transaction(function(qry){
// 	qry.executeSql(' SELECT * FROM LOGS', [], function (tx, results) {
// 	    var len = results.rows.length, i;
// 	    msg = "<p>Found rows: " + len + "</p>";
// 	    $('#queryRes').html(msg);
// 	    for (i = 0; i < len; i++){
// 		msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
// 		$('#status').html(msg);
// 	    }
// 	}, null);
//     });  
//}

function init(){
    context = $("#work_panel")[0].getContext("2d");
    context_width = $("#work_panel")[0].width;
    context_height = $("#work_panel")[0].height;
    offset_left=$("#work_panel").offset().left;
    offset_top=$("#work_panel").offset().top;
    scene_el = new Array();
    selected = new Array();
    scene_el.push(new node(100+offset_left,200+offset_top));
    scene_el.push(new node(150+offset_left,200+offset_top));
    mainInterval = setInterval(draw, 10);
}
   

$(document).ready(init);
$(document).mousedown(onMouseDown);
$(document).mousemove(onMouseMove);
$(document).mouseup(onMouseUp);
