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
		Ti.include('libs/birdhouse-debug.js');

		var BH = new BirdHouse({
		    consumer_key: "Z3cUc1H5ZfuAPwqVSJfww",
		    consumer_secret: "ch6xSjECZaQVaq04UHsP3H43HTyjJj7lSqRYqXUoTA",
		    callback_url: "http://www.iamlorenz.be" // only necessary for overridding
		});
		
		// Voeg tweets aan kaart toe (bevat ook het tellen van het aantal tweets)
		function loadwildtweetsonmap()
		{
		app.add(wildtweetsmapview);
		
		// Functie om tweets op te halen
		
			BH.api('http://search.twitter.com/search.json?','POST','q=#wildtweets%20source:wild_tweets',function(tweets){
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