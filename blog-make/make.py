from os import listdir

posts = [filename for filename in listdir() if "20" in filename]
posts.sort(key= lambda filename: filename[0:10], reverse=True)
    
with open("../random.html",'w',encoding="utf8") as mainfile:
    #Header
    with open("random_head.html",'r',encoding="utf8") as head:
        mainfile.write(head.read())
    
    #Table of Contents
    mainfile.write("\n<div class=\"boxitem\" id=\"toc\">\n<h3>Contents</h3>\n<ul>\n")
    for filename in posts:
        mainfile.write("<li><a href=\"#"+filename[:-5]+"\">"+filename[:-5]+"</a></li>\n")
    mainfile.write("</ul>\n</div>\n")
    
    #Posts
    for filename in posts:
        mainfile.write("\n<div class=\"boxitem\" id=\""+filename[:-5]+"\">\n")
        with open(filename,'r',encoding="utf8") as file:
            mainfile.write(file.read())
        mainfile.write("\n</div>\n")
    #Footer
    with open("random_foot.html",'r',encoding="utf8") as foot:
        mainfile.write(foot.read())