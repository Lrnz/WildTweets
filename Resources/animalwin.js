//
// create Spot Animals tab and root window
//
var animalwin = Titanium.UI.currentWindow;

// Naam van het dier
var animalname_lbl = Titanium.UI.createLabel({
 text: animalwin.animalname,
 top: 100,
 width: "80%",
 height: 40,
 left: 150,
 color: '#FFF',
 font:{fontSize:30, fontFamily:'Helvetica Neue', fontWeight: 'bold'},
})

animalwin.add(animalname_lbl);

// Aantal #wildtweets van dit dier
var wildtweetscount_lbl = Titanium.UI.createLabel({
 	 text:'',
 	 top: 130,
 	 width: "80%",
 	 height: 40,
 	 left: 150,
 	 color: '#DDD',
})

animalwin.add(wildtweetscount_lbl);

// Afbeelding van het dier
var animalphoto = Titanium.UI.createImageView({
	image: animalwin.animalphotosource,
	left:20,
	top:100,
	height:100,
	width:100
});

animalwin.add(animalphoto);

// ELEMENTS
var alertDialog = Titanium.UI.createAlertDialog({
	title: 'Wild Tweets Message',
	buttonNames: ['OK']
});
var activity = Titanium.UI.createActivityIndicator({message:'Loading...'});


// Laad de #wildtweets van het dier, tel ze en weergeef ze op de kaart
		var wildtweetsmapview = Titanium.Map.createView({
			mapType: Titanium.Map.STANDARD_TYPE,
			//region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:15, longitudeDelta:15},
			animate:true,
			regionFit:true,
			userLocation:true,
			height: 200,
			
			// bottom definiëren lijnt de kaart verticaal onderaan uit.
			bottom: 20
		});

		// Twitter authenticatie
		Titanium.include('libs/birdhouse-debug.js');

		var BH = new BirdHouse({
		    consumer_key: "Z3cUc1H5ZfuAPwqVSJfww",
		    consumer_secret: "ch6xSjECZaQVaq04UHsP3H43HTyjJj7lSqRYqXUoTA",
		    callback_url: "http://www.iamlorenz.be" // only necessary for overridding
		});
		
		// Voeg tweets aan kaart toe (bevat ook het tellen van het aantal tweets)
		function loadwildtweetsonmap()
		{
		animalwin.add(wildtweetsmapview);
		
		// Functie om tweets op te halen
		
			BH.api('http://search.twitter.com/search.json?','POST','q='+ animalname_lbl.text +'%20source:wild_tweets',function(tweets){
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
				
				// Tel het aantal Wild Tweets voor dit dier
				wildtweetscount_lbl.text = "Spotted " + tweets.results.length + " times.";
				
			
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

// Spot dit dier

var tweetbutton = Titanium.UI.createButton({
  title:"Spot",
  top: 20,
  width: 60,
  height: 30,
  right: 10,
  color: '#36302C'
})

animalwin.add(tweetbutton);

tweetbutton.addEventListener('click', function() {
	
	/*
	var mydate = date();
	var hours = mydate.getHours();
	var minutes = mydate.getMinutes();
	*/
	
	// De klasse birdhouse.js zal automatisch een tweet genereren
	BH.tweet("I have just spotted a "+ animalname_lbl.text +" using #wildtweets", function(resp){
		if (resp== true)
		{
		 	alertDialog.message = 'Your Wild Tweet was sent.';
		}
		else
		{
		 	alertDialog.message = 'Something went wrong. Try again later';
		}
		alertDialog.show();
	});

});

// Keer terug naar het vorige scherm
var backbtn = Titanium.UI.createButton({
  title:"Back",
  top: 20,
  width: 60,
  height: 30,
  left: 10,
  color: '#36302C'
});

backbtn.addEventListener('click',function(e)
{
	// in order to open the window again, you have to close it first
	animalwin.close();
	winHome.close();
	winHome.open({
	transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT});
});

animalwin.add(backbtn);

