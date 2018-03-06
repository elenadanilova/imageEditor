/**
 * created by e.danilova@playa.ru 01.03.2018
 */
'use strict';
var imgEditor = function(options){
    var options = options,	
    obj =
    {
        state : {},
		click : false,
		resize : false,
		downPointX: 0,
		downPointY: 0,
		lastPointX: 0,
		lastPointY: 0,
		ctx : '',
        ratio : 1,
        options : options,
        editorZone : document.getElementById(options.editorZone),
		dropZone : document.getElementById(options.dropZone),
		inputZone: document.getElementById(options.inputZone),
		cropZone: document.getElementById(options.cropZone),
        img : new Image(),
		addDropEvents: function() {
			this.dropZone.addEventListener('dragover',function(){
				event.preventDefault();
				event.stopPropagation();
				event.dataTransfer.dropEffect = 'copy';
			},false);
			
			this.dropZone.addEventListener('drop',function(){
				event.preventDefault();
				event.stopPropagation();
				selectFile(event.dataTransfer.files);
			},false);
		},
		addInputEvents: function() {
			this.inputZone.addEventListener('change',function(){
				selectFile(this.files);
			});
		}	
    },	
	selectFile = function(files) 
	{		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			var file;
			
			for (var i = 0; file = files[i]; i++) {
				if (!file.type.match('image.*')) {
					continue;
				}
				
				var reader = new FileReader();
				reader.onload = function(file) {
					initCanvas(event.target.result);
				}
				reader.readAsDataURL(file);
				if (file.type.match('image.*')) {
					break;
				}
			}
		}
	},
	initCanvas = function(src)
	{
		obj.ctx = obj.cropZone.getContext('2d');			
		obj.img.onload = function() {	
			var cropZoneH = obj.options.cropZoneH;
			var cropZoneW = obj.options.cropZoneW;
			var i,
			    w,
				h;
			if(obj.img.height/obj.img.width<=cropZoneH/cropZoneW) {
				i = obj.img.width/cropZoneW;
				w = cropZoneW;
				h = parseInt(obj.img.height/i);			
			} else {
				i = obj.img.height/cropZoneH;
				h = cropZoneH;
				w = parseInt(obj.img.width/i);			
			}
			//console.log(i+"  "+w+"  "+h);
			
			obj.cropZone.width = w;
			obj.cropZone.height = h;
			obj.ctx.drawImage(obj.img,0,0,w,h);
		}	
		obj.img.src = src;
		hideDropZone();	
		showCanvas();	
		initEventsOnCanvas();
	},
	showCanvas = function()
	{
		obj.cropZone.style.display = "block";
	},
	hideCanvas = function()
	{
		obj.cropZone.style.display = "none";
	},
	showDropZone = function()
	{
		obj.dropZone.style.display = "block";
	},
	hideDropZone = function()
	{
		obj.dropZone.style.display = "none";
	},
	initEventsOnCanvas	= function() {
		obj.ctx.canvas.addEventListener('mousedown',onMouseDown(event));
		obj.ctx.canvas.addEventListener('mouseup',onMouseUp(event));
		
		        attachEvent(obj.cropZone, 'mousedown', console.log("imgMouseDown"));
        attachEvent(obj.cropZone, 'mousemove', console.log("imgMouseMove"));
        attachEvent(document.body, 'mouseup', imgMouseUp);
        var mousewheel = (/Firefox/i.test(navigator.userAgent))? 'DOMMouseScroll' : 'mousewheel';
        attachEvent(obj.cropZone, mousewheel, console.log("zoomImage"));
	},
	onMouseDown = function(event)
	{
		console.log("onMouseDown"); //
		var loc = windowToCanvas(event.clientX, event.clientY);
		event.preventDefault();
		obj.click = true;
		if(!obj.resize) {
			obj.ctx.canvas.addEventListener('mousemove',onMouseMove(event));
			obj.downPointX = loc.x;
			obj.downPointY = loc.y;
			obj.lastPointX = loc.x;
			obj.lastPointY = loc.y;
		}
	},
	onMouseUp = function(event) 
	{
		console.log("onMouseUp"); //
	},
	onMouseMove = function() 
	{
		event.preventDefault();
		console.log("onMouseMove"); //
		
	},
	windowToCanvas = function(x, y)
	{
		var canvas = obj.ctx.canvas,
			bbox = canvas.getBoundingClientRect();
		return {
			x: x - bbox.left * (canvas.width / bbox.width),
			y: y - bbox.top * (canvas.height / bbox.height)
		};	
	},
	attachEvent = function(node, event, cb)
    {
        if (node.attachEvent)
            node.attachEvent('on'+event, cb);
        else if (node.addEventListener)
            node.addEventListener(event, cb);
    },
    detachEvent = function(node, event, cb)
    {
        if(node.detachEvent) {
            node.detachEvent('on'+event, cb);
        }
        else if(node.removeEventListener) {
            node.removeEventListener(event, render);
        }
    },
	imgMouseUp = function(e) {
		if(window.event) e.cancelBubble = true;
        else e.stopImmediatePropagation();
		console.log("imgMouseUp");
	}

	attachEvent(obj.cropZone, 'DOMNodeRemoved', function(){detachEvent(document.body, 'DOMNodeRemoved', imgMouseUp)});
	
	
    return obj;
};