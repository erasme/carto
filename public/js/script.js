$( document ).ready(function() {

    // GET THE DATA
    $.getJSON( "../exemple.json", function( data ) {
      i=0;
      $.each(data, function(index,category) {
        //console.log(category);
        i++;
        if (i<= 4){
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
              }
              else {
                  console.log(locations.subtitle);
                  console.log(locations.url);
                  drawFeaturedPoint(locations.subtitle, locations.url, coord[0], coord[1], category.color);
                  
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
        <div class="card"><span>'+isUrl(category.key_1)+'</span><p>'+category.value_1+'</p></div>\
        <div class="card white"><span>'+isUrl(category.key_2)+'</span><p>'+category.value_2+'</p></div>\
        <div class="card"><span>'+isUrl(category.key_3)+'</span> <p>'+category.value_3+'</p></div>')
       
}

// Checks if value is an url and outputs an html image
function isUrl(value="0") {
  var pattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if(value.match(pattern)) {
    console.log('Is URL');
    return '<img src="'+value+'">';
  }
  else{
    console.log('Is number value')
    return '<p class="number blue-text">'+value+'</p>';
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
var drawFeaturedPoint = function(subtitle,url,x,y,color) {

  //Put the string into lines of text for svg display
  var test = '';
    var words = subtitle.split(' ');
    var lines = [];
    var buffer = '';
    var a = 4;
    //console.log(words);
    for (i=0; i<= words.length; i++){
      if (i === a){
        for(a=0; a< 2; a++) {
          buffer = buffer + words[i] + ' ';
        }
        a = i+a;
        lines.push(buffer);
        buffer = '';
      }
    }
    console.log(lines);

  var $svg = $("svg");
  $(SVG('image'))
    .attr('class', 'featured-point')
    .attr('href', url)
    .attr('width', '100')
    .attr('x', x)
    .attr('y', y)
    .attr('fill', color)
    .appendTo($svg);
    
  $(SVG('text'))
    .attr('id', 'featured-text')
    .attr('font-size', '18')
    .attr('font-family', 'Open Sans Regular')
    .attr('x', x)
    .attr('y', y)
    .appendTo($svg);
  $('#featured-text').append(subtitle);

};
