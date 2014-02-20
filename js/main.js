$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();





		$('#checkBox').click(function() {
       	 if (!$(this).is(':checked')) {
          	  $('#repeatin').hide(); 
         	   } else{
            	$('#repeatin').show();
          	  }
       	});

       	 var date;
       	 $(document).on('change','#datepicker',function(){
       	 	date = $(this).datepicker({ dateFormat: 'dd-mm-yy' }).val();
       	 	alert ("Сегодня " + date);
       	 });

});