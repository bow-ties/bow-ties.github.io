from os import listdir

arts = [filename for filename in listdir() if "art_" in filename]
arts.sort(reverse=True)
    
with open("../portfolio.html",'w',encoding="utf8") as mainfile:
    #Header
    with open("port_head.html",'r',encoding="utf8") as head:
        mainfile.write(head.read())
        
    #Overview
    for art in arts:
        mainfile.write("\n<li><figure>\n")
        with open(art,'r',encoding="utf8") as file:
            mainfile.write(file.readlines()[1])
        mainfile.write("</figure></li>")

    #Middle
    with open("port_mid.html",'r',encoding="utf8") as mid:
        mainfile.write(mid.read())
        
    #Gallery 
    for art in arts:
        mainfile.write("\n<li>\n<figure>\n")
        with open(art,'r',encoding="utf8") as file:
            for line in file.readlines()[2:]:
                mainfile.write(line)
        mainfile.write("\n</figure>\n</li>")
    #Footer
    with open("port_foot.html",'r',encoding="utf8") as foot:
        mainfile.write(foot.read())
        
    mainfile.write("""
<script>
		var gal = new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		var projs = [
			{"x": 0.4,"y": -0.64,"name": "Chemistry Magic Shows", "index":-1},
			{"x": 0.5,"y": -0.43,"name": "Atomic Physics Splash Courses", "index":-1},
			{"x": 0,"y": 0.3,"name": "Maker Mentoring", "index":-1},
            """)
    for i in range(len(arts)):
        with open(arts[i],'r',encoding="utf8") as file:
            mainfile.write(file.readlines()[0][:-2]+",\"index\":"+str(i)+"},\n")
    mainfile.write("""
        		];
        	</script>
        	<script src="js/diagram.js"></script>
        </body>
        </html>
        """)