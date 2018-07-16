$( document ).ready(function() {

    // GET THE DATA
    $.getJSON( "../exemple.json", function( data ) {
      i=0;
      idName = 0;
      $.each(data, function(index,category) {
        //console.log(category);
        i++;
        // Number of panels by column
        if (i<= 3){
          legendDisplay("col-1", category);
        }
        else {
          legendDisplay("col-3", category);
        }
        //console.log(category.projects);

        // GET AND DISPLAY THE POINTS
        $.each(category.projects, function(index,projects) {
          //console.log(projects.locations);
          $.each(projects.locations, function(index,locations) {
            //console.log(locations);
            coord = locations.coordinates.split(",");

            // If location has no coordinates
            if(coord[index] === undefined || coord[index].length == 0){}
            else {

              //Display the picture point
              if(locations.subtitle.length === 0 || locations.url.length === 0){
                drawPoint(coord[0], coord[1], category.color);
                dragSvg('.point');
              }
              else {
                idName++;
                  console.log(locations.subtitle);
                  console.log(locations.url);
                  drawFeaturedPoint(locations.subtitle, locations.url, coord[0], coord[1], category.color, idName);
                  console.log('INDEX : ' + idName)
                  dragSvg('.featured-point');
                  $('.featured-point').each(function() {
                  })
              }
              console.log(coord);
            }
          });
        });
        
      })
    });
});

// Left and right side legend display
function legendDisplay(colClass, category){
  $('.'+colClass)
        .append('<div class="panel">\
        <div  style="background-color:'+category.color+' "  class=" card title">'+category.title+'</div>\
        <div class="card"><span>'+isUrl(category.key_1, category.color)+'</span><p>'+category.value_1+'</p></div>\
        <div class="card white"><span>'+isUrl(category.key_2, category.color)+'</span><p>'+category.value_2+'</p></div>\
        <div class="card"><span>'+isUrl(category.key_3, category.color)+'</span> <p>'+category.value_3+'</p></div>')
       
}

// Checks if value is an url and outputs an html image
function isUrl(value="0", color="black") {
  var pattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if(value.match(pattern)) {
    console.log('Is URL');
    return '<img src="'+value+'">';
  }
  else{
    console.log('Is number value')
    return '<p class="number" style="color: '+color+'">'+value+'</p>';
  }
}

// Insert point into  the svg map
function SVG(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

// Draws a point on the svg map
var drawPoint = function(x,y,color) {
      var $svg = $("svg");
      $(SVG('circle'))
          .attr('class', 'point')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 10)
          .attr('fill', color)
          .appendTo($svg);
};

// Draws a picture point on the svg map
var drawFeaturedPoint = function(subtitle,url,x,y,color, idName) {

  x = parseInt(x);
  y = parseInt(y);

  //Put the string into lines of text for svg display
    var words = subtitle.split(' ');
    var lines = [];
    console.log(words);
    var buffer = '';
    var a = 3;
    $.each(words, function(index,word) {
      if(index == a){
        buffer = buffer + word + ' ';
        lines.push(buffer);
        a = a+a;
        buffer = "";
      }
      else {
        buffer = buffer + word + ' ';
      }
    });
    console.log(buffer);
    console.log(lines);

  var $svg = $("svg");
  $(SVG('image'))
    .attr('class', 'featured-point')
    .attr('href', url)
    .attr('width', '150')
    .attr('x', x)
    .attr('y', y)
    .attr('fill', color)
    .appendTo($svg);
    
  $(SVG('text'))
    .attr('id', 'featured-text-'+idName)
    .attr('font-size', '18')
    .attr('font-family', 'Open Sans Regular')
    .attr('x', x)
    .attr('y', y = y +150)
    .appendTo($svg);
 //$('#featured-text-'+idName).append(subtitle);
  /*$.each(lines, function(index,sentence) {  
    $('#featured-text-'+idName).append('<tspan x="'+x+'" dy="15">'+sentence+'</tspan>');
  });*/
  $('#featured-text-'+idName).append(' <tspan x="100" dy="15">Dispositif transdisciplinaire visant à </tspan>');

};


function dragSvg(element){
  // Makes the point draggable       
  Draggable.create(element, {
    type:"x,y",
    bounds:"svg",
    overshootTolerance:0,
    throwProps:true,
    onDragEnd: function() {
      console.log('Drag ended');
      console.log(this.x);

      mouseLocation();

      /*var realCoord = this.x.getScreenCTM().inverse();
      console.log('REAl COORD :' + realCoord);*/
    }
    });
}


function mouseLocation() {
  // Find your root SVG element
  var svg = document.querySelector('svg');

  // Create an SVGPoint for future math
  var pt = svg.createSVGPoint();

  // Get point in global SVG space
  function cursorPoint(evt="ondrag"){
    pt.x = evt.clientX; pt.y = evt.clientY;
    console.log(pt.matrixTransform(svg.getScreenCTM().inverse()));
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  svg.addEventListener('mousemove',function(evt){
    var loc = cursorPoint(evt);
    // Use loc.x and loc.y here
    //console.log(loc);
  },false);
}

/*function mouseMove(e)
{
    var mouseX, mouseY;

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    console.log('mouseX : '+ mouseX + 'mouseY : ' + mouseY);

    /* do something with mouseX/mouseY */
//}

