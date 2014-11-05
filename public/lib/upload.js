	var $dropzone = $('#dropzone');
	var $progress = $('#upload-progress');
	var $preview = $('#preview');
	var $fileupload = $('#upload');
	var $newLogo = $('#newLogo');
	$newLogo.hide();

	var acceptedTypes = {
	  'image/png': true,
    'image/jpeg': true,
    'image/gif': true
	};

	var support = 'draggable' in  $dropzone[0];


	function previewfile(file){
		var reader = new FileReader();
		reader.onload = function(event){
				console.log('reader loaded');
				var image = new Image();
				image.src = event.target.result;
				$preview.append(image);
		};
		reader.readAsDataURL(file);
	}

	function readfiles(files){

		var formData = new FormData();

		for(var i=0;i< files.length;i++){
			if (acceptedTypes[files[i].type] === true){
				formData.append('file', files[i]);
				//previewfile(files[i]);
			}
		}

		$.ajax({
			type: "post",
			url: '/upload',
			data: formData,
			processData: false,
			contentType: false,
			xhr: function(){
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(e){
					if (e.lengthComputable) {
						var percentComplete = (e.loaded / e.total) * 100;
						$progress.val(percentComplete);
			    }
			  }, false);
			  return xhr;
			},
			success: function(data){ 
				console.log(data); 
				// $('#dropzone').hide();
				$newLogo.attr('src', data);
				$newLogo.show();
				
			},
		});
	}

		if (window.File && window.FileReader && support){
			$dropzone[0].ondragover = function (e){
				$dropzone.addClass('hover');
				return false;
			};

			$dropzone[0].ondragleave = function(e){
				$dropzone.removeClass('hover');
				return false;
			};

			$dropzone[0].ondragend = function(e){
				$dropzone.removeClass('hover');
				return false;
			};

			$dropzone[0].ondrop = function(e){
				$dropzone.removeClass('hover');
				e.preventDefault();
				console.log(e.dataTransfer.files);
				readfiles(e.dataTransfer.files);
			}

		}else{
			$dropzone.addClass('hidden');
			$fileupload.removeClass('hidden');
	}