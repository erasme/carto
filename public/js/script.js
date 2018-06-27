$( document ).ready(function() {
    circle = $('svg .circle');

    $.getJSON( "../data.json", function( data ) {
      $.each(data.locations, function(json) {
        points = data.locations[json];
        coord = points.coordinates.split(",");
        console.log(points.coordinates);
        console.log(coord);
        $(".col-2").append('<div id="circle'+json+'" class="circle"></div>');
        $("#circle"+json).css({top: coord[0], left: coord[1], background: points.color });

        // SVG TEST
        $("svg").append('<circle id="circle'+json+'" cx="'+coord[0]+'" cy="'+coord[1]+'" r="30" fill="red"');

        $('#circle'+json).draggable({
          containment: "parent"
        });
    
      })
    });

});
