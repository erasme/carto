// The svg to append
var $svg = $("svg");

// Featured image location params
var featuredLocX = 800;
var featuredLocY = 150;
var featuredPointSpacing = 0;

var steps = 0;


$(document).ready(function () {

  // GET THE DATA
  $.getJSON("/carto/api.php/spreadsheet/", function (data) {
    i = 0;
    idName = 0;


    // Get the number of Featured points to display the on a circle
    $.each(data, function (index, category) {
      $.each(category.projects, function (index, projects) {
        $.each(projects.locations, function (index, locations) {
          coord = locations.coordinates.split(",");
          if (coord[index] === undefined || coord[index].length == 0) { }
          else {
            //Display the picture point
            if (locations.subtitle.length === 0 || locations.url.length === 0) {
            }
            else {
              steps++;
            }
          }
        });
      });
    });

    $.each(data, function (index, category) {
      //console.log(category);
      i++;
      // Number of panels by column
      if (i <= 4) {
        legendDisplay("col-1", category);
      }
      else {
        legendDisplay("col-3", category);
      }
      //console.log(category.projects);


      // GET AND DISPLAY THE POINTS
      $.each(category.projects, function (index, projects) {
        //console.log(projects.locations);

        $.each(projects.locations, function (index, locations) {
          //console.log(locations);
          coord = locations.coordinates.split(",");
          var pointCoord = {'x': coord[0], 'y': coord[1] };
          // If location has no coordinates
          if (coord[index] === undefined || coord[index].length == 0) { }
          else {
            //Display the picture point
            if (locations.subtitle.length === 0 || locations.url.length === 0) {
              drawPoint(pointCoord.x, pointCoord.y, category.color);
              dragSvg('.point');
            }
            else {

              idName++;
              drawPoint(pointCoord.x, pointCoord.y, category.color);
              var featuredP = FeaturedPointCoord = drawFeaturedPoint(locations.url, category.color, featuredLocX-100, featuredLocY+featuredPointSpacing);
              drawFeaturedText(idName,locations.subtitle, featuredLocX-100, featuredLocY+featuredPointSpacing+10);
              console.log(locations.subtitle);
              featuredLocY = featuredLocY + 50;
              drawLine(pointCoord.x, pointCoord.y,featuredP.x, featuredP.y, category.color );
      
              console.log(pointCoord.x);
              $('.featured-point').each(function () {
              });
              featuredPointSpacing += 300/steps;
            }
          
          }
        });
      });

    })
  });
});

/**
 * Left and right side legend display
 * @param {string} colClass the class name of the column
 * @param {object} category an object with color and a string value
 */
function legendDisplay(colClass, category) {
  if (category.title || category.color){
    $('.' + colClass)
      .append('<div class="panel">\
          <div style="background-color:'+ category.color + ' "  class=" card title">' + category.title + '</div>\
          <div style="border-color:'+ category.color + ' " class="card"><span>'+ isUrl(category.key_1, category.color) + '</span><p>' + category.value_1 + '</p></div>\
          <div style="border-color:'+ category.color + ' " class="card white"><span>'+ isUrl(category.key_2, category.color) + '</span><p>' + category.value_2 + '</p></div>\
          <div style="border-color:'+ category.color + ' " class="card"><span>'+ isUrl(category.key_3, category.color) + '</span> <p>' + category.value_3 + '</p></div>')
  }
}


/**
 * Checks if value is an url and outputs an html image
 * @param {string} value url
 * @param {string} color 
 */
function isUrl(value = "0", color = "black") {
  var urlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var hexPattern =  /^[\w,\s-]+\.[A-Za-z]{3}$/g;
  var isNumber = /^[0-9]*$/g;


  if(value.match(urlPattern)){
    return '<img src="' + value + '">';
  }
  else if(value.match(isNumber)){
    return '<p class="number" style="color: ' + color + '">' + value + '</p>';
  }
  else {
    return '<i style="color: ' + color + '" class="fa fa-'+ value +'"></i>';
  }
}

// Initiate the SVG
function SVG(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

/**
 *  Draws a point on the svg map
 * @param {number} x 
 * @param {number} y 
 * @param {string} color 
 */
var drawPoint = function (x, y, color) {
  $(SVG('circle'))
    .attr('class', 'point')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 7)
    .attr('fill', color)
    .appendTo($svg);
    console.log("POINT !")
};

/**
 * Draws a line on the svg between featured image and point marker
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 * @param {string} color 
 */
var drawLine = function (x1, y1, x2, y2, color) {
  $(SVG('line'))
    .attr('class', 'line')
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)
    .attr('style', "stroke:"+color+";stroke-width:3")
    .appendTo($svg);
};


/**
 * Draws a picture point on the svg map
 * @param {string} url 
 * @param {string} color 
 * @param {number} angle 
 */
var drawFeaturedPoint = function (url,color, x, y) {

  // Calculate the right xy to place the featuredPoint following a cirlce path
  //var x = center_x + radius * Math.cos(angle*Math.PI/180) * 1;
  //var y = center_y + radius * Math.sin(angle*Math.PI/180) * 1;
  //console.log('x : '+ x + 'y :' + y);
  var $svg = $("svg");

  // Vertical line
  $(SVG('line'))
    .attr('class', 'line')
    .attr('x1', x+50)
    .attr('y1', y+80)
    .attr('x2', x+50)
    .attr('y2', y+30)
    .attr('style', "stroke:"+color+";stroke-width:3")
    .appendTo($svg);

  // Horizontal line
  $(SVG('line'))
    .attr('class', 'line')
    .attr('x1', x-50)
    .attr('y1', y+55)
    .attr('x2', x+50)
    .attr('y2', y+55)
    .attr('style', "stroke:"+color+";stroke-width:3")
    .appendTo($svg);  

  $(SVG('image'))
    .attr('class', 'featured-point')
    .attr('href', url)
    .attr('width', '70')
    .attr('x', x+60)
    .attr('y', y+20)
    .attr('fill', color)
    .appendTo($svg);

    return linelocations = {"x": x-50, "y": y+55};

};
/**
 * Displays the info text next to the featured images
 * @param {string} idName 
 * @param {string} subtitle 
 * @param {number} angle 
 */
var drawFeaturedText = function(idName, subtitle, x, y) {


  // Calculate the right xy to place the featuredPoint following a cirlce path
  //var x = center_x + Textradius * Math.cos(angle*Math.PI/180) * 1;
  //var y = center_y + Textradius * Math.sin(angle*Math.PI/180) * 1;

    //Put the string into lines of text for svg display
    var words = subtitle.split(' ');
    //var lines = [];
    var lines = subtitle.replace(/(.{20})/g, "$1|").split("|");
    console.log(lines);
    var buffer = '';
    var a = 3;
    /*$.each(words, function (index, word) {
      if (index == a) {
        buffer = buffer + word + ' ';
        lines.push(buffer);
        a = a + a;
        buffer = "";
      }
      else {
        buffer = buffer + word + ' ';
      }
    });*/
    //console.log(buffer);
    //console.log(lines);

  $(SVG('text'))
    .attr('id', 'featured-text-' + idName)
    .attr('font-size', '10')
    .append(subtitle)
    .attr('x', x+140)
    .attr('y', y+50)
    .appendTo($svg);
  //$('#featured-text-'+idName).append(subtitle);
  /*$.each(lines, function(index,sentence) {
    console.log("SENTENCE :"+ sentence);
    //$('#featured-text-'+idName).append(sentence);
    //$('#featured-text-'+idName).append('<tspan dx="100" dy="100">LOL</tspan>');
  });*/
  coord = {"x": x, "y": y};
  return coord;

}

/**
 * Makes an SVG element draggable   
 * @param {string} element id of the element to drag
 */
function dragSvg(element) {  
  Draggable.create(element, {
    type: "x,y",
    bounds: "svg",
    overshootTolerance: 0,
    throwProps: true,
    onDragEnd: function () {
      console.log('Drag ended');
      // Find your root SVG element
      var svg = document.querySelector('svg');

      // Create an SVGPoint for future math
      var pt = svg.createSVGPoint();

      // Get point in global SVG space
      function cursorPoint(evt = "ondragend") {
        pt.x = evt.clientX; pt.y = evt.clientY;
        console.log(pt.matrixTransform(svg.getScreenCTM().inverse()));
        return pt.matrixTransform(svg.getScreenCTM().inverse());
      }
      
      svg.addEventListener('mousemove', function (evt) {
        var loc = cursorPoint(evt);
        // Use loc.x and loc.y here
        //console.log(parseInt(loc.x));
      }, false);

    }
  });
}