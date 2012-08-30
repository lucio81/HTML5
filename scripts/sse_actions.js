function activateSSE(elemId){
    if(typeof(EventSource)!=="undefined"){
	var source = new EventSource("scripts/sse_actions.php");
	alert(elemId);
	source.onmessage=function(event){
            elemId.innerHTML=event.data + "<br />";
	};
    }
    else
    {
	elemId.innerHTML="Sorry, your browser does not support server-sent events...";
    }
}