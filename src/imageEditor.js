/**
 * created by e.danilova@playa.ru 01.03.2018
 */
'use strict'

function imageEditor(options) {
	this.ratio = options.ratio;
	var dropZone = document.getElementById(options.dropZone);
	var previewZone = document.getElementById(options.previewZone);
	var inputZone = document.getElementById(options.inputZone);
	var labelZone = document.getElementById(options.labelZone);
	
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
					dropZone.style.paddingTop = "20px";
					labelZone.style.display = "none";
					previewZone.style.display = "block";
					previewZone.src = event.target.result;
					console.log(previewZone);
					console.log(dropZone);
				}
				reader.readAsDataURL(file);
			}
			
		}
	}
};
