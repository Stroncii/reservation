$(function() {
      $("#datepicker").datepicker();
      $( "#slider" ).slider({
      min: 8,
      max: 18,
      range: true,
      values: [ 10, 16 ],
      slide: function( event, ui ) {
      $( "#amount" ).val( ui.values[ 0 ] + ":00 - " + ui.values[ 1 ] + ":00" );
      }
      });
      $( "#amount" ).val( $( "#slider" ).slider( "values", 0 ) +
      ":00 - " + $( "#slider" ).slider( "values", 1 ) + ":00" );
      $( "#sliderday" ).slider({
      min: 1,
      max: 14,
      values: [ 7 ],
      slide: function( event, ui ) {
      $( "#amount1" ).val( ui.values[ 0 ] );
      }
      });
      $( "#amount1" ).val($( "#sliderday" ).slider( "values", 0 ));
      $( "#slidercount" ).slider({
      min: 1,
      max: 14,
      values: [ 7 ],
      slide: function( event, ui ) {
      $( "#amount2" ).val( ui.values[ 0 ] );
      }
      });
      $( "#amount2" ).val($( "#slidercount" ).slider( "values", 0 ));
      });