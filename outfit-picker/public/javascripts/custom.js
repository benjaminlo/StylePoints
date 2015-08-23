$(document).ready(function() {
	$(".wardrobe_submit").click(function() {
   		var wardrobeuserid = document.getElementsByName('wardrobeuserid')[0].value;
   		var wardrobe = document.getElementsByName('wardrobe')[0].value;
   		var category = document.getElementsByName('category')[0].value;
    	$.ajax ({
    		type: "POST",
    		url: "/wardrobe",
    		data: {
    			wardrobeuserid: wardrobeuserid,
    			wardrobe: wardrobe,
    			category: category
    		},
    		dataType: "application/json"
    	});
    	location.reload();
	});

   $(".submit").click(function() {
   		var coats = $("input[type='radio'][name='coats']:checked").attr('value');
   		var tops = $("input[type='radio'][name='tops']:checked").attr('value');
   		var bottoms = $("input[type='radio'][name='bottoms']:checked").attr('value');
   		var shoes = $("input[type='radio'][name='shoes']:checked").attr('value');
   		var outfitId = coats + ":" + tops + ":" + bottoms + ":" + shoes;
    	$.ajax ({
    		type: "POST",
    		url: "/submit",
    		data: {
    			outfitId: outfitId,
    			userid: 0,
    			submitter: 0
    		},
    		dataType: "application/json"
    	});
        alert("Submitted outfit.")
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

    $(".style").click(function() {
    	var outfitId = $(this).attr('name');
    	$.ajax ({
    		type: "POST",
    		url: "/style",
    		data: {
    			outfitId: outfitId
    		},
    		dataType: "application/json"
    	});
    	location.reload();
    });
});