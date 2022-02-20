/*
	d3.js domain diagram for project portfolio
*/

var dwidth = 600;
var dheight = 400;
var xpd = 40;
var ypd= 30;

//Make Tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

//Grab canvas
var canv = d3.select(".canvas");
canv.attr("width", dwidth).attr( "height",dheight);

//Scale - Position X/Y
var sposx = d3.scaleLinear().domain([-1,1]).range([0+xpd,dwidth-xpd]);
var sposy = d3.scaleLinear().domain([-1,1]).range([0+ypd,dheight-ypd]);
//Scale - Colors
var scols = d3.scaleLinear().domain([0,0.25,0.5,0.75,1]).range([d3.rgb(250,0,0),d3.rgb(0,0,250),d3.rgb(0,150,0),d3.rgb(200,200,0),d3.rgb(220,0,0)]);

/*
for (i = -10; i < 10; i++) {
for (j = -10; j < 10; j++) {
	projs.push({"x": i/10,"y": j/10});
}
}*/

/*

Make base diagram with arcs and words

*/
var arcs = [
{startAngle: 0,  endAngle: 0.5 * Math.PI, item: "Science"},
{startAngle: 0.5 * Math.PI,  endAngle: 1 * Math.PI, item: "Engineering"},
{startAngle: 1 * Math.PI,  endAngle: 1.5 * Math.PI, item: "Design"},
{startAngle: 1.5 * Math.PI,  endAngle: 2 * Math.PI, item: "Art"}];

var arcGenerator = d3.arc().innerRadius(105).outerRadius(110).cornerRadius(5).padAngle(.07);
canv.selectAll('path')
	.data(arcs)
	.enter()
	.append('path')
	.attr('d', arcGenerator)
	.style("fill", function(d) {
	var ang = (d.startAngle+d.endAngle)/(4*Math.PI)+0.125;
		return scols(ang); 
		})
	.attr("transform", "translate("+dwidth/2+","+dheight/2+")")
canv.selectAll('text')
	.data(arcs)
	.enter()
	.append("text")
	.attr("x", function(d) { return dwidth/2+200*Math.cos(d.startAngle-Math.PI/4); })
	.attr("y", function(d) { return dheight/2+200*Math.sin(d.startAngle-Math.PI/4); })
	.text( function (d) { return d.item; })
	.attr("font-size", "20pt")
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle")
	.style("fill", function(d) {
	var ang = (d.startAngle+d.endAngle)/(4*Math.PI)+0.125;
		return scols(ang); 
	});
	
/*

Make projects with interaction

*/
var circs = canv.selectAll("circle").data(projs);

circs.enter().append("circle")
    .attr("cx", function(d) { return sposx(d.x); })
    .attr("cy", function(d) { return sposy(d.y); })
    .attr("r", 10)
	.style("fill", function(d) {
		var ang = Math.atan2(d.y,d.x)/(2*Math.PI)+0.5-0.125;
		if (ang<0) {ang=ang+1;}
		d.col = scols(ang);
		return scols(ang); 
	})
	.on("mouseover", function(d) {	
			l=d3.hsl(d.col).l;
            div.transition()		
                .duration(200)
				.style("opacity", .9)
                .style("background-color", d.col)
				.style("color", d3.hsl(0,0, (l<0.25) ? 0.625 : ((l<0.5) ? 0.875: ((l<0.75) ? 0.125 : 0.375))));	//Make the font color dynamic
            div	.html(d.name)	
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 25) + "px");
            })
	.on("mouseout", function(d) {
		div.transition()
			.duration(200)
			.style("opacity", 0);
	})
	.on("click", function(d) {
		if (d.index!=-1){
			if (gal.isSlideshowVisible) {gal._closeSlideshow();}
			gal._openSlideshow(d.index);
		}else{
			div.html(d.name+"- to be included")
		}
	});
wobble();
	
function wobble() {	
	dx=25;
    canv.selectAll("circle").transition().ease(d3.easeElasticInOut).duration(3000)
		.attr("cx", function(d) { return sposx(d.x)+dx*Math.random()-dx/2; })
		.attr("cy", function(d) { return sposy(d.y)+dx*Math.random()-dx/2; })
		.on("end", function() {wobble();});
}
