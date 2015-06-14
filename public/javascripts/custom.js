$(document).ready(function() {
   $(".submit").click(function() {
   		var data = document.getElementsByName('data')[0].value;
   		var userid = document.getElementsByName('userid')[0].value;
   		var submitter = document.getElementsByName('submitter')[0].value;
    	$.ajax ({
    		type: "POST",
    		url: "/submit",
    		data: {
    			data: data,
    			userid: userid,
    			submitter: submitter
    		},
    		dataType: "application/json"
    	});
	});

    $(".save").click(function() {
    	var outfitId = $(this).attr('name');
    	$.ajax ({
    		type: "POST",
    		url: "/save",
    		data: {
    			outfitId: outfitId
    		},
    		dataType: "application/json"
    	});
    });
});