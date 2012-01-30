//
// create Spot Animals tab and root window
//
var winListAnimal = Titanium.UI.createWindow({  
    title:'Spot Animals',
    backgroundImage: 'images/wildTweetsBg.png'
});

winListAnimal.add(goBackHome);

var animaltable = Titanium.UI.createTableView({minRowHeight:58, top:100, separatorColor: 'transparent', backgroundImage:'images/plainBg.png'});

function loadAnimals()
{
	// Empty array "rowData" for our tableview
	var rowData = [];
	// Create our HTTP Client and name it "loader"
	var loader = Titanium.Network.createHTTPClient();
	// Sets the HTTP request method, and the URL to get data from
	loader.open("GET","http://www.iamlorenz.be/drupal/api/views/animals.json");
	// Runs the function when the data is ready for us to process
	loader.onload = function() 
	{
		var animals = eval('('+this.responseText+')');		

		for (var i = 0; i < animals.length; i++)
		{		
			var animalname = animals[i].title; // The name of the animal
			//var animaldescription =animals[i].body.und[0].value; // The description of the animal	
			var animalphotosource = "";
			if (animals[i].field_image.length != 0)
			{
			animalphotosource = "http://iamlorenz.be/drupal/sites/default/files/styles/medium/public/field/image/" + animals[i].field_image.und[0].filename; // The description of the animal	
			}
			
			var row = Titanium.UI.createTableViewRow({height:'auto', backgroundImage: 'images/plainBg.png'});

			// Create the view that will contain the text and avatar
			var post_view = Titanium.UI.createView({
				height:100, 
				layout:'vertical',
				top:5,
				right:5,
				bottom:5,
				left:5,
				borderColor: '#8DC04A',
				backgroundImage: 'images/plainBg.png',
			});
			
			var animalphoto = Ti.UI.createImageView({
						image:animalphotosource,
						left:0,
						top:0,
						height:100,
						width:100
					});
				// Add the avatar imaanimalanimalphoto the view
				post_view.add(animalphoto);
				
			// Create the label to hold the animal name
			var animalname_lbl = Titanium.UI.createLabel({
				text:animalname,
				left:110,
				width:120,
				top:-90,
				bottom:0,
				height:20,
				textAlign:'left',
				color:'#EEE',
				font:{fontFamily:'helvetica neue',fontSize:20}
			});
			post_view.add(animalname_lbl);
			
			// Parameters die we willen raadplegen on row click
			row.animalname = animalname;
			row.animalphotosource = animalphotosource;


			// Add the post view to the row
			row.add(post_view);
			
			// Give each row a class name
			row.className = "item"+i;
			
			// Add row to the rowData array
			rowData[i] = row;
		}
		// Create the table view and set its data source to "rowData" array
		animaltable.data = rowData;
		//Add the table view to the window
		winListAnimal.add(animaltable);
	};
	// Send the HTTP request
	loader.send();
}

// Klik op het dier
animaltable.addEventListener('click',function(e){
	var animalwin = Titanium.UI.createWindow({		
   	 	url:'animalwin.js',
   	 	title: e.row.animalname, 	
		backgroundImage: 'images/wildTweetsBg.png'
 	});
 	
 	animalwin.animalname = e.row.animalname;
 	animalwin.animalphotosource = e.row.animalphotosource;
	 	// Open het detailscherm van het dier

	animalwin.open();
});