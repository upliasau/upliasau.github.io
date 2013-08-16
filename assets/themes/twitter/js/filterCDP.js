(function() {
	

var $inputList = $('#qualification, #location').find('input');

var $developers = $('.wrapperDeveloper');

var wrapperButtons = $('#selectedQual');

var $inputLocation = $('#location');	

	function init(){
		
		//count Result
		countResult();
		
		//count location developers
		countLocationDev();

		//checkbox is default
		$inputList.each(function(){

			this.checked = false;

		});

		//check();
		$inputList.on('click', check);

	};
	
	//count Result
	function countResult(){
		var countDev = 0;
		
		$developers.each(function(){
			
			if(!$(this).hasClass('hide')){
				countDev++;
			}
			
		});
		
		$('#amountDev').text(countDev);
	};
	
	//count location developers
	function countLocationDev(){
		
		$inputLocation.find('input').each(function(){
			
			var valueID = $(this).attr('id');
			
			var countLocation = 0;
			
			$developers.each(function(){
				
				if(!$(this).hasClass('hide') && $(this).data('location') == valueID){
					
					countLocation++;
					
				}
				return countLocation;
			});
			
			$('label[for="'+ valueID +'"]').find('.amountCityDev').text(countLocation);
			
		});
		
		
		
	};
	
	// create button 
	function createButton(checkboxID){
		
		var checkbox = $(this);
		
		var nameLabel = $('.tab-content label[for="'+ checkboxID +'"]').text();
			
		wrapperButtons.append('<span class="itemFilterBadge '+ checkboxID +'">'+ nameLabel +'<span class="removeOptionFilter">&nbsp;</span></span>')

	};
	
	// delete button 
	function deleteButton(checkboxID) {
		
		var checkbox = $(this);
		
		if(!this.checked) {
			
			$('#selectedQual').find('.'+ checkboxID +'').detach();
			
		}
		
	};
	
	// delete: click selected markers  (.removeOptionFilter)
	$(document).on('click','.removeOptionFilter', function(){
		
		var cross = $(this);
		
		var arrClass = cross.parent('.itemFilterBadge').attr('class').split(' ');
		
		var class2 = arrClass[1];
		
		$('#'+ class2 +'').prop("checked", false);
		
		cross.parent('.itemFilterBadge').remove();
		
		// check	
		check();
		
	});
	
	// check
	function check(event){
			
			amountCheck = $('#qualification, #location').find('input:checked').length;

			inputID = $(this).attr('id');

			if(this.checked){
				
				// create button 
				createButton(inputID);

				//developers prthing
				$developers.each(developerParthADD);

			} else {
				
				// delete button 
				deleteButton(inputID);

				if(amountCheck == 0) {

					$developers.removeClass('hide');
				}

				$developers.each(developerParthDelete);	
			}
			
			// count Result
			countResult();
			
			//count location developers
			countLocationDev();

	};

	//developerParthADD
	function developerParthADD(event){

		///data-badge
		var arrDataBadge = $(this).data('badge').split(';');

		var pushed = arrDataBadge.push($(this).data('location'));

			if($(this).hasClass('hide') == false){

				for(var i=0, count=0; i<3; i++){
				
					if (arrDataBadge[i] == inputID) {

						count = 1;

					} 

				}

				if(count == 0){

					$(this).addClass('hide');

				}

			}
			
		//event.preventDefault();
		
	};

	//developerParthDelete
	function developerParthDelete(){

		///data-badge
		var arrDataBadge = $(this).data('badge').split(';');

		var pushed = arrDataBadge.push($(this).data('location'));

			if($(this).hasClass('hide') == true){

				for(var i=0, count=0; i<3; i++){
					
					$inputList.each(function(){

						var id = $(this).attr('id');

						if(this.checked && arrDataBadge[i] == id){

							count++;

						}
						
					});
					 
				}

			}

		if(count == amountCheck){

			$(this).removeClass('hide');

		}
	
		//event.preventDefault();
		
	};


	//initialization
	init();

}());