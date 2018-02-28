$(document).ready(function() {
    
    function fileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var files = evt.dataTransfer.files;
	 
			var result = '';
			var file;

			for (var i = 0; file = files[i]; i++) {
				
				// if the file is not an image, continue
				if (!file.type.match('image.*')) {
					continue;
				}
	 
				reader = new FileReader();
				reader.onload = (function (tFile) {
					return function (evt) {
						var div = document.createElement('div');
						dropTarget.innerHTML = '<img style="max-width: 100%; position: relative"; src="' + evt.target.result + '" />';
						document.getElementById('filesInfo').appendChild(div);
					};
				}(file));
				reader.readAsDataURL(file);
				
				result += '<li>' + file.name + ' ' + file.size + ' bytes</li>';
			}
			document.getElementById('filesInfo').innerHTML = '<ul>' + result + '</ul>';
		} else {
			alert('The File APIs are not fully supported in this browser.');
		}
	}
 
	function dragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}
	 
	var dropTarget = document.getElementById('dropTarget');
	dropTarget.addEventListener('dragover', dragOver, false);
	dropTarget.addEventListener('drop', fileSelect, false);
    
});