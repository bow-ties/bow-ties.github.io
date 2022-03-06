# Personal Website

## Sources

Gallery on portfolio page is derived from [Codrops's Google Grid Gallery Blueprint](https://github.com/codrops/GridGallery).

Collapsible sections on homepage are adapted from [w3schools Collapsibles](https://www.w3schools.com/howto/howto_js_collapsible.asp).

Portfolio diagram relies on [D3.js version 5](https://d3js.org/).

I also use [Google's Comfortaa font](https://fonts.google.com/specimen/Comfortaa).

## Layout

portfolio.html is generated in python from files with 3+ lines then ordered based on filename:
1. Location and name for diagram (1 line)
		`{"x": 0,"y": 0,"name": ""}`
2. Title and image for gallery (1 line)
		`<figcaption></figcaption><img src=""/>`
3. Title, descriptions and images for detail view
		`<figcaption></figcaption>`

random.html is a blog generated from html content then ordered based on filename.

img/large/ contains content from various projects.

destiny.html is a history of the floor I lived on at MIT.

reviews.html is a specific art project.