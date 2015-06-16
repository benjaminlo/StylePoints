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
    	location.reload();
	});

    $(".save").click(function() {
    	var outfitId = $(this).attr('name');
    	var submitter = $(this).attr('submitter');
    	$.ajax ({
    		type: "POST",
    		url: "/save",
    		data: {
    			outfitId: outfitId,
    			submitter: submitter
    		},
    		dataType: "application/json"
    	});
    	location.reload();
    });

    $(".delete").click(function() {
    	var outfitId = $(this).attr('name');
    	$.ajax ({
    		type: "POST",
    		url: "/delete",
    		data: {
    			outfitId: outfitId
    		},
    		dataType: "application/json"
    	});
    	location.reload();
    });
});