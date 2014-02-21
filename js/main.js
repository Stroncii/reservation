$(document).ready(function(){

		$('#repeatin').hide();
		$('#table').hide();
		var dateObject = $("#datepicker").datepicker("getDate");
		var dateString = $.datepicker.formatDate("dd-mm-yy", dateObject);





		$('#checkBox').click(function() {
       	 if (!$(this).is(':checked')) {
          	  $('#repeatin').hide(); 
         	   } else{
            	$('#repeatin').show();
          	  }
       	});

       	 var date;
       	 $(document).on('change','#datepicker',function(){
       	 	date = $(datepicker).datepicker({ dateFormat: 'dd-mm-yy' }).val();
       	 	console.log(date);
       	 });

});