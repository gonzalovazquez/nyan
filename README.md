GV Boilerplate
===
A boilerplate for creating web-apps.

## Install node

	You can install it [here](http://nodejs.org/)

## After installing node, install Gulp

	npm install gulp -g

## Install all the dependencies

	npm install


## Workflow

The following tasks automate your development:

### Launches a server, watches changes in code and lints JavaScript files.

	gulp watch

### Runs unit test, minifies js and css, optimizes images and moves them to <dest> folder. 

	gulp ship

### Runs unit tests using karma runner and jasmine framework

	gulp test

### Converts SASS to CSS

	gulp sass

### Minifies CSS and moves to <dest> folder

	gulp minify-css

### Minifies JS and moves to <dest> folder
	
	gulp minify-js

### Optimizes Images

	gulp minify-img

### Lints JS using JSLint

	gulp lint

### Creates server

	gulp server

### Launches browser

	gulp launch

##TODO:

* Add github tasks