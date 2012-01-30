// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// Make statusbar Black
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.OPAQUE_BLACK;

//
// create base UI tab and root window
//
var winHome = Titanium.UI.createWindow({  
    title:'Wild Tweets',
    backgroundImage: 'images/bg.png'
});

//
// Create buttons on winHome
//
var animalsSpotted = Titanium.UI.createButton({
	color: '#BC0A0A',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:116,
	height: 85,
	bottom: 270,
	backgroundImage:'images/flipboard.png',
	backgroundSelectedImage:'images/flipboard.png',
	backgroundDisabledImage: 'images/flipboard.png',
});

var spotNow = Titanium.UI.createButton({
	color: "#302B36",
	font: {fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign: 'center',
	width: 100,
	height: 91,
	bottom: 85,
	backgroundImage:'images/btnSpotNow.png',
	backgroundSelectedImage:'images/btnSpotNowHover.png',
	backgroundDisabledImage: 'images/btnSpotNow.png',
});

// Laad de #wildtweets van het dier, tel ze en weergeef ze op de kaart
		var wildtweetsmapview = Titanium.Map.createView({
			mapType: Titanium.Map.SATELLITE_TYPE,
			//region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:15, longitudeDelta:15},
			animate:true,
			regionFit:true,
			userLocation:true,
			
			// bottom definiëren lijnt de kaart verticaal onderaan uit.
			height: 170,
			top:128
		});

		// Twitter authenticatie
		Ti.include('libs/birdhouse-debug.js');

		var BH = new BirdHouse({
		    consumer_key: "Z3cUc1H5ZfuAPwqVSJfww",
		    consumer_secret: "ch6xSjECZaQVaq04UHsP3H43HTyjJj7lSqRYqXUoTA",
		    callback_url: "http://www.iamlorenz.be" // only necessary for overridding
		});
		
		// Voeg tweets aan kaart toe (bevat ook het tellen van het aantal tweets)
		function loadwildtweetsonmap()
		{
		winHome.add(wildtweetsmapview);
		
		// Functie om tweets op te halen
		
			BH.api('http://search.twitter.com/search.json?','POST','q=%23wildtweets%20source:wild_tweets',function(tweets){
					tweets = JSON.parse(tweets);
		
					if (tweets===false) {
						alertDialog.message = 'Failed to get Wild Tweets.';
						alertDialog.show();
					} else {
						if (typeof(tweets)=='object' && tweets.length>0) {
							for (var i=0;i<tweets.length;i++) {
								Ti.API.info('tweet'+i+': '+tweets[i].text);
							}
						}
					}
		
			try {
				
				
			
				// Plaats tweets op kaart
				for (var i = 0; i < tweets.results.length; i++)
				{	

				
					var tweetAnnotation = Titanium.Map.createAnnotation({
						latitude: parseFloat(tweets.results[i].geo.coordinates[0]),
						longitude: parseFloat(tweets.results[i].geo.coordinates[1]),
						pincolor: Titanium.Map.ANNOTATION_RED,
						animate:true
					});
		
					wildtweetsmapview.addAnnotation(tweetAnnotation);
					
				}
			
			} catch (exception) {
				Titanium.API.info('Exception: '+ exception);
			}
			
			
			});
		
		};
		
// Voer bovenstaande functie wanneer dit scherm opent
loadwildtweetsonmap();

winHome.add(animalsSpotted);
winHome.add(spotNow);

//
// Create the back button in all windows
//
var goBackHome = Titanium.UI.createButton({
  title:"Back",
  top: 20,
  width: 60,
  height: 30,
  left: 10,
  color: '#36302C'
});

goBackHome.addEventListener('click',function(e)
{
	// in order to open the window again, you have to close it first
	winListAnimal.close();
	winHome.close();
	winHome.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

// Add label nr spotted animals
var labelSpottedAnimals = Titanium.UI.createLabel({
	text:'animals spotted so far',
	color:'#EEE',
	font:{fontSize:16, fontFamily:'Helvetica Neue'},
	height:'auto',
	width:'auto',
	top: 80,
});

// Add number of spotted animals
var numberSpottedAnimals = Titanium.UI.createLabel({
	text:'4  0',
	color:'#000',
	font:{fontSize:40, fontFamily:'Helvetica Neue', fontWeight: 'bold'},
	height:'auto',
	width:'auto',
	top: 120,
});

winHome.add(labelSpottedAnimals);
winHome.add(numberSpottedAnimals);

//
// Count Wild Tweets so far
//

// Twitter authenticatie is nodig om een twitter api call uit te voeren
Ti.include('libs/birdhouse-debug.js');

	var BH = new BirdHouse({
		    consumer_key: "Z3cUc1H5ZfuAPwqVSJfww",
		    consumer_secret: "ch6xSjECZaQVaq04UHsP3H43HTyjJj7lSqRYqXUoTA",
		    callback_url: "http://www.iamlorenz.be" // only necessary for overridding
	});
		


// Haal alle Wild Tweets op 
function counttotalwildtweets(){
	
		BH.api('http://search.twitter.com/search.json?','POST','q=%23wildtweets%20source:wild_tweets',function(tweets){
		
			tweets = JSON.parse(tweets);
		
			if (tweets===false) {
				alertDialog.message = 'Failed to get Wild Tweets.';
				alertDialog.show();
			} else 
			{	
			// Tel het aantal Wild Tweets 
			numberSpottedAnimals.text = "0  "+tweets.results.length;
			}
			
		});
}

counttotalwildtweets();

//
// Add action to buttons
//
spotNow.addEventListener('click',function(e)
{
	loadAnimals();
	winListAnimal.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT});
});

Titanium.include('winListAnimal.js');
Titanium.include('animalwin.js');
// open tab group
//winHome.open();
winHome.open();
