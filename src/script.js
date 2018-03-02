/**
 * created by e.danilova@playa.ru 01.03.2018
 */
'use strict'

function imageEditor(options) {
	this.ratio = options.ratio;
	var dropZone = document.getElementById(options.dropZone);
	
	this.addDragEvents = function() {	
		dropZone.addEventListener('dragover',function(){
			event.preventDefault();
			event.stopPropagation();
			event.dataTransfer.dropEffect = 'copy';			
		},false);
		
		dropZone.addEventListener('drop',function(){
			event.preventDefault();
			event.stopPropagation();
			selectFile();
		},false);		
	}
	
	var selectFile = function() {		
		if(window.File && window.FileReader && window.FileList && window.Blob) {
			//console.log('drag and drop is worked');
			var files = event.dataTransfer.files;
			var file;
			
			for (var i = 0; file = files[i]; i++) {
				//console.log(i);
				//console.log(file);
				if (!file.type.match('image.*')) {
					continue;
				}
				
				var reader = new FileReader();
				reader.onload = function(file) {										
					dropZone.innerHTML = '<img style="max-width: 100%; position: relative"; src="' + event.target.result + '" />';					
					console.log(dropZone);
				}
				reader.readAsDataURL(file);
			}
			
		}
	}
};
