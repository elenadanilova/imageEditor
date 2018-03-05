/**
 * created by e.danilova@playa.ru 01.03.2018
 */
'use strict'

function imageEditor(options) {
	var ratio = options.ratio;
	var cropZoneW = options.cropZoneW;
	var cropZoneH = options.cropZoneH;
	var dropZone = document.getElementById(options.dropZone);
	var previewZone = document.getElementById(options.previewZone);
	var inputZone = document.getElementById(options.inputZone);
	var labelZone = document.getElementById(options.labelZone);
	var cropZone = document.getElementById(options.cropZone);
	//console.log(cropZone);
	
	this.addEditorEvents = function() {	
		dropZone.addEventListener('dragover',function(){
			event.preventDefault();
			event.stopPropagation();
			event.dataTransfer.dropEffect = 'copy';			
		},false);
		
		dropZone.addEventListener('drop',function(){
			event.preventDefault();
			event.stopPropagation();
			selectFile(event.dataTransfer.files);
		},false);		
		
		inputZone.addEventListener('change',function(){		
			selectFile(this.files);
		});
	}
	
	var selectFile = function(files) {		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			//console.log('drag and drop is worked');
			var file;
			
			for (var i = 0; file = files[i]; i++) {
				if (!file.type.match('image.*')) {
					continue;
				}
				
				var reader = new FileReader();
				reader.onload = function(file) {
					previewZone.src = event.target.result;
					createCropper(event.target.result);
				}
				reader.readAsDataURL(file);				
			}
			hideUpload();
			showPreview();	
			//window.setTimeout(createCropper, 2000, "create cropper");	
		}
	}
	
	var showPreview = function() {
		previewZone.style.display = "block";
	}
	
	var hidePreview = function() {
		previewZone.style.display = "none";
	}
	
	var showUpload = function() {
		dropZone.style.display = "block";
	}
	
	var hideUpload = function() {
		dropZone.style.display = "none";
	}
	
	var showCropper = function() {
		cropZone.style.display = "block";
	}
	
	var hideCropper = function() {
		cropZone.style.display = "hide";
	}
	
	var deleteSelectFile = function() {
		hidePreview();
		previewZone.src = "";
		dropZone.style.paddingTop = "140px";
		labelZone.style.display = "block";
	}
		
	var createCropper = function(src) {
		hidePreview(); //убрать
		showCropper();
		
		var context = cropZone.getContext('2d');
		
		var	img = new Image();			
		img.onload = function() {	
			var i,
			    w,
				h;
			if(img.width>=img.height) {
				i = img.width/cropZoneW;
				w = cropZoneW;
				h = parseInt(img.height/i);				
			} else {
				i = img.height/cropZoneH;
				h = cropZoneH;
				w = parseInt(img.width/i);				
			}
			var sourceX = 100;
			var sourceY = 0;
			var sourceW = 175;
			var sourceH = 150;
			
			console.log(i+"  "+w+"  "+h);
			
			cropZone.width = w;
			cropZone.height = h;
			context.drawImage(img,0,0,w,h);
		}	
		img.src = src;	
			
	}
};
