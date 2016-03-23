//hotels[0].place.location

var dayBtn = '<button class="btn btn-circle day-btn newBtn" ></button>\n';
var listItem = '<div class="itinerary-item"><span class="title new-item "></span><button id="remove" class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
var newPanel = '<div class="panel-body newDay"><div><h4>My Hotel</h4><ul class="list-group" id ="booked-hotels"></ul></div><div><h4>My Restaurants</h4><ul class="list-group" id ="booked-restaurants"></ul></div><div><h4>My Activities</h4><ul class="list-group" id ="booked-activities"></ul></div></div>'
var dayCount = 1;


// function loadMap(){
//     map = new document.getElementById("google_map");
//     console.log(map);
// }

$(document).ready(function() {
	//loadMap();

    $('#hBtn').on('click', function() {

        var btnPressed = $(this).data('id');
        var elem = document.getElementById(btnPressed);

        var test = "#" + btnPressed;
        var search = test + " option:selected";
        var text = $(search).text();
        addListItem('#booked-hotels', text);

    });
    $('#aBtn').on('click', function() {

        var btnPressed = $(this).data('id');
        var elem = document.getElementById(btnPressed);

        var test = "#" + btnPressed;
        var search = test + " option:selected";
        var text = $(search).text();
        addListItem('#booked-activities', text);

    });
    $('#rBtn').on('click', function() {
        var btnPressed = $(this).data('id');
        var elem = document.getElementById(btnPressed);
        var test = "#" + btnPressed;
        var search = test + " option:selected";
        var text = $(search).text();
        addListItem('#booked-restaurants', text);

    });



    $(".day-buttons").on('click', ".day-btn", function() {
        var nextDay = $(this).text();

        var changeDay = $(".current-day");
        var removePanel = $("#day" + changeDay.text());
        removePanel.hide();
        var addPanel = $("#day" + nextDay);
        addPanel.removeClass('inactive');
        addPanel.show();
        changeDay.removeClass("current-day");
        dayHead(nextDay);
      
        $(this).addClass("current-day");
        //changeMarkers();
    });
    $('.day-buttons').on('click', "#addDay", function() {
        dayCount++;
        $("#addDay").before(dayBtn);
        $("#addDay").removeClass('current-day');
        $("#addDay").parent().find('button').removeClass("current-day");
        var nextDay = $(".newBtn");
        nextDay.text(dayCount);
        nextDay.removeClass('newBtn');
        nextDay.addClass("current-day");
        nextDay.addClass("btn"+dayCount);
        dayHead(dayCount);
        addPanel(dayCount);
    });

    $(".remove-day").on('click', function() {
        var day = getDay();
        removeDay(day);
 
    });
     $(".list-group").on('click',"#remove", function() {
     	console.log("Got in");
        $(this).parent().remove();
    });

    function getDay() {
        var day = $(".current-day").text();
        return day;
    }
    function dayHead(nextDay) {
    	day = getDay();
    	var dayTitle = $("#day-title:first-child");
        dayTitle.children("span").text('Day ' + nextDay);
        if(nextDay !== '+') {
        	changeMarkers();
        }
    }


    function addListItem(category, text) {
        var day = getDay();
        var panel = $("#day" + day);
        var list = panel.find(category);
        list.append(listItem)
        var newItem = list.find('.new-item').text(text);
        newItem.removeClass('new-item');
        addMarker(category, text);

    }
    function addPanel(nextDay) {
    	var day = getDay();
        var panel = $("#day" + day);
        panel.hide();
    	$('.panel-heading').after(newPanel);
    	var newElem = $('.newDay').removeClass('newDay')
    	newElem.attr('id', 'day'+nextDay);
    	getPanels(nextDay);
    }

    function addMarker(type, text) {
        var imageIcon;
        type = type.split('-')[1];
        if(type === 'hotels') {
        	imageIcon = '/images/lodging_0star.png';
        }
        else if(type === 'restaurants') {
        	imageIcon = '/images/restaurant.png';
        }
        else {
        	imageIcon = '/images/star-3.png';
        }
        var findArr = window[type];
        findArr.forEach(function(elem) {
            if (elem.name === text) {
                drawLocation(elem.place.location, {
                    icon: imageIcon
                });
            }
        })
    }
    function changeMarkers() {
    	console.log(markersArray);
    	for (var i = 0; i < markersArray.length; i++ ) {
    		markersArray[i].setMap(null);
  		}
    	
    	var day = $("#day-title:first-child").children("span").text();
    	day = day.split(' ')[1];
    	console.log(day);
    	//clearMarkers();
    }
    function getPanels (notThisDay) {
    	for(var i = 1; i <= dayCount; i++) {
    		if(i !== notThisDay) {
    			$("#day" + i).hide();
    			
    		}
    	}
    }
    function removeDay (removeDay) {
    	if(dayCount > 1) {
    	$('#day'+removeDay).remove();
    	$('.current-day').remove();
    		removeDay = Number(removeDay);
    		for(var i = removeDay + 1; i <= dayCount; i++) {
    			var changeDay = $("#day" + i).removeAttr('id');
    			changeDay.attr('id', 'day'+(i-1));
    			var changeBtn = $('.btn'+(i)).removeClass('btn'+(i));
    			changeBtn.text(i-1)
    			changeBtn.addClass('btn'+(i-1));
    		}
    		$('.btn1').addClass('current-day');
    		$("#day1").show();
    		dayHead(1);
    		dayCount--;
    	}
    	else {
    		alert('cannot remove');
    	}
    	
    }

});