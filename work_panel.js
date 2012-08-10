var context;
var context_width; 
var context_height; 
var scene_el;
var offset_left;
var offset_top;
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
var selected = null;
var action = null;
var linking_el = false;

//ACTION CONSTANTS
var SET_LINK = 1;
var DEL_LINK = 2;


function node(pX,pY){
    this.x = pX;
    this.y = pY;
    this.r = 10;
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

function createLink(){
    action = SET_LINK
}

function removeLink(){
    action = DEL_LINK
}



function performAction(el){
    switch (action){
    case SET_LINK:
	selected.createLink(el);
	action=null;
	break;
    case DEL_LINK:
	selected.removeLink(el);
	action=null;
	break;
    }
}

function init(){
    dbStuff();
    context = $("#work_panel")[0].getContext("2d");
    context_width = $("#work_panel")[0].width;
    context_height = $("#work_panel")[0].height;
    offset_left=$("#work_panel").offset().left;
    offset_top=$("#work_panel").offset().top;
    scene_el = new Array();
    scene_el[0] = new node(100+offset_left,200+offset_top);
    scene_el[1] = new node(150+offset_left,200+offset_top);
    mainInterval = setInterval(draw, 10);
}

function onMouseDown(e){
   for (var i=0;i<scene_el.length;i++){
	if (scene_el[i].collide(e.pageX,e.pageY)){
	    scene_el[i].draggable=true;
	    if (action==null && selected!=scene_el[i]){
		scene_el[i].style="red"
		if (selected!=null) {
		    selected.style="black";
		}
		selected=scene_el[i];
	    } else {
		if (selected!=null && selected!=scene_el[i]){
		    performAction(scene_el[i]);
		    scene_el[i].style="black";
		}
		if (selected==scene_el[i]){
		    selected.style = "black";
		    selected=null;
		}
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

function dbStuff(){
    db.transaction(function(qry){
	qry.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
	qry.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
    });
}

function getDbVal(){
    db.transaction(function(qry){
	qry.executeSql(' SELECT * FROM LOGS', [], function (tx, results) {
	    var len = results.rows.length, i;
	    msg = "<p>Found rows: " + len + "</p>";
	    $('#queryRes').html(msg);
	    for (i = 0; i < len; i++){
		msg = "<p><b>" + results.rows.item(i).log + "</b></p>";
		$('#status').html(msg);
	    }
	}, null);
    });
    
}
   

$(document).ready(init);
$(document).mousedown(onMouseDown);
$(document).mousemove(onMouseMove);
$(document).mouseup(onMouseUp);
