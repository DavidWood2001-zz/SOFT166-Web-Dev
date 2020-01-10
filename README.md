# Read Me

This is a repository to hold all of the files for the SOFT166 Web development half of the SOFT166 module - this is the coursework.

## Youtube Demonstration
link to YT vid here
## Screenshots
Below are a few screenshots from the website.
### Home Page
![home page](https://i.imgur.com/DOk2BAA.png)
### About Page
![about page](https://i.imgur.com/wZP8b4s.png)
### Game Play Page
![game page](https://i.imgur.com/5lsVZU2.png)
### Game Legend Page
![legend page](https://i.imgur.com/ETPyDj1.png)

## Instructions
 -   Press start
 -   Keep an eye on the sequence shown it won't be there for long
 -   Click the colours you saw in the order you saw them
 -   If you were right you'll get 1 added to your score
 -   If not you will lose a life (a light will turn off)
 -   Once all of your lives are out, you lose
## Features
 - Ability to play the game even when at home without the lights
 - The lights are an extension of the game and therefore enhance usability
 - Ease of access
	 - minimal click traversal
	 - Able to use the web application on mobile due to Bootstrap templates
 - Responsive design allows for multiple different screen sizes
 - Unrestricted browser access
	 - Most popular browsers have been tested for compatibility (detailed below) 
## Web Accessibility
All of these are to adhere to the Web Accessiblity Guidelines outlined in this link here
https://www.w3.org/TR/WAI-WEBCONTENT/
### Bootstrap
I have used bootstrap CSS templates (Guideline 3 of WAI) to reduce the overall size of the project. Using an external library of CSS styling attributes means that the actual size of the project is reduced as a large portion of the styling elements are outsourced. Bootstrap also enable a responsive design (WAI 2.1). Bootstraps templates are also largely compliant with older technologies and most don't rely on newer versions of those technologies (Guideline 6 of WAI).

Another benefit to using bootstrap templates is that it is easier to keep the colour scheme, layout and general design of all of the web pages the same.

To add bootstrap to your own project or if you  just want to read a bit more on the topic and how to get started please follow this link
[https://getbootstrap.com/docs/4.0/getting-started/introduction/](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
### Outsourced Navbars
You will notice that all of my navbar elements are in there own seperate HTML file and that I have used the include-html javascript from w3 to be able to include the same navbar and sometimes sidebar in the pages that need them. This means that any changes made to the navbar are included on all of the pages which drastically reduces workload but also increases usability of the application.
