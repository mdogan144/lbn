$(document).ready(function() {
	$('form#contact-us').submit(function() {
		$('form#contact-us .error').remove();
		var hasError = false;
		$('.requiredField').each(function() {
			if($.trim($(this).val()) == '') {
				var labelText = $(this).prev('label').text();
				$(this).parent().append('<label class="error">Your forgot to enter your '+labelText+'.</label>');
				$(this).addClass('inputError');
				hasError = true;
			} else if($(this).hasClass('email')) {
				var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
				if(!emailReg.test($.trim($(this).val()))) {
					var labelText = $(this).prev('label').text();
					$(this).parent().append('<label class="error">Sorry! You\'ve entered an invalid '+labelText+'.</label>');
					$(this).addClass('inputError');
					hasError = true;
				}
			}
		});
		if(!hasError) {
			var formInput = $(this).serialize();
			$.post($(this).attr('action'),formInput, function(data){
				$('form#contact-us').slideUp("fast", function() {				   
					$(this).before('<p class="tick"><strong>Thanks!</strong> Your email has been delivered.</p>');
				});
			});
		}
		
		return false;	
	});
});