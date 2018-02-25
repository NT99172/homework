



var excuteCalculation = function(thisCalculator) {
	var inputData = $('.result_box', thisCalculator)[0].value;
	var resultData = eval(inputData);
	$('.result_box', thisCalculator)[0].value = resultData;
}


$('.number, .calculate, .dot').on('click', function(){
	var thisCalculator = $(this).parents('.calculator');
	var currentValue = $('.result_box', thisCalculator)[0].value;
	var inputValue = $(this)[0].innerText;
	
	if($(this).hasClass('number') && currentValue == 0 || currentValue < 0){
		currentValue = '',
		$('.result_box', thisCalculator)[0].value = currentValue
	}

	var resultValue = currentValue + inputValue;
	$('.result_box', thisCalculator)[0].value = resultValue; 
});

$('.equal').on('click', function(){
	var thisCalculator = $(this).parents('.calculator');
	excuteCalculation(thisCalculator);
});

$('.reset').on('click', function() {
	var resetValue = 0;
	var thisCalculator = $(this).parents('.calculator');
	$('.result_box', thisCalculator)[0].value = resetValue;
});
 
