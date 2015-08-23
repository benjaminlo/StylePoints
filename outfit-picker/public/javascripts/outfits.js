$(document).ready(function() {
	$.get("/outfits", function(data) {
        for(i in data) {
            $("body").append("<div class=\"coats\"><h3>Outfit suggested by " + data[i].userid + "</h3><p class=\"outfit" + i + "\"></p></div>");
            for(j in data[i].items) {
                $(".outfit" + i).append("<img alt=\"" + data[i].items[j] + "\" src=\"https://bnc.lt/stylepoints-" + data[i].items[j] + "\"/>");
            }
        }
    });
});