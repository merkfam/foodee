## Intro
 This Foodee web application is used to create a food schedule based in the number of days you set in the food-context file. I will be laying this out in a format i find more suitable for the laymen and women as much as i can muster at least.
 
## How To Use Foodee
 If you would like to use the web app then there is very little for you to configure to get set up. Below will set up the steps necessary.
 
 1. Get the uri neccessary from mongodb
 2. Use said uri to connect to the data base in the api pages.
 3. create a menu page by running the create_user page, this is basically just a template startup for the menu.
 4. -- After the first 3 steps are done you will then start adding your ingredients, all the ingredients you may buy, this is quite tricky though as many ingredients come in packages such as bread or condiments etc are terrible for calculating price. So my recommendation is to go shopping and look at the prices on the receipt thereof so that you have all necessary info readily available. 
 All being said here is the methodology i use:
  1. Get receipt handy.
  2. Add ingredient name - automatically saves it in a title case format so there is a standard and cleaner way of viewing it.
  3. Since ingredients have some difficulties for price and you probably want a reasonably accurate price per use of each item then what I recommend is:
  ------------------------------- Important! ---------------------------------0
  	1. take the price of the item and divide it by the number of uses
  	2. This becomes even more important when it comes to adding a dish to your menu as it requires the number of a specific ingredient. Therefore it makes sense to deal with this problem ahead of time and just make it accurate from the start.
  	
 
# Adding a Dish
 when adding a dish just add each needed ingredient one by one and the number of each, both fields are required. Basically all fields are required except the instructions. Each meal will automatically be saved under its rightful meal: Breakfast, Lunch, Dinner, Snack, Dessert and whether it is a main part/ entree or a side dish type all you must do is select the meal and check entree or side; again required.
 
 
# Finally:
	In the homepage, not the landing page: you simply need to press the new button and it will set up a schedule based on the number of days you required and it will give out a grocery list at top and below it will display the ordered list of all the meals in cards/tiles. You may print it out using the print button.
	

# Customization:
	Basically the only customization options i have allowed easily are the number of main meal items to make the schedule and the number of secondary meals i.e. Snack and Dessert. These options are near the top of the Helpers/FOODCONTEXT file the default for main meals is: 7 and for otherMeals as it is called is: 3. You simply need to change this number before you send this up to vercel and i do recommend vercel as i have not tried using any others such as heroku.
	
# Before Deployment, perhaps at the very beginning:
	You must set the .env.local variables in the .env file and in the .next config file at the root of the app. For more on how to accomplish that you can look at the documentation, don't overthink it, you can basically copy and paste and fill the details in how you want. This one is a must because without it you have no data base and therefore no application. I would recommend you to do it in these steps:
	1. Setup a mongoDB Atlas account - google it if you don't know how.
	2. Get the uri you need...basically it contains a password and link with a trailing name of the collection you're going to use.
	3. Put said uri/uris into your next.config file and .env.local file with varable names
	4. In place of my variable names which say something like process.env.MerK_MONGO_URI, paste yours in instead, or if you don't want to go searching for them you will just use the variable MerK_MONGO_URI and set it to your own URI, if you try mine without updating the URI, it won't work because there is no connection between my variables and the application... they're just hardcoded in there.
	
# You are free to change the code to your liking, if you'd like to improve mine, please do. I simply made a quick one for my wife so she would stop complaining about the difficulty all the time.

## As a side note to any who look at this after doing anything, new to the ingredients or dishes, such as deleting or updating them, you must refresh the page to see the results. The database is only loaded up once, i took the liberty of not using the standard approach offered by next because i find it annoying to have it load every page every time you switch. With that being said. if you do make changes you must refresh the page so a new call will be sent to the database. Hopefully that helps.
  
