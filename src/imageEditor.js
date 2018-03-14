/**
 * created by e.danilova@playa.ru 01.03.2018
 */
'use strict';
var imgEditor = function(options){
    var options = options,	
    obj =
    {
		selectionX: 0,
		selectionY: 0,
		selectionW: 0,
		selectionH: 0,
		ctx : '',
        ratio : 1,
        options : options,
        editorZone : document.getElementById(options.editorZone),
		controlsZone : document.getElementById(options.controlsZone),
		dropZone : document.getElementById(options.dropZone),
		inputZone : document.getElementById(options.inputZone),
		cropZone : document.getElementById(options.cropZone),
		imageZone : document.getElementById(options.imageZone),
		previewZone : document.getElementById(options.previewZone),
        img : new Image(),
		addDropEvents: function(event) {
			event.preventDefault();
			event.stopPropagation();
			selectFile(event.dataTransfer.files);
		},
		addDragoverEvents : function (event) {
				event.preventDefault();
				event.stopPropagation();
				event.dataTransfer.dropEffect = 'copy';			
		},
		addInputEvents: function(th) {
				selectFile(th.files);
		},
		updateSelection : function(x,y,w,h) {	
			var ind = this.img.width/document.getElementById("imageEditorImg").width;			
			this.selectionX = parseInt(ind*x);
			this.selectionY = parseInt(ind*y);
			this.selectionW = parseInt(ind*w);
			this.selectionH = parseInt(ind*h);		
		},
		getData : function() {
			if(this.selectionH>1 & this.selectionW>1) {
				document.getElementById("editorBtnCancel").style.display = 'inline'
				document.getElementById("editorBtnCrop").style.display = 'none'
				this.cropZone.width = this.selectionW;
				this.cropZone.height = this.selectionH;
									
				this.ctx = this.cropZone.getContext('2d');					
				this.ctx.drawImage(this.img,this.selectionX,this.selectionY,this.selectionW,this.selectionH,0,0,this.selectionW,this.selectionH);			
				var cropData = this.cropZone.toDataURL("image/png");
				//this.cropZone.style.display = "block";
				this.previewZone.src = cropData;
				hideImageZone();
				showPreviewZone();				
			}
			return cropData;
		},
		deleteImg : function() {
			document.getElementById("editorBtnCrop").style.display = 'inline'			
			this.img = new Image();
			this.selectionX = 0;
			this.selectionY = 0;
			this.selectionW = 0;
			this.selectionH = 0;
			this.ctx = '';
			this.imageZone.src = '';
			this.previewZone.src = '';			
			showDropZone();
			hideImageZone();
			hideControlsZone();
			hidePreviewZone();
		},
		cancelCrop : function() {
			this.selectionX = 0;
			this.selectionY = 0;
			this.selectionW = 0;
			this.selectionH = 0;
			document.getElementById("editorBtnCrop").style.display = 'inline'
			showImageZone();
			hidePreviewZone();
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
					initImg(file.target.result);	
				}
				reader.readAsDataURL(file);
		
				if (file.type.match('image.*')) {
					break;
				}
			}
		}
	},
	initImg = function(src)
	{
		hideDropZone();
		showControlsZone();
		obj.img.src = src;
		document.getElementById("imageEditorImg").src = src;
		document.getElementById("imageEditorImg").style.display = "block";			
	},
	showDropZone = function()
	{
		obj.dropZone.style.display = "block";
	},
	hideDropZone = function()
	{
		obj.dropZone.style.display = "none";
	},
	showImageZone = function()
	{
		obj.imageZone.style.display = "block";
	},
	hideImageZone = function()
	{
		obj.imageZone.style.display = "none";
	},
	showPreviewZone = function()
	{
		obj.previewZone.style.display = "block";
	},
	hidePreviewZone = function()
	{
		obj.previewZone.style.display = "none";
	},	
	showControlsZone = function()
	{
		obj.controlsZone.style.display = "block";
		document.getElementById("editorBtnCancel").style.display = 'none';
	},
	hideControlsZone = function()
	{
		obj.controlsZone.style.display = "none";
	}
	
    return obj;
};