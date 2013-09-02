
 $( document ).on( "mobileinit",
    // Set up the "mobileinit" handler before requiring jQuery Mobile's module
    function() {
      // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
      $.mobile.linkBindingEnabled = false;

      // Disabling this will prevent jQuery Mobile from handling hash changes
      $.mobile.hashListeningEnabled = false;
       alert('o')
    }
  ); 


$(function () {
   
    var servicesLst = new ServicesList();
    var srvLV = new ServicesListView({ collection: servicesLst });
     
          //search
    // $('nav').prepend('<div  data-role="fieldcontain"> <label for="search-2">Search Input:</label> <input type="search" name="search-2" id="search-2" value=""></div>')//new SearchView().render().el);
    
    //loading animation               
    $.mobile.loading('show', {
        text: 'request sended',
        textVisible: true,
        theme: 'e',
        textonly: false
    });
    //fetch the servvices from xml
    servicesLst.fetch({        
        complete: function (xhr, textStatus) {
		    $.mobile.loading('hide');
            switch (xhr.status) {
                case 404:
                    textStatus = 'no xml file found at the path'
                    break;
				case 200:
				   if(textStatus=='success')
					  return;				   
				   break;
            }
            $('#main').html('<span style="color:red">Cannot load the XML - ' + textStatus + '</span>');            
        }
    });
});
