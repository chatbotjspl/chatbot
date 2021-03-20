express = require('express');
const app = express();
const difff = require('dialogflow-fulfillment');
const burail = require('./lib/bu/burail');
SCOPES = 'https://www.googleapis.com/auth/chat.bot';
//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
let temp;
app.get('/', (req,res)=>{
	res.send("We are live");
});

const {dialogflow,SignIn} = require("actions-on-google");

process.env.DEBUG = 'dialogflow:*';
//const app3 = actionssdk();
const app2 = dialogflow({
    clientId: '1031556341720-0on0shjtj9pemc7dlj9cmnm60uu8vour.apps.googleusercontent.com',
});
app2.intent('Testing1', conv => {
  conv.ask(new SignIn('To get your account details'))
	agent.add("This is working")
})

app.post('/',express.json(),(req,res)=>{
	const agent = new difff.WebhookClient({
		request:req,
		response:res
	});

		function stocks(agent){
			var messageName = "";//req.body.message.name;

			//////////////////////////////
			const {GoogleAuth} = require('google-auth-library');
			//agent.setFollowupEvent("bye");

			/**
			* Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
			* this library will automatically choose the right client based on the environment.
			*/
			/*
			async function new_func() {
			  const auth = new GoogleAuth({
			    scopes: 'https://www.googleapis.com/auth/cloud-platform'
			  });
			  const client = await auth.getClient();
			  const projectId = await auth.getProjectId();
			  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
			  const res = await client.request({ url });
			  console.log(res.data);
				agent.add(res.data);
			}
			new_func().catch(console.error);
			new_func();*/
			/*
			var google = require('googleapis').google;
			var OAuth2 = google.auth.OAuth2;
			var oauth2Client = new OAuth2();
			oauth2Client.setCredentials({access_token: 'ya29.a0AfH6SMAhFLZJ45qHc9cJCmPHXS_NgepZtois0KgQIDKgTOSNwtZLKtJjuFy-Po8NwjJk75mKPCxIvRIifNtGwbMDX-evX6qvRzakvkIVk_SuPL665IYLLnUejdSN_1aYSdAcbxeZrXfwFHtpURIyKG8C-zWaMBwUwXeX7rmi_78'});
			var oauth2 = google.oauth2({
			  auth: oauth2Client,
			  version: 'v2'
			});
			oauth2.userinfo.get(
			  function(err, res) {
			    if (err) {
			       console.log(err);
			    } else {
			       console.log(res);
			    }
			});
			*/
			//////////////////////////
			//agent.add(messageName);
			console.log("Called the Stock intent");
			var request = require("request");
			//console.log("Id is : "+req.body.originalDetectIntentRequest.payload.user);
			//console.log("Token ID : "+req.body.originalDetectIntentRequest.payload.conversation.conversationToken);
			//agent.add("Session ID : "+agent.session);
			//event = req.get_json();
			//let userStorage = {};//req.body.originalDetectIntentRequest.payload.user.userStorage || {};
			//let userId;
			// if a value for userID exists un user storage, it's a returning user so we can
			// just read the value and use it. If a value for userId does not exist in user storage,
			// it's a new user, so we need to generate a new ID and save it in user storage.
			/*if (userId in userStorage) {
			  userId = userStorage.userId;
			} else {
			  // Uses the "uuid" package. You can get this with "npm install --save uuid"
			  var uuid = require('uuid/v4');
			  userId = uuid();
			  userStorage.userId = userId
			}
			agent.add(userId);
			*/
			var stockcondition = req.body.queryResult.parameters.stockcondition;
			var stocksymbol = req.body.queryResult.parameters.stocksymbol;
			var stocknumber = req.body.queryResult.parameters.stocknumber;
			const {WebhookClient} = require('dialogflow-fulfillment');
			const {Card,Suggestion} = require('dialogflow-fulfillment');
			const {BasicCard, Button} = require('actions-on-google');
			console.log("Stock condition : " + stockcondition);
			console.log("Stock symbol : "+stocksymbol);
			var dateString = agent.context.get('stocks').parameters.date;//.slice(0,19);//agent.context.get('weather').parameters.date.slice(0,19);
			var monthNames = ["January", "February", "March", "April", "May", "June",
		 "July", "August", "September", "October", "November", "December"];
		 monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];
			const dateObj = new Date();
			const month = monthNames[dateObj.getMonth()];
			const day = String(dateObj.getDate()).padStart(2, '0');
			const year = dateObj.getFullYear();
			const time = dateObj.getTime();
			// current hours
			let hours = dateObj.getHours();
			// current minutes
			let minutes = dateObj.getMinutes();
			// current seconds
			let seconds = dateObj.getSeconds();
			const output = day + '/' + month  + '/' + year + ' '+hours+':'+minutes+':'+seconds;
			var url = "http://localhost:3000/nse/get_quote_info?companyName="+stocksymbol;
		  return callAxios(url).then(response =>{
			currentPrice = response.data.data[0].lastPrice;
			high52 = response.data.data[0].high52;
			low52 = response.data.data[0].low52;
			dayLow = response.data.data[0].dayLow;
			dayHigh = response.data.data[0].dayHigh;
			openingPrice = response.data.data[0].open;
			console.log("Opening Price : "+openingPrice);
		const {Payload} = require('dialogflow-fulfillment');
		const json = {
		        "hangouts": {
		          "header": {
		            "title": "Stocks" + " " + output,
		            "subtitle": stocksymbol,
		            "imageUrl": "https://m.economictimes.com/thumb/msid-71288834,width-3684,height-2068,resizemode-4,imgsize-550306/stocks-market.jpg"
		          },
		          "sections": [

		            {
		              "widgets": [
		                {
		                  "keyValue": {
		                    //"icon": "TRAIN",
		                    "topLabel": "Price",
		                    "content": currentPrice
		                  }
		                },
		                {
		                  "keyValue": {
		                    "topLabel": "Day High",
		                    "content": dayHigh
		                  }
		                },
		                {
		                  "keyValue": {
		                    "topLabel": "Day Low",
		                    "content": dayLow
		                  }
		                },
		                {
		                  "keyValue": {
		                    "topLabel": "52 Week High",
		                    "content": high52
		                  }
		                },
		                {
		                  "keyValue": {
		                    "topLabel": "52 Week Low",
		                    "content": low52
		                  }
		                }
		              ]
		            }
		          ]
		        }
		      };
		        	  let payload = new Payload('hangouts',json,
		        		{ rawPayload: true, sendAsMessage: true});
		        	    	agent.add(payload);

		  }).catch(error =>{
		    console.log("Something is wrong");
		    console.log(error);
		  });
		};
function forecast(agent){
	const {Permission} = require('actions-on-google');
  var city = req.body.queryResult.parameters.city;
	city = agent.context.get('weather').parameters.city;
	//agent.add(city);
	console.log("This finally worked : "+city);
	if(city == "Patratu" || city == "patratu" || city == "pataratu"){
		search_city = "Ranchi";
	}
	else if(city == "Tensa" || city == "tensa"){
		search_city = "sundargarh";
	}
	else if(city == "Sohar" || city == "sohar"){
		search_city = "liwa";
	}
	else if(city == "Chirodzi" || city == "Chirodzi"){
		search_city = "tete";
	}
	else{
		search_city = city;
	}
	console.log("City : "+city);
	console.log("search_city : "+search_city);
  //var dateString = req.body.queryResult.parameters.date.slice(0,19);
	var dateString = agent.context.get('weather').parameters.date.slice(0,19);
  console.log("Date string : "+dateString);

	parsedInt = (parseInt(dateString.slice(8,10), 10)+1).toString();
	if(parsedInt.length == 1){
		parsedInt = "0"+parsedInt;
	}
	dateString = dateString.slice(0,7)+"-"+parsedInt+dateString.slice(10,19);
	console.log("Final date String : "+dateString);
	console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ: "+parsedInt);
	console.log("Previous date : "+ agent.context.get('weather').parameters.date.slice(0,19));
	dateString2 = dateString.slice(0,11)+"15:00:00";
	dateString3 = dateString.slice(0,11)+"21:00:00";
	console.log("Date string 2 : "+dateString2);
  var parts ='2014-04-03'.split('-');
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  console.log("System generated date : "+mydate.toDateString());
  var url = "http://api.openweathermap.org/data/2.5/forecast?q="+search_city+"&appid=ad2045d4a003757e3f727eaa71514970";
  return callAxios(url).then(response =>{
    var bot_response = "The current weather is : "+response.data.list[0].weather[0].description;//list[0].weather[0].description;
    console.log(bot_response);
		//agent.add(response.body.originalDetectIntentRequest.payload.user);

    for(var i = 0;i<response.data.list.length;i++){
      //var date = new Date(response.data.list[i].dt * 1000);
      //date = date.toString().slice(0,19);
      //var month = date.getMonth();
      //var day = date.getDate();
      //var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      date = response.data.list[i].dt_txt.replace(' ','T');
			String.prototype.capitalize = function() {
			    return this.charAt(0).toUpperCase() + this.slice(1);
			}
      currentWeather = response.data.list[i].weather[0].description.capitalize();
      currentTemp = Math.round(response.data.list[i].main.temp-273.15);
  		minTemp = Math.round(response.data.list[i].main.temp_min-273.15);
  		maxTemp = Math.round(response.data.list[i].main.temp_max-273.15);
  		humidity = response.data.list[i].main.humidity;
  		windSpeed = response.data.list[i].wind.speed;
      if(date == dateString){
        console.log(date);
				console.log("Showing result for : "+dateString);
        console.log("Matching");
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + dateString.slice(0,10),
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }
			else if(date == dateString2){
        console.log(date);
        console.log("Matching");
				console.log("Showing result for : "+dateString2);
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + dateString.slice(0,10),
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }
			else if(date == dateString3){
        console.log(date);
        console.log("Matching");
				console.log("Showing result for : "+dateString3);
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + dateString.slice(0,10),
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }

    }
  }).catch(error =>{
    console.log("Something is wrong");
    console.log(error);
    //agent.add(bot_response);
  });
};



function weather(agent){
	const {Permission} = require('actions-on-google');
  var city = req.body.queryResult.parameters.city;
	if(city == "Patratu" || city == "patratu" || city == "pataratu"){
		search_city = "Ranchi";
	}
	else if(city == "Tensa" || city == "tensa"){
		search_city = "sundargarh";
	}
	else if(city == "Sohar" || city == "sohar"){
		search_city = "liwa";
	}
	else if(city == "Chirodzi" || city == "Chirodzi"){
		search_city = "tete";
	}
	else{
		search_city = city;
	}
	console.log("City : "+city);
	console.log("search_city : "+search_city);
  var dateString = req.body.queryResult.parameters.date.slice(0,19);
	var given_year = dateString.slice(0,4);
	var given_month = dateString.slice(5,7);
	var given_day = dateString.slice(8,10);
	console.log("Given month : "+given_month);
	console.log("Given year : "+given_year);
	console.log("Given day : "+given_day);
	var given_date = given_day+'/'+given_month+'/'+given_year;
  console.log("Date string : "+dateString);
	dateString2 = dateString.slice(0,11)+"15:00:00";
	dateString3 = dateString.slice(0,11)+"21:00:00";
	console.log("Date string 2 : "+dateString2);
  var parts ='2014-04-03'.split('-');
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
  console.log(mydate.toDateString());
  var url = "http://api.openweathermap.org/data/2.5/forecast?q="+search_city+"&appid=ad2045d4a003757e3f727eaa71514970";
  return callAxios(url).then(response =>{
    var bot_response = "The current weather is : "+response.data.list[0].weather[0].description;//list[0].weather[0].description;
    console.log(bot_response);
		//agent.add(response.body.originalDetectIntentRequest.payload.user);

    for(var i = 0;i<response.data.list.length;i++){
      //var date = new Date(response.data.list[i].dt * 1000);
      //date = date.toString().slice(0,19);
      //var month = date.getMonth();
      //var day = date.getDate();
      //var time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
      date = response.data.list[i].dt_txt.replace(' ','T');
			String.prototype.capitalize = function() {
			    return this.charAt(0).toUpperCase() + this.slice(1);
			}
      currentWeather = response.data.list[i].weather[0].description.capitalize();
      currentTemp = Math.round(response.data.list[i].main.temp-273.15);
  		minTemp = Math.round(response.data.list[i].main.temp_min-273.15);
  		maxTemp = Math.round(response.data.list[i].main.temp_max-273.15);
  		humidity = response.data.list[i].main.humidity;
  		windSpeed = response.data.list[i].wind.speed;
      if(date == dateString){
        console.log(date);
				console.log("Showing result for : "+dateString);
        console.log("Matching");
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + given_date,
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }
			else if(date == dateString2){
        console.log(date);
        console.log("Matching");
				console.log("Showing result for : "+dateString2);
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + given_date,
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }
			else if(date == dateString3){
        console.log(date);
        console.log("Matching");
				console.log("Showing result for : "+dateString3);
        const {Payload} = require('dialogflow-fulfillment');
        const json = {
                "hangouts": {
                  "header": {
                    "title": "Weather",
                    "subtitle": city + " " + dateString.slice(0,10),
                    "imageUrl": "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"
                  },
                  "sections": [

                    {
                      "widgets": [
                        {
                          "keyValue": {
                            //"icon": "TRAIN",
                            "topLabel": "Weather",
                            "content": currentWeather
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Temperature",
                            "content": currentTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Min Temp",
                            "content": minTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Max Temp",
                            "content": maxTemp+"°C"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Humidity",
                            "content": humidity+"%"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Wind Speed",
                            "content": windSpeed+" km/h"
                          }
                        },
                        {
                          "keyValue": {
                            "topLabel": "Forecast",
                            "content": "Enter Forecast for Next Days' Forecast"
                          }
                        }
                      ]
                    }
                  ]
                }
              };


        	  let payload = new Payload('hangouts',json,
        		{ rawPayload: true, sendAsMessage: true});
        	    	agent.add(payload);
      }
			//agent.add("Enter 'Forecast' to Show Next Days Forecast");
    }
  }).catch(error =>{
    console.log("Something is wrong");
    console.log(error);
    //agent.add(bot_response);
  });
};
function callAxios(url){
  const axios = require('axios');
  return axios.get(url);
}

	function end(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');
		console.log("In end function");
		agent.add(new Card(
		{
			title : "Welcome to our website",
			imageUrl : 'https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/467777/getty-stock-market-success.jpg&w=2000&op=resize',
			text : 'This is just for testing',
			buttonText : 'Link',
			buttonUrl : 'http://google.com'
		}));
		agent.add(new Suggestion("Quick Reply"));
		agent.add(new Suggestion("Suggestion"));

	}

	function rail_contribution_data_fetch(agent){
		const xlsxFile = require('read-excel-file/node');
		var contribution_entity = req.body.queryResult.parameters.contribution_entity;
		return xlsxFile('./Excel/Questions.xlsx', { sheet: 'contribution' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(contribution_entity == "con1"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con2"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con3"){//overall domestic contribution
							result_val = rows[0][1];
						}
						else if(contribution_entity == "con4"){//overall export contribution
							result_val = rows[1][1];
						}
						else if(contribution_entity == "con5"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con6"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con7"){
							result_val = "Iska excel mein data available nhi hai";
						}
						else if(contribution_entity == "con8"){//Export TMT & Domestic TMT
							result_val = "Export TMT : "+rows[2][1]+" Domestic TMT : "+rows[3][1];
						}
						else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
							result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
						}
						else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
							result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
						}
						else{
							result_val = "Contribution Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}


		function rail_finished_production_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
									"hangouts": {
										"header": {
											"title": "Finished Production Summary",
											"subtitle": "",
											"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
										},
										"sections": [

											{
												"widgets": [
													{
														"keyValue": {
															//"icon": "TRAIN",
															"topLabel": "UOM",
															"content": "Rs. Cr"
														}
													},
													{
														"keyValue": {
															"topLabel": "Tgt",
															"content": String(Math.round(rows[2][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Act",
															"content":  String(Math.round(rows[0][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Variation",
															"content": String(Math.round(rows[3][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Variation(%)",
															"content": String(Math.round(rows[4][1]))
														}
													}
												]
											}
										]
									}
								};
											let payload = new Payload('hangouts',json,
											{ rawPayload: true, sendAsMessage: true});
													//agent.add(payload);
													agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]))+"MT* against the target *"+String(Math.round(rows[2][1]))+"MT* with the variation of *"+String(Math.round(rows[3][1]))+"MT.("+String(rows[4][1])+").*");

						}).catch(error =>{
							console.log("Something is wrong");
							console.log(error);
						});
		}


	function rail_sales_summary(agent){
				const xlsxFile = require('read-excel-file/node');
				return xlsxFile('./Excel/Questions.xlsx', { sheet: 'sales' }).then((rows) => {

				const {Payload} = require('dialogflow-fulfillment');
				const json = {
								"hangouts": {
									"header": {
										"title": "Sales Summary",
										"subtitle": "",
										"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
									},
									"sections": [

										{
											"widgets": [
												{
													"keyValue": {
														//"icon": "TRAIN",
														"topLabel": "UOM",
														"content": "Rs. Cr"
													}
												},
												{
													"keyValue": {
														"topLabel": "Tgt",
														"content": String(Math.round(rows[2][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Act",
														"content":  String(Math.round(rows[0][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation",
														"content": String(Math.round(rows[3][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation(%)",
														"content": String(Math.round(rows[4][1]))
													}
												}
											]
										}
									]
								}
							};
										let payload = new Payload('hangouts',json,
										{ rawPayload: true, sendAsMessage: true});
												//agent.add(payload);
												agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]))+"MT* against the target *"+String(Math.round(rows[2][1]))+"MT* with the variation of *₹"+String(Math.round(rows[3][1]))+"MT.("+String(rows[4][1])+").*");

					}).catch(error =>{
						console.log("Something is wrong");
						console.log(error);
					});

	}

	function rail_collection_summary(agent){
				const xlsxFile = require('read-excel-file/node');
				return xlsxFile('./Excel/Questions.xlsx', { sheet: 'collected' }).then((rows) => {

				const {Payload} = require('dialogflow-fulfillment');
				const json = {
								"hangouts": {
									"header": {
										"title": "Cash Collection Summary",
										"subtitle": "",
										"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
									},
									"sections": [

										{
											"widgets": [
												{
													"keyValue": {
														//"icon": "TRAIN",
														"topLabel": "UOM",
														"content": "Rs. Cr"
													}
												},
												{
													"keyValue": {
														"topLabel": "Tgt",
														"content": String(Math.round(rows[2][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Act",
														"content":  String(Math.round(rows[0][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation",
														"content": String(Math.round(rows[3][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation(%)",
														"content": String(Math.round(rows[4][1]))
													}
												}
											]
										}
									]
								}
							};
										let payload = new Payload('hangouts',json,
										{ rawPayload: true, sendAsMessage: true});
												//agent.add(payload);
												agent.add("Hey, *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]))+"Cr* against the target *₹"+String(Math.round(rows[2][1]))+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]))+"Cr.("+String(rows[4][1])+").*");

					}).catch(error =>{
						console.log("Something is wrong");
						console.log(error);
					});

	}

		function rail_cash_score_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'cashscore' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Cash Score Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]))+"Cr* against the target *₹"+String(Math.round(rows[2][1]))+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]))+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}
		function rail_pure_variable_cost_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Pure Variable Cost Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs./t"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]))+"/t* against Target *₹"+String(Math.round(rows[2][1]))+"/t* with the variation of *₹"+String(Math.round(rows[3][1]))+"/t.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}
		function rail_pure_conversion_cost_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Pure Conversion Cost Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs./t"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]))+"/t* against Target *₹"+String(Math.round(rows[2][1]))+"/t* with the variation of *"+String(Math.round(rows[3][1]))+"/t.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}


		function rail_ebitda_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'ebitda' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Ebitda Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]))+"Cr* against Target *₹"+String(Math.round(rows[2][1]))+"Cr* with the variation of *"+String(Math.round(rows[3][1]))+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}

		function rail_bucontribution_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Questions.xlsx', { sheet: 'bucontribution' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Ebitda Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]))+"Cr* against Target *₹"+String(Math.round(rows[2][1]))+"Cr* with the variation of *"+String(Math.round(rows[3][1]))+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}


		function rail_cash_score_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'cashscore' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(cash_score_entity == "rcs1"){//target
								result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]))+"Cr.*";
							}
							else if(cash_score_entity == "rcs2"){//actual
								result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]))+"Cr.*";
							}
							else if(cash_score_entity == "rcs3"){//variation
								result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]))+"Cr.*";
							}
							else if(cash_score_entity == "rcs4"){//variation percentage
								result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(cash_score_entity == "rcs5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]))+"Cr.*";
							}
							else if(cash_score_entity == "rcs6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function rail_ebitda_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'ebitda' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(ebitda_entity == "reb1"){//target
								result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]))+"Cr.*	";
							}
							else if(ebitda_entity == "reb2"){//actual
								result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]))+"Cr.";
							}
							else if(ebitda_entity == "reb3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]))+"Cr.*";
							}
							else if(ebitda_entity == "reb4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(ebitda_entity == "reb5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]))+"Cr.*";
							}
							else if(ebitda_entity == "reb6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function rail_collection_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'collected' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(bu_colection_entity == "rcl1"){//target
								result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]))+"Cr.*	";
							}
							else if(bu_colection_entity == "rcl2"){//actual
								result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]))+"Cr.*";
							}
							else if(bu_colection_entity == "rcl3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]))+"Cr.*";
							}
							else if(bu_colection_entity == "rcl4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(bu_colection_entity == "rcl5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]))+"Cr.*";
							}
							else if(bu_colection_entity == "rcl6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}


		function rail_bucontribution_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'bucontribution' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(bucontribution_entity == "rco1"){//target
								result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
							}
							else if(bucontribution_entity == "rco2"){//actual
								result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
							}
							else if(bucontribution_entity == "rco3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
							}
							else if(bucontribution_entity == "rco4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(bucontribution_entity == "rco5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"Cr.*";
							}
							else if(bucontribution_entity == "rco6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function rail_pure_variable_cost_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(pure_variable_cost_entity == "rvc1"){//target
								result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "rvc2"){//actual
								result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "rvc3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "rvc4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(pure_variable_cost_entity == "rvc5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is *₹"+String(Math.round(rows[5][1]))+"/t*";
							}
							else if(pure_variable_cost_entity == "rvc6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is *"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function rail_pure_conversion_cost_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(pure_conversion_cost_entity == "rcc1"){//target
								result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "rcc2"){//actual
								result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "rcc3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "rcc4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(pure_conversion_cost_entity == "rcc5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "rcc6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function rail_finished_production_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(finished_production_entity == "rfp1"){//target
								result_val = "Our Finished Production target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "rfp2"){//actual
								result_val = "Finished Production cost value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "rfp3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "rfp4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(finished_production_entity == "rfp5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "rfp6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function rail_sales_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
			return xlsxFile('./Excel/Questions.xlsx', { sheet: 'sales' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(sales_entity == "rsl1"){//target
								result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "rsl2"){//actual
								result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "rsl3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "rsl4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(sales_entity == "rsl5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "rsl6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}


////////////////////////////////////////////////////////////////////////STRUCTURES///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function structures_contribution_data_fetch(agent){
		const xlsxFile = require('read-excel-file/node');
		var contribution_entity = req.body.queryResult.parameters.contribution_entity;
		return xlsxFile('./Excel/Structures.xlsx', { sheet: 'contribution' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(contribution_entity == "con1"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con2"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con3"){//overall domestic contribution
							result_val = rows[0][1];
						}
						else if(contribution_entity == "con4"){//overall export contribution
							result_val = rows[1][1];
						}
						else if(contribution_entity == "con5"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con6"){
							result_val = rows[1][2];
						}
						else if(contribution_entity == "con7"){
							result_val = "Iska excel mein data available nhi hai";
						}
						else if(contribution_entity == "con8"){//Export TMT & Domestic TMT
							result_val = "Export TMT : "+rows[2][1]+" Domestic TMT : "+rows[3][1];
						}
						else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
							result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
						}
						else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
							result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
						}
						else{
							result_val = "Contribution Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}


		function structures_finished_production_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
									"hangouts": {
										"header": {
											"title": "Finished Production Summary",
											"subtitle": "",
											"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
										},
										"sections": [

											{
												"widgets": [
													{
														"keyValue": {
															//"icon": "TRAIN",
															"topLabel": "UOM",
															"content": "Rs. Cr"
														}
													},
													{
														"keyValue": {
															"topLabel": "Tgt",
															"content": String(Math.round(rows[2][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Act",
															"content":  String(Math.round(rows[0][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Variation",
															"content": String(Math.round(rows[3][1]))
														}
													},
													{
														"keyValue": {
															"topLabel": "Variation(%)",
															"content": String(Math.round(rows[4][1]))
														}
													}
												]
											}
										]
									}
								};
											let payload = new Payload('hangouts',json,
											{ rawPayload: true, sendAsMessage: true});
													//agent.add(payload);
													agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

						}).catch(error =>{
							console.log("Something is wrong");
							console.log(error);
						});
		}


	function structures_sales_summary(agent){
				const xlsxFile = require('read-excel-file/node');
				return xlsxFile('./Excel/Structures.xlsx', { sheet: 'sales' }).then((rows) => {

				const {Payload} = require('dialogflow-fulfillment');
				const json = {
								"hangouts": {
									"header": {
										"title": "Sales Summary",
										"subtitle": "",
										"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
									},
									"sections": [

										{
											"widgets": [
												{
													"keyValue": {
														//"icon": "TRAIN",
														"topLabel": "UOM",
														"content": "Rs. Cr"
													}
												},
												{
													"keyValue": {
														"topLabel": "Tgt",
														"content": String(Math.round(rows[2][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Act",
														"content":  String(Math.round(rows[0][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation",
														"content": String(Math.round(rows[3][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation(%)",
														"content": String(Math.round(rows[4][1]))
													}
												}
											]
										}
									]
								}
							};
										let payload = new Payload('hangouts',json,
										{ rawPayload: true, sendAsMessage: true});
												//agent.add(payload);
												agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

					}).catch(error =>{
						console.log("Something is wrong");
						console.log(error);
					});

	}

	function structures_collection_summary(agent){
				const xlsxFile = require('read-excel-file/node');
				return xlsxFile('./Excel/Structures.xlsx', { sheet: 'collected' }).then((rows) => {

				const {Payload} = require('dialogflow-fulfillment');
				const json = {
								"hangouts": {
									"header": {
										"title": "Cash Collection Summary",
										"subtitle": "",
										"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
									},
									"sections": [

										{
											"widgets": [
												{
													"keyValue": {
														//"icon": "TRAIN",
														"topLabel": "UOM",
														"content": "Rs. Cr"
													}
												},
												{
													"keyValue": {
														"topLabel": "Tgt",
														"content": String(Math.round(rows[2][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Act",
														"content":  String(Math.round(rows[0][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation",
														"content": String(Math.round(rows[3][1]))
													}
												},
												{
													"keyValue": {
														"topLabel": "Variation(%)",
														"content": String(Math.round(rows[4][1]))
													}
												}
											]
										}
									]
								}
							};
										let payload = new Payload('hangouts',json,
										{ rawPayload: true, sendAsMessage: true});
												//agent.add(payload);
												agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

					}).catch(error =>{
						console.log("Something is wrong");
						console.log(error);
					});

	}

		function structures_cash_score_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'cashscore' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Cash Score Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}
		function structures_pure_variable_cost_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Pure Variable Cost Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs./t"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}
		function structures_pure_conversion_cost_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Pure Conversion Cost Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs./t"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}


		function structures_ebitda_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'ebitda' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Ebitda Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}

		function structures_bucontribution_summary(agent){
					const xlsxFile = require('read-excel-file/node');
					return xlsxFile('./Excel/Structures.xlsx', { sheet: 'bucontribution' }).then((rows) => {

					const {Payload} = require('dialogflow-fulfillment');
					const json = {
					        "hangouts": {
					          "header": {
					            "title": "Ebitda Summary",
					            "subtitle": "",
					            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
					          },
					          "sections": [

					            {
					              "widgets": [
					                {
					                  "keyValue": {
					                    //"icon": "TRAIN",
					                    "topLabel": "UOM",
					                    "content": "Rs. Cr"
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Tgt",
					                    "content": String(Math.round(rows[2][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Act",
					                    "content":  String(Math.round(rows[0][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation",
					                    "content": String(Math.round(rows[3][1]))
					                  }
					                },
					                {
					                  "keyValue": {
					                    "topLabel": "Variation(%)",
					                    "content": String(Math.round(rows[4][1]))
					                  }
					                }
					              ]
					            }
					          ]
					        }
					      };
					        	  let payload = new Payload('hangouts',json,
					        		{ rawPayload: true, sendAsMessage: true});
					        	    	//agent.add(payload);
													agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

					  }).catch(error =>{
					    console.log("Something is wrong");
					    console.log(error);
					  });

		}


		function structures_cash_score_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'cashscore' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(cash_score_entity == "stcs1"){//target
								result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
							}
							else if(cash_score_entity == "stcs2"){//actual
								result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
							}
							else if(cash_score_entity == "stcs3"){//variation
								result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
							}
							else if(cash_score_entity == "stcs4"){//variation percentage
								result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"%*";
							}
							else if(cash_score_entity == "stcs5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
							}
							else if(cash_score_entity == "stcs6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function structures_ebitda_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'ebitda' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(ebitda_entity == "steb1"){//target
								result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
							}
							else if(ebitda_entity == "steb2"){//actual
								result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
							}
							else if(ebitda_entity == "steb3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
							}
							else if(ebitda_entity == "steb4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(Math.round(rows[4][1]*100)/100)+"*";
							}
							else if(ebitda_entity == "steb5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
							}
							else if(ebitda_entity == "steb6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(Math.round(rows[6][1]*100)/100)+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function structures_collection_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'collected' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(bu_colection_entity == "stcl1"){//target
								result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
							}
							else if(bu_colection_entity == "stcl2"){//actual
								result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
							}
							else if(bu_colection_entity == "stcl3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
							}
							else if(bu_colection_entity == "stcl4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(bu_colection_entity == "stcl5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
							}
							else if(bu_colection_entity == "stcl6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}


		function structures_bucontribution_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'bucontribution' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(bucontribution_entity == "stco1"){//target
								result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
							}
							else if(bucontribution_entity == "stco2"){//actual
								result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
							}
							else if(bucontribution_entity == "stco3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
							}
							else if(bucontribution_entity == "stco4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(bucontribution_entity == "stco5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
							}
							else if(bucontribution_entity == "stco6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function structures_pure_variable_cost_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(pure_variable_cost_entity == "stvc1"){//target
								result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "stvc2"){//actual
								result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "stvc3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
							}
							else if(pure_variable_cost_entity == "stvc4"){//variation percentage
								result_val = "Variation percent for the week is "+String(rows[4][1]);
							}
							else if(pure_variable_cost_entity == "stvc5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
							}
							else if(pure_variable_cost_entity == "stvc6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function structures_pure_conversion_cost_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(pure_conversion_cost_entity == "stcc1"){//target
								result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "stcc2"){//actual
								result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "stcc3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "stcc4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(pure_conversion_cost_entity == "stcc5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
							}
							else if(pure_conversion_cost_entity == "stcc6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}
		function structures_finished_production_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(finished_production_entity == "stfp1"){//target
								result_val = "Our Finished Production target for *Structures* for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "stfp2"){//actual
								result_val = "Finished Production cost value for *Structures* for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "stfp3"){//variation
								result_val = "Variation b/w Target and Actual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "stfp4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(finished_production_entity == "stfp5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
							}
							else if(finished_production_entity == "stfp6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1]);
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}

		function structures_sales_data_fetch(agent){
			const xlsxFile = require('read-excel-file/node');
			var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
			return xlsxFile('./Excel/Structures.xlsx', { sheet: 'sales' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(sales_entity == "stsl1"){//target
								result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "stsl2"){//actual
								result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "stsl3"){//variation
								result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "stsl4"){//variation percentage
								result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
							}
							else if(sales_entity == "stsl5"){
								result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
							}
							else if(sales_entity == "stsl6"){
								result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}


		////////////////////////////////////////////////////////////////////////BSM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function bsm_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/BSM.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export TMT & Domestic TMT
									result_val = "Export TMT : "+rows[2][1]+" Domestic TMT : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
									result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function bsm_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function bsm_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/BSM.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function bsm_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/BSM.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function bsm_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function bsm_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function bsm_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function bsm_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function bsm_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/BSM.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function bsm_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "bcs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "bcs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "bcs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "bcs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "bcs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "bcs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function bsm_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "beb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "beb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "beb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "beb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "beb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "beb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function bsm_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "bcl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "bcl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "bcl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "bcl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "bcl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "bcl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function bsm_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "bco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "bco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "bco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "bco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "bco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "bco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function bsm_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "bvc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "bvc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "bvc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "bvc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "bvc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "bvc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function bsm_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "bcc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "bcc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "bcc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "bcc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "bcc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "bcc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function bsm_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "bfp1"){//target
										result_val = "Our Finished Production target for bsm the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "bfp2"){//actual
										result_val = "Finished Production cost value for bsm for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "bfp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "bfp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "bfp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "bfp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function bsm_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/BSM.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "bsl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "bsl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "bsl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "bsl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "bsl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "bsl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////TMT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function tmt_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/TMT.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export TMT & Domestic TMT
									result_val = "Export TMT : "+rows[2][1]+" Domestic TMT : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
									result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function tmt_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function tmt_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/TMT.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function tmt_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/TMT.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function tmt_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function tmt_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function tmt_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function tmt_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function tmt_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/TMT.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function tmt_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "tcs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "tcs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "tcs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "tcs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "tcs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "tcs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function tmt_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "teb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "teb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "teb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "teb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "teb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "teb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function tmt_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "tcl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "tcl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "tcl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "tcl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "tcl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "tcl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function tmt_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "tco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "tco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "tco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "tco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "tco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "tco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function tmt_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "tvc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "tvc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "tvc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "tvc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "tvc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "tvc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function tmt_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "tcc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "tcc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "tcc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "tcc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "tcc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "tcc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function tmt_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "tfp1"){//target
										result_val = "Our Finished Production target for tmt the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "tfp2"){//actual
										result_val = "Finished Production cost value for tmt for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "tfp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "tfp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "tfp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "tfp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function tmt_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/TMT.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "tsl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "tsl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "tsl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "tsl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"%*";
									}
									else if(sales_entity == "tsl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "tsl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////WRM///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function wrm_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/WRM.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export wrm & Domestic wrm
									result_val = "Export wrm : "+rows[2][1]+" Domestic wrm : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
									result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function wrm_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function wrm_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/WRM.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function wrm_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/WRM.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function wrm_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function wrm_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function wrm_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function wrm_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function wrm_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/WRM.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function wrm_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "wcs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "wcs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "wcs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "wcs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "wcs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "wcs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function wrm_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "web1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "web2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "web3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "web4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "web5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "web6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function wrm_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "wcl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "wcl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "wcl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "wcl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "wcl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "wcl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function wrm_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "wco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "wco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "wco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "wco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "wco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "wco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function wrm_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "wvc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "wvc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "wvc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "wvc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "wvc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "wvc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function wrm_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "wcc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "wcc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "wcc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "wcc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "wcc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "wcc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function wrm_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "wfp1"){//target
										result_val = "Our Finished Production target for wrm the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "wfp2"){//actual
										result_val = "Finished Production cost value for wrm for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "wfp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "wfp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "wfp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "wfp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function wrm_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/WRM.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "wsl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "wsl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "wsl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "wsl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "wsl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "wsl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		////////////////////////////////////////////////////////END_OF_WRM//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		////////////////////////////////////////////////////////////////////////PLATE_ANGUL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function plate_angul_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export plate_angul & Domestic plate_angul
									result_val = "Export plate_angul : "+rows[2][1]+" Domestic plate_angul : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export plate_angul & Domestic plate_angul
									result_val = "Export plate_angul : "+rows[8][1]+" Domestic plate_angul : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function plate_angul_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function plate_angul_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function plate_angul_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function plate_angul_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function plate_angul_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function plate_angul_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function plate_angul_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function plate_angul_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function plate_angul_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "pacs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "pacs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "pacs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "pacs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "pacs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "pacs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_angul_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "paeb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "paeb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "paeb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "paeb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "paeb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "paeb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_angul_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "pacl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "pacl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "pacl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "pacl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "pacl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "pacl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function plate_angul_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "paco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "paco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "paco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "paco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "paco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "paco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_angul_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "pavc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "pavc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "pavc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "pavc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "pavc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "pavc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_angul_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "pacc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "pacc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "pacc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "pacc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "pacc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "pacc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_angul_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "pafp1"){//target
										result_val = "Our Finished Production target for plate_angul the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "pafp2"){//actual
										result_val = "Finished Production cost value for plate_angul for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "pafp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "pafp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "pafp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "pafp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_angul_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "pasl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "pasl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "pasl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "pasl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "pasl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "pasl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		////////////////////////////////////////////////////////////////////////PLATE_RAIGARH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function plate_raigarh_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export plate_raigarh & Domestic plate_raigarh
									result_val = "Export plate_raigarh : "+rows[2][1]+" Domestic plate_raigarh : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export plate_raigarh & Domestic plate_raigarh
									result_val = "Export plate_raigarh : "+rows[8][1]+" Domestic plate_raigarh : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function plate_raigarh_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function plate_raigarh_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function plate_raigarh_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function plate_raigarh_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function plate_raigarh_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function plate_raigarh_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function plate_raigarh_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function plate_raigarh_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function plate_raigarh_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "prcs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "prcs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "prcs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "prcs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "prcs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "prcs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_raigarh_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "preb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "preb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "preb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "preb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "preb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "preb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_raigarh_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "prcl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "prcl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "prcl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "prcl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "prcl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "prcl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function plate_raigarh_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "prco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "prco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "prco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "prco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "prco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "prco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_raigarh_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/PlateRaigarh.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "prvc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "prvc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "prvc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "prvc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "prvc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "prvc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_raigarh_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "prcc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "prcc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "prcc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "prcc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "prcc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "prcc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function plate_raigarh_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "prfp1"){//target
										result_val = "Our Finished Production target for plate_raigarh the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "prfp2"){//actual
										result_val = "Finished Production cost value for plate_raigarh for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "prfp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "prfp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "prfp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "prfp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function plate_raigarh_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/PlateRaigarh', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "prsl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "prsl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "prsl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "prsl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "prsl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "prsl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////SSD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function ssd_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/SSD.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export ssd & Domestic ssd
									result_val = "Export ssd : "+rows[2][1]+" Domestic ssd : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export ssd & Domestic ssd
									result_val = "Export ssd : "+rows[8][1]+" Domestic ssd : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function ssd_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function ssd_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/SSD.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function ssd_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/SSD.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function ssd_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function ssd_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function ssd_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function ssd_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function ssd_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/SSD.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function ssd_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "sscs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "sscs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "sscs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "sscs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(cash_score_entity == "sscs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "sscs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function ssd_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "sseb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "sseb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "sseb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "sseb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "sseb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "sseb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function ssd_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "sscl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "sscl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bu_colection_entity == "sscl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "sscl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "sscl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "sscl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function ssd_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "ssco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "ssco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "ssco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "ssco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "ssco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "ssco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function ssd_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "ssvc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "ssvc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "ssvc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "ssvc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "ssvc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "ssvc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function ssd_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "sscc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "sscc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "sscc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "sscc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "sscc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "sscc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function ssd_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/PlateAngul.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "ssfp1"){//target
										result_val = "Our Finished Production target for ssd the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "ssfp2"){//actual
										result_val = "Finished Production cost value for ssd for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "ssfp3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "ssfp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "ssfp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "ssfp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function ssd_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/SSD.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "sssl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sssl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sssl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sssl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "sssl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sssl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		////////////////////////////////////////////////////////////////////////SEMIS///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			function semis_contribution_data_fetch(agent){
				const xlsxFile = require('read-excel-file/node');
				var contribution_entity = req.body.queryResult.parameters.contribution_entity;
				return xlsxFile('./Excel/Semis.xlsx', { sheet: 'contribution' }).then((rows) => {
				console.log(rows);
				console.log(rows[0][1]);
				for (i in rows){
						for (j in rows[i]){
								response_text = rows[i][j];
								if(contribution_entity == "con1"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con2"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con3"){//overall domestic contribution
									result_val = rows[0][1];
								}
								else if(contribution_entity == "con4"){//overall export contribution
									result_val = rows[1][1];
								}
								else if(contribution_entity == "con5"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con6"){
									result_val = rows[1][2];
								}
								else if(contribution_entity == "con7"){
									result_val = "Iska excel mein data available nhi hai";
								}
								else if(contribution_entity == "con8"){//Export TMT & Domestic TMT
									result_val = "Export TMT : "+rows[2][1]+" Domestic TMT : "+rows[3][1];
								}
								else if(contribution_entity == "con9"){//Export Plate & Domestic Plate
									result_val = "Export Plate : "+rows[6][1]+" Domestic Plate : "+rows[7][1];
								}
								else if(contribution_entity == "con10"){//Export WRM & Domestic WRM
									result_val = "Export WRM : "+rows[8][1]+" Domestic WRM : "+rows[9][1];
								}
								else{
									result_val = "Contribution Query Result not found";
								}
						}
				}
				agent.add(result_val);
				//return agent.add("End");
				console.log("End");
				//agent.add(response_text);
			}).catch(error =>{
				console.log("Something is wrong");
				console.log(error);
				//agent.add(bot_response);
			});
			}


				function semis_finished_production_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'finishedproduction' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
											"hangouts": {
												"header": {
													"title": "Finished Production Summary",
													"subtitle": "",
													"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
												},
												"sections": [

													{
														"widgets": [
															{
																"keyValue": {
																	//"icon": "TRAIN",
																	"topLabel": "UOM",
																	"content": "Rs. Cr"
																}
															},
															{
																"keyValue": {
																	"topLabel": "Tgt",
																	"content": String(Math.round(rows[2][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Act",
																	"content":  String(Math.round(rows[0][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation",
																	"content": String(Math.round(rows[3][1]))
																}
															},
															{
																"keyValue": {
																	"topLabel": "Variation(%)",
																	"content": String(Math.round(rows[4][1]))
																}
															}
														]
													}
												]
											}
										};
													let payload = new Payload('hangouts',json,
													{ rawPayload: true, sendAsMessage: true});
															//agent.add(payload);
															agent.add("Hey, *Finished Production* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

								}).catch(error =>{
									console.log("Something is wrong");
									console.log(error);
								});
				}


			function semis_sales_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/Semis.xlsx', { sheet: 'sales' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Sales Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey, *Sales* for the week has been *"+String(Math.round(rows[0][1]*100)/100)+"MT* against the target *"+String(Math.round(rows[2][1]*100)/100)+"MT* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"MT.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

			function semis_collection_summary(agent){
						const xlsxFile = require('read-excel-file/node');
						return xlsxFile('./Excel/Semis.xlsx', { sheet: 'collected' }).then((rows) => {

						const {Payload} = require('dialogflow-fulfillment');
						const json = {
										"hangouts": {
											"header": {
												"title": "Cash Collection Summary",
												"subtitle": "",
												"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
											},
											"sections": [

												{
													"widgets": [
														{
															"keyValue": {
																//"icon": "TRAIN",
																"topLabel": "UOM",
																"content": "Rs. Cr"
															}
														},
														{
															"keyValue": {
																"topLabel": "Tgt",
																"content": String(Math.round(rows[2][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Act",
																"content":  String(Math.round(rows[0][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation",
																"content": String(Math.round(rows[3][1]))
															}
														},
														{
															"keyValue": {
																"topLabel": "Variation(%)",
																"content": String(Math.round(rows[4][1]))
															}
														}
													]
												}
											]
										}
									};
												let payload = new Payload('hangouts',json,
												{ rawPayload: true, sendAsMessage: true});
														//agent.add(payload);
														agent.add("Hey,  *Cash Collection* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							}).catch(error =>{
								console.log("Something is wrong");
								console.log(error);
							});

			}

				function semis_cash_score_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'cashscore' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Cash Score Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey,  *Cash Score* for the week has been *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against the target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function semis_pure_variable_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'purevariablecost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Variable Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Variable Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *₹"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}
				function semis_pure_conversion_cost_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Pure Conversion Cost Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs./t"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *Pure Conversion Cost* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"/t* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"/t.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function semis_ebitda_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'ebitda' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *EBITDA* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}

				function semis_bucontribution_summary(agent){
							const xlsxFile = require('read-excel-file/node');
							return xlsxFile('./Excel/Semis.xlsx', { sheet: 'bucontribution' }).then((rows) => {

							const {Payload} = require('dialogflow-fulfillment');
							const json = {
							        "hangouts": {
							          "header": {
							            "title": "Ebitda Summary",
							            "subtitle": "",
							            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqEMEchTXGLpGvDQP6LZuCVRTohojlxK9snQ&usqp=CAU"
							          },
							          "sections": [

							            {
							              "widgets": [
							                {
							                  "keyValue": {
							                    //"icon": "TRAIN",
							                    "topLabel": "UOM",
							                    "content": "Rs. Cr"
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Tgt",
							                    "content": String(Math.round(rows[2][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Act",
							                    "content":  String(Math.round(rows[0][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation",
							                    "content": String(Math.round(rows[3][1]))
							                  }
							                },
							                {
							                  "keyValue": {
							                    "topLabel": "Variation(%)",
							                    "content": String(Math.round(rows[4][1]))
							                  }
							                }
							              ]
							            }
							          ]
							        }
							      };
							        	  let payload = new Payload('hangouts',json,
							        		{ rawPayload: true, sendAsMessage: true});
							        	    	//agent.add(payload);
															agent.add("Hey, *BU Contribution* for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr* against Target *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr* with the variation of *"+String(Math.round(rows[3][1]*100)/100)+"Cr.("+String(rows[4][1])+").*");

							  }).catch(error =>{
							    console.log("Something is wrong");
							    console.log(error);
							  });

				}


				function semis_cash_score_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var cash_score_entity = req.body.queryResult.parameters.cash_score_entity;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'cashscore' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(cash_score_entity == "secs1"){//target
										result_val = "Our Cash Score target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "secs2"){//actual
										result_val = " Cash Score value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "secs3"){//variation
										result_val = "Cash Score Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(cash_score_entity == "secs4"){//variation percentage
										result_val = "Cash Score Variation percent for the week is *"+String(rows[4][1])+"%*";
									}
									else if(cash_score_entity == "secs5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Score is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(cash_score_entity == "secs6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Score is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function semis_ebitda_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var ebitda_entity = req.body.queryResult.parameters.ebitda_parameters;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'ebitda' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(ebitda_entity == "seeb1"){//target
										result_val = "Our Editda target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(ebitda_entity == "seeb2"){//actual
										result_val = "EBITDA value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(ebitda_entity == "seeb3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(ebitda_entity == "seeb4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(ebitda_entity == "seeb5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Ebitda is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(ebitda_entity == "seeb6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Ebitda is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function semis_collection_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bu_colection_entity = req.body.queryResult.parameters.bu_colection;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'collected' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bu_colection_entity == "secl1"){//target
										result_val = "Our Cash Collection target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bu_colection_entity == "secl2"){//actual
										result_val = "Cash Collection Collection value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "secl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bu_colection_entity == "secl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bu_colection_entity == "secl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Cash Collection is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bu_colection_entity == "secl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Cash Collection is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}


				function semis_bucontribution_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var bucontribution_entity = req.body.queryResult.parameters.bu_contribution;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'bucontribution' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(bucontribution_entity == "seco1"){//target
										result_val = "Our BU Contribution target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"Cr.*	";
									}
									else if(bucontribution_entity == "seco2"){//actual
										result_val = "BU Contribution value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"Cr.";
									}
									else if(bucontribution_entity == "seco3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"Cr.*";
									}
									else if(bucontribution_entity == "seco4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(bucontribution_entity == "seco5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for BU Contribution is *₹"+String(Math.round(rows[5][1]*100)/100)+"*";
									}
									else if(bucontribution_entity == "seco6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for BU Contribution is *₹"+String(rows[6][1])+"*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function semis_pure_variable_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_variable_cost_entity = req.body.queryResult.parameters.pure_variable_cost_entity;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'purevariablecost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_variable_cost_entity == "sevc1"){//target
										result_val = "Our Pure Variable Cost target for the week was set to ₹"+String(Math.round(rows[2][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "sevc2"){//actual
										result_val = "Pure Variable Cost value for the week is ₹"+String(Math.round(rows[0][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "sevc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is ₹"+String(Math.round(rows[3][1]*100)/100)+"/t";
									}
									else if(pure_variable_cost_entity == "sevc4"){//variation percentage
										result_val = "Variation percent for the week is "+String(rows[4][1]);
									}
									else if(pure_variable_cost_entity == "sevc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Variable Cost is "+String(Math.round(rows[5][1]));
									}
									else if(pure_variable_cost_entity == "sevc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Variable Cost is "+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function semis_pure_conversion_cost_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var pure_conversion_cost_entity = req.body.queryResult.parameters.pure_conversion_cost_entity;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'pureconversioncost' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(pure_conversion_cost_entity == "secc1"){//target
										result_val = "Our Pure Conversion target for the week was set to *₹"+String(Math.round(rows[2][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "secc2"){//actual
										result_val = "Pure Conversion cost value for the week is *₹"+String(Math.round(rows[0][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "secc3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *₹"+String(Math.round(rows[3][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "secc4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(pure_conversion_cost_entity == "secc5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Pure Conversion Cost is *₹"+String(Math.round(rows[5][1]*100)/100)+"/t*";
									}
									else if(pure_conversion_cost_entity == "secc6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Pure Conversion Cost is *₹"+String(rows[6][1])+"/t*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}
				function semis_finished_production_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var finished_production_entity = req.body.queryResult.parameters.bu_fin_product;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'finishedproduction' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(finished_production_entity == "sefp1"){//target
										result_val = "Our Finished Production target for *semis* for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "sefp2"){//actual
										result_val = "Finished Production cost value for *semis* for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "sefp3"){//variation
										result_val = "Variation b/w Target and Actual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "sefp4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(finished_production_entity == "sefp5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Finished Production is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(finished_production_entity == "sefp6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Finished Production is *"+String(rows[6][1]);
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

				function semis_sales_data_fetch(agent){
					const xlsxFile = require('read-excel-file/node');
					var sales_entity = req.body.queryResult.parameters.bu_sales_entity;
					return xlsxFile('./Excel/Semis.xlsx', { sheet: 'sales' }).then((rows) => {
					console.log(rows);
					console.log(rows[0][1]);
					for (i in rows){
							for (j in rows[i]){
									response_text = rows[i][j];
									if(sales_entity == "sesl1"){//target
										result_val = "Our Sales target for the week was set to *"+String(Math.round(rows[2][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sesl2"){//actual
										result_val = "Sales value for the week is *"+String(Math.round(rows[0][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sesl3"){//variation
										result_val = "Variation b/w Target and Auctual for the week is *"+String(Math.round(rows[3][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sesl4"){//variation percentage
										result_val = "Variation percent for the week is *"+String(rows[4][1])+"*";
									}
									else if(sales_entity == "sesl5"){
										result_val = "The gap between average 4 Wk. rolling forecast Vs moving Avg for Sales is *"+String(Math.round(rows[5][1]*100)/100)+"MT*";
									}
									else if(sales_entity == "sesl6"){
										result_val = "The variation b/w plan Vs actual in absolute and % terms for Sales is *"+String(rows[6][1])+"MT*";
									}
									else{
										result_val = "Query Result not found";
									}
							}
					}
					agent.add(result_val);
					//return agent.add("End");
					console.log("End");
					//agent.add(response_text);
				}).catch(error =>{
					console.log("Something is wrong");
					console.log(error);
					//agent.add(bot_response);
				});
				}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function demo(agent){
		const xlsxFile = require('read-excel-file/node');
		var its_parameter = req.body.queryResult.parameters.its;
		return xlsxFile('./DemoExcel.xlsx', { sheet: 1 }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
        for (j in rows[i]){
						//agent.add(rows[i][j]);
						//console.log(rows[i][j]);
						//agent.add(rows[i][j]);
						response_text = rows[i][j];
						if(its_parameter == "its1" || its_parameter == "ITS1"){
							result_val = rows[1][2];
							//agent.add(rows[1][2]);
							//console.log(rows[1][2]);
						}
						else{
							//console.log("Not matching");
							//agent.add("Not matching");
							result_val = rows[1][2];
						}
        }
    }
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
}
	function analytics(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {prebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');
		console.log("In the Analtics function");

		agent.add(new Card({
			title : "Welcome to The Analytics Page",
			imageUrl : 'http://nextrestaurants.com/wp-content/uploads/2017/06/Restaurant-Website-Analytics-810x456.png',
			text : 'Click Link below ',
			buttonText : 'Link',
			buttonUrl : 'https://ithelpdesk.jspl.com:9443/ItSupport/jspl/common/ticket-add.html'
		}));
		agent.add("I am learning about this and would be able to take related queries soon. Till then you may please raise a ticket on the above link")

	}

	function infra(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');

		console.log("In the Infra function");

		agent.add(new Card({
			title : "Welcome to The Infra Page",
			imageUrl : 'https://www.anderapartners.com/wp-content/uploads/2019/04/Infra-2.png',
			text : 'Click Link below ',
			buttonText : 'Link',
			buttonUrl : 'https://ithelpdesk.jspl.com:9443/ItSupport/jspl/common/ticket-add.html'
		}));
		agent.add("I am learning about this and would be able to take related queries soon. Till then you may please raise a ticket on the above link")

	}


	function portals(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');

		console.log("In the Portals function");

		agent.add(new Card({
			title : "Welcome to The Portals Page",
			imageUrl : 'https://www.flexsin.com/blog/wp-content/uploads/2017/05/Web-portal-development.jpg',
			text : 'Click Link below ',
			buttonText : 'Link',
			buttonUrl : 'https://ithelpdesk.jspl.com:9443/ItSupport/jspl/common/ticket-add.html'
		}));
		agent.add("I am learning about this and would be able to take related queries soon. Till then you may please raise a ticket on the above link")

	}

	function sap(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');

		console.log("In the SAP function");

		agent.add(new Card({
			title : "Welcome to The SAP Page",
			imageUrl : 'https://www.capgemini.com/in-en/wp-content/uploads/sites/6/2017/09/sap-3.png',//https://drive.google.com/file/d/1j0gT_9r-csGmGeYxMhwOT_oF7zF8c8PH/view?usp=sharing
			text : 'Click Link below ',
			buttonText : 'Link',
			buttonUrl : 'https://ithelpdesk.jspl.com:9443/ItSupport/jspl/common/ticket-add.html'
		}));
		agent.add("I am learning about this and would be able to take related queries soon. Till then you may please raise a ticket on the above link")

	}


	function start(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');

		agent.add("Hey Jindalite, I am ePanther, your digital assistant. I'm just 2 days old and may not be knowing everything so bear with me. You may select your query from the list below or type in directly.    1)Analytics 2)SAP 3)Portals 4)Infra 5)Weather 6)Stock");
		agent.add(new Suggestion("Stock"));
		agent.add(new Suggestion("Weather"));
		console.log("In the start function");
	}
	function pre_revenue(agent){
		const xlsxFile = require('read-excel-file/node');
		var pre_revenue_entity = req.body.queryResult.parameters.pre_revenue_entity;
		var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
		return xlsxFile('./Excel/PastPerformance.xlsx', { sheet: 'Summary' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(pre_revenue_entity == "PRE13" && pre_location_entity == "JSPL"){//target
							result_val = "Hey, JSPL Standalone Turnover for FY13 has been *₹"+String(Math.round(rows[4][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Turnover for FY13 has been *₹"+String(Math.round(rows[5][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Turnover for FY13 has been *₹"+String(Math.round(rows[6][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Turnover for FY13 has been *₹"+String(Math.round(rows[7][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Turnover for FY13 has been *₹"+String(Math.round(rows[8][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Turnover for FY13 has been *₹"+String(Math.round(rows[9][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Turnover for FY13 has been *₹"+String(Math.round(rows[10][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Turnover for FY13 has been *₹"+String(Math.round(rows[11][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Turnover for FY13 has been *₹"+String(Math.round(rows[14][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE13" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY13 has been *₹"+String(Math.round(rows[13][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Turnover for FY14 has been *₹"+String(Math.round(rows[4][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Turnover for FY14 has been *₹"+String(Math.round(rows[5][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Turnover for FY14 has been *₹"+String(Math.round(rows[6][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Turnover for FY14 has been *₹"+String(Math.round(rows[7][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Turnover for FY14 has been *₹"+String(Math.round(rows[8][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Turnover for FY14 has been *₹"+String(Math.round(rows[9][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Turnover for FY14 has been *₹"+String(Math.round(rows[10][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Turnover for FY14 has been *₹"+String(Math.round(rows[11][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Turnover for FY14 has been *₹"+String(Math.round(rows[14][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE14" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY14 has been *₹"+String(Math.round(rows[13][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Turnover for FY15 has been *₹"+String(Math.round(rows[4][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Turnover for FY15 has been *₹"+String(Math.round(rows[5][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Turnover for FY15 has been *₹"+String(Math.round(rows[6][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Turnover for FY15 has been *₹"+String(Math.round(rows[7][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Turnover for FY15 has been *₹"+String(Math.round(rows[8][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Turnover for FY15 has been *₹"+String(Math.round(rows[9][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Turnover for FY15 has been *₹"+String(Math.round(rows[10][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Turnover for FY15 has been *₹"+String(Math.round(rows[11][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Turnover for FY15 has been *₹"+String(Math.round(rows[14][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE15" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY15 has been *₹"+String(Math.round(rows[13][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Turnover for FY16 has been *₹"+String(Math.round(rows[4][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Turnover for FY16 has been *₹"+String(Math.round(rows[5][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL  Turnover for FY16 has been *₹"+String(Math.round(rows[6][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL  Turnover for FY16 has been *₹"+String(Math.round(rows[7][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique  Turnover for FY16 has been *₹"+String(Math.round(rows[8][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA  Turnover for FY16 has been *₹"+String(Math.round(rows[9][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL  Turnover for FY16 has been *₹"+String(Math.round(rows[10][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML  Turnover for FY16 has been *₹"+String(Math.round(rows[11][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Turnover for FY16 has been *₹"+String(Math.round(rows[14][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE16" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY16 has been *₹"+String(Math.round(rows[13][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Turnover for FY17 has been *₹"+String(Math.round(rows[4][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Turnover for FY17 has been *₹"+String(Math.round(rows[5][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Turnover for FY17 has been *₹"+String(Math.round(rows[6][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Turnover for FY17 has been *₹"+String(Math.round(rows[7][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Turnover for FY17 has been *₹"+String(Math.round(rows[8][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Turnover for FY17 has been *₹"+String(Math.round(rows[9][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Turnover for FY17 has been *₹"+String(Math.round(rows[10][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Turnover for FY17 has been *₹"+String(Math.round(rows[11][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Turnover for FY17 has been *₹"+String(Math.round(rows[14][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE17" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY17 has been *₹"+String(Math.round(rows[13][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Turnover for FY18 has been *₹"+String(Math.round(rows[4][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Turnover for FY18 has been *₹"+String(Math.round(rows[5][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL  Turnover for FY18 has been *₹"+String(Math.round(rows[6][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL  Turnover for FY18 has been *₹"+String(Math.round(rows[7][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique  Turnover for FY18 has been *₹"+String(Math.round(rows[8][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA  Turnover for FY18 has been *₹"+String(Math.round(rows[9][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL  Turnover for FY18 has been *₹"+String(Math.round(rows[10][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML  Turnover for FY18 has been *₹"+String(Math.round(rows[11][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Turnover for FY18 has been *₹"+String(Math.round(rows[14][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE18" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY18 has been *₹"+String(Math.round(rows[13][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Turnover for FY19 has been *₹"+String(Math.round(rows[4][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Turnover for FY19 has been *₹"+String(Math.round(rows[5][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Turnover for FY19 has been *₹"+String(Math.round(rows[6][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Turnover for FY19 has been *₹"+String(Math.round(rows[7][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Turnover for FY19 has been *₹"+String(Math.round(rows[8][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Turnover for FY19 has been *₹"+String(Math.round(rows[9][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Turnover for FY19 has been *₹"+String(Math.round(rows[10][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Turnover for FY19 has been *₹"+String(Math.round(rows[11][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Turnover for FY19 has been *₹"+String(Math.round(rows[14][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE19" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY19 has been *₹"+String(Math.round(rows[13][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Turnover for FY20 has been *₹"+String(Math.round(rows[4][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Turnover for FY20 has been *₹"+String(Math.round(rows[5][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL  Turnover for FY20 has been *₹"+String(Math.round(rows[6][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPLA  Turnover for FY20 has been *₹"+String(Math.round(rows[7][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique  Turnover for FY20 has been *₹"+String(Math.round(rows[8][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Turnover for FY20 has been *₹"+String(Math.round(rows[9][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Turnover for FY20 has been *₹"+String(Math.round(rows[10][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Turnover for FY20 has been *₹"+String(Math.round(rows[11][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Turnover for FY20 has been *₹"+String(Math.round(rows[14][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PRE20" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Turnover for FY20 has been *₹"+String(Math.round(rows[13][9]))+"Cr*";
						}
						else{
							result_val = "Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}
	function peb_ebitda(agent){
		const xlsxFile = require('read-excel-file/node');
		var pre_revenue_entity = req.body.queryResult.parameters.pre_revenue_entity;
		var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
		return xlsxFile('./Excel/PastPerformance.xlsx', { sheet: 'Summary' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(pre_revenue_entity == "PEB13" && pre_location_entity == "JSPL"){//target
							result_val = "Hey, JSPL Standalone EBITDA for FY13 has been *₹"+String(Math.round(rows[20][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL EBITDA for FY13 has been *₹"+String(Math.round(rows[21][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL EBITDA for FY13 has been *₹"+String(Math.round(rows[22][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL EBITDA for FY13 has been *₹"+String(Math.round(rows[23][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique EBITDA for FY13 has been *₹"+String(Math.round(rows[24][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA EBITDA for FY13 has been *₹"+String(Math.round(rows[25][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL EBITDA for FY13 has been *₹"+String(Math.round(rows[26][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML EBITDA for FY13 has been *₹"+String(Math.round(rows[27][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  EBITDA for FY13 has been *₹"+String(Math.round(rows[30][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB13" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY13 has been *₹"+String(Math.round(rows[29][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL EBITDA for FY14 has been *₹"+String(Math.round(rows[20][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  EBITDA for FY14 has been *₹"+String(Math.round(rows[21][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL EBITDA for FY14 has been *₹"+String(Math.round(rows[22][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL EBITDA for FY14 has been *₹"+String(Math.round(rows[23][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique EBITDA for FY14 has been *₹"+String(Math.round(rows[24][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA EBITDA for FY14 has been *₹"+String(Math.round(rows[25][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL  EBITDA for FY14 has been *₹"+String(Math.round(rows[26][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML EBITDA for FY14 has been *₹"+String(Math.round(rows[21][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS EBITDA for FY14 has been *₹"+String(Math.round(rows[30][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB14" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY14 has been *₹"+String(Math.round(rows[29][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  EBITDA for FY15 has been *₹"+String(Math.round(rows[20][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL EBITDA for FY15 has been *₹"+String(Math.round(rows[21][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL EBITDA for FY15 has been *₹"+String(Math.round(rows[22][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL EBITDA for FY15 has been *₹"+String(Math.round(rows[23][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique EBITDA for FY15 has been *₹"+String(Math.round(rows[24][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA EBITDA for FY15 has been *₹"+String(Math.round(rows[25][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL EBITDA for FY15 has been *₹"+String(Math.round(rows[26][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML EBITDA for FY15 has been *₹"+String(Math.round(rows[27][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  EBITDA for FY15 has been *₹"+String(Math.round(rows[30][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB15" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY15 has been *₹"+String(Math.round(rows[29][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL EBITDA for FY16 has been *₹"+String(Math.round(rows[20][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  EBITDA for FY16 has been *₹"+String(Math.round(rows[21][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL  EBITDA for FY16 has been *₹"+String(Math.round(rows[22][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JPL  EBITDA for FY16 has been *₹"+String(Math.round(rows[23][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique EBITDA for FY16 has been *₹"+String(Math.round(rows[24][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA EBITDA for FY16 has been *₹"+String(Math.round(rows[25][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL EBITDA for FY16 has been *₹"+String(Math.round(rows[26][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML EBITDA for FY16 has been *₹"+String(Math.round(rows[27][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS EBITDA for FY16 has been *₹"+String(Math.round(rows[30][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB16" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY16 has been *₹"+String(Math.round(rows[29][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  EBITDA for FY17 has been *₹"+String(Math.round(rows[20][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL EBITDA for FY17 has been *₹"+String(Math.round(rows[21][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL EBITDA for FY17 has been *₹"+String(Math.round(rows[22][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL EBITDA for FY17 has been *₹"+String(Math.round(rows[23][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique EBITDA for FY17 has been *₹"+String(Math.round(rows[24][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA EBITDA for FY17 has been *₹"+String(Math.round(rows[25][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL EBITDA for FY17 has been *₹"+String(Math.round(rows[26][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML EBITDA for FY17 has been *₹"+String(Math.round(rows[27][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  EBITDA for FY17 has been *₹"+String(Math.round(rows[30][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB17" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY17 has been *₹"+String(Math.round(rows[29][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL EBITDA for FY18 has been *₹"+String(Math.round(rows[20][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  EBITDA for FY18 has been *₹"+String(Math.round(rows[21][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL  EBITDA for FY18 has been *₹"+String(Math.round(rows[22][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL  EBITDA for FY18 has been *₹"+String(Math.round(rows[23][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique  EBITDA for FY18 has been *₹"+String(Math.round(rows[24][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA  EBITDA for FY18 has been *₹"+String(Math.round(rows[25][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL  EBITDA for FY18 has been *₹"+String(Math.round(rows[26][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML  EBITDA for FY18 has been *₹"+String(Math.round(rows[27][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS EBITDA for FY18 has been *₹"+String(Math.round(rows[30][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB18" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY18 has been *₹"+String(Math.round(rows[29][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  EBITDA for FY19 has been *₹"+String(Math.round(rows[20][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL EBITDA for FY19 has been *₹"+String(Math.round(rows[21][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL EBITDA for FY19 has been *₹"+String(Math.round(rows[22][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL EBITDA for FY19 has been *₹"+String(Math.round(rows[23][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique EBITDA for FY19 has been *₹"+String(Math.round(rows[24][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA EBITDA for FY19 has been *₹"+String(Math.round(rows[25][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL EBITDA for FY19 has been *₹"+String(Math.round(rows[26][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML EBITDA for FY19 has been *₹"+String(Math.round(rows[27][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  EBITDA for FY19 has been *₹"+String(Math.round(rows[30][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB19" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY19 has been *₹"+String(Math.round(rows[29][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL EBITDA for FY20 has been *₹"+String(Math.round(rows[20][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL EBITDA for FY20 has been *₹"+String(Math.round(rows[21][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL EBITDA for FY20 has been *₹"+String(Math.round(rows[22][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL EBITDA for FY20 has been *₹"+String(Math.round(rows[23][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique EBITDA for FY20 has been *₹"+String(Math.round(rows[24][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA EBITDA for FY20 has been *₹"+String(Math.round(rows[25][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL EBITDA for FY20 has been *₹"+String(Math.round(rows[26][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML EBITDA for FY20 has been *₹"+String(Math.round(rows[27][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS EBITDA for FY20 has been *₹"+String(Math.round(rows[30][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PEB20" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed EBITDA for FY20 has been *₹"+String(Math.round(rows[29][9]))+"Cr*";
						}
						else{
							result_val = "Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}
	function pfc_finance_cost(agent){
		const xlsxFile = require('read-excel-file/node');
		var pre_revenue_entity = req.body.queryResult.parameters.pre_revenue_entity;
		var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
		return xlsxFile('./Excel/PastPerformance.xlsx', { sheet: 'Summary' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(pre_revenue_entity == "PFC13" && pre_location_entity == "JSPL"){//target
							result_val = "Hey, JSPL Standalone Finance Cost for FY13 has been *₹"+String(Math.round(rows[37][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Finance Cost for FY13 has been *₹"+String(Math.round(rows[38][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Finance Cost for FY13 has been *₹"+String(Math.round(rows[39][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Finance Cost for FY13 has been *₹"+String(Math.round(rows[40][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Finance Cost for FY13 has been *₹"+String(Math.round(rows[41][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Finance Cost for FY13 has been *₹"+String(Math.round(rows[42][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Finance Cost for FY13 has been *₹"+String(Math.round(rows[43][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Finance Cost for FY13 has been *₹"+String(Math.round(rows[44][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Finance Cost for FY13 has been *₹"+String(Math.round(rows[47][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC13" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY13 has been *₹"+String(Math.round(rows[46][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Finance Cost for FY14 has been *₹"+String(Math.round(rows[37][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Finance Cost for FY14 has been *₹"+String(Math.round(rows[38][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Finance Cost for FY13 has been *₹"+String(Math.round(rows[39][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Finance Cost for FY13 has been *₹"+String(Math.round(rows[40][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Finance Cost for FY13 has been *₹"+String(Math.round(rows[41][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Finance Cost for FY13 has been *₹"+String(Math.round(rows[42][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Finance Cost for FY13 has been *₹"+String(Math.round(rows[43][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Finance Cost for FY13 has been *₹"+String(Math.round(rows[44][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Finance Cost for FY14 has been *₹"+String(Math.round(rows[47][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC14" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY14 has been *₹"+String(Math.round(rows[46][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Finance Cost for FY15 has been *₹"+String(Math.round(rows[37][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Finance Cost for FY15 has been *₹"+String(Math.round(rows[38][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Finance Cost for FY15 has been *₹"+String(Math.round(rows[39][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Finance Cost for FY15 has been *₹"+String(Math.round(rows[40][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Finance Cost for FY15 has been *₹"+String(Math.round(rows[41][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Finance Cost for FY15 has been *₹"+String(Math.round(rows[42][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Finance Cost for FY15 has been *₹"+String(Math.round(rows[43][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Finance Cost for FY15 has been *₹"+String(Math.round(rows[44][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Finance Cost for FY15 has been *₹"+String(Math.round(rows[47][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC15" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY15 has been *₹"+String(Math.round(rows[46][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Finance Cost for FY16 has been *₹"+String(Math.round(rows[37][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL Finance Cost for FY16 has been *₹"+String(Math.round(rows[38][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Finance Cost for FY16 has been *₹"+String(Math.round(rows[39][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Finance Cost for FY16 has been *₹"+String(Math.round(rows[40][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Finance Cost for FY16 has been *₹"+String(Math.round(rows[41][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Finance Cost for FY16 has been *₹"+String(Math.round(rows[42][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Finance Cost for FY16 has been *₹"+String(Math.round(rows[43][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Finance Cost for FY16 has been *₹"+String(Math.round(rows[44][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Finance Cost for FY16 has been *₹"+String(Math.round(rows[47][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC16" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY16 has been *₹"+String(Math.round(rows[46][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Finance Cost for FY17 has been *₹"+String(Math.round(rows[37][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Finance Cost for FY17 has been *₹"+String(Math.round(rows[38][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Finance Cost for FY17 has been *₹"+String(Math.round(rows[39][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Finance Cost for FY17 has been *₹"+String(Math.round(rows[40][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Finance Cost for FY17 has been *₹"+String(Math.round(rows[41][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Finance Cost for FY17 has been *₹"+String(Math.round(rows[42][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Finance Cost for FY17 has been *₹"+String(Math.round(rows[43][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Finance Cost for FY17 has been *₹"+String(Math.round(rows[44][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Finance Cost for FY17 has been *₹"+String(Math.round(rows[47][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC17" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY17 has been *₹"+String(Math.round(rows[46][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Finance Cost for FY18 has been *₹"+String(Math.round(rows[37][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Finance Cost for FY18 has been *₹"+String(Math.round(rows[38][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Finance Cost for FY18 has been *₹"+String(Math.round(rows[39][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Finance Cost for FY18 has been *₹"+String(Math.round(rows[40][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Finance Cost for FY18 has been *₹"+String(Math.round(rows[41][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Finance Cost for FY18 has been *₹"+String(Math.round(rows[42][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Finance Cost for FY18 has been *₹"+String(Math.round(rows[43][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Finance Cost for FY18 has been *₹"+String(Math.round(rows[44][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Finance Cost for FY18 has been *₹"+String(Math.round(rows[47][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC18" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY18 has been *₹"+String(Math.round(rows[46][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Finance Cost for FY19 has been *₹"+String(Math.round(rows[37][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Finance Cost for FY19 has been *₹"+String(Math.round(rows[38][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Finance Cost for FY19 has been *₹"+String(Math.round(rows[39][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Finance Cost for FY19 has been *₹"+String(Math.round(rows[40][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Finance Cost for FY19 has been *₹"+String(Math.round(rows[41][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Finance Cost for FY19 has been *₹"+String(Math.round(rows[42][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Finance Cost for FY19 has been *₹"+String(Math.round(rows[43][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Finance Cost for FY19 has been *₹"+String(Math.round(rows[44][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Finance Cost for FY19 has been *₹"+String(Math.round(rows[47][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC19" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY19 has been *₹"+String(Math.round(rows[46][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Finance Cost for FY20 has been *₹"+String(Math.round(rows[37][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL Finance Cost for FY20 has been *₹"+String(Math.round(rows[38][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Finance Cost for FY20 has been *₹"+String(Math.round(rows[39][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Finance Cost for FY20 has been *₹"+String(Math.round(rows[40][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Finance Cost for FY20 has been *₹"+String(Math.round(rows[41][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Finance Cost for FY20 has been *₹"+String(Math.round(rows[42][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Finance Cost for FY20 has been *₹"+String(Math.round(rows[43][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Finance Cost for FY20 has been *₹"+String(Math.round(rows[44][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Finance Cost for FY20 has been *₹"+String(Math.round(rows[47][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PFC20" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Finance Cost for FY20 has been *₹"+String(Math.round(rows[46][9]))+"Cr*";
						}
						else{
							result_val = "Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}

	function pbt_profit_before_tax(agent){
		const xlsxFile = require('read-excel-file/node');
		var pre_revenue_entity = req.body.queryResult.parameters.pre_revenue_entity;
		var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
		return xlsxFile('./Excel/PastPerformance.xlsx', { sheet: 'Summary' }).then((rows) => {
		console.log(rows);
		console.log(rows[0][1]);
		for (i in rows){
				for (j in rows[i]){
						response_text = rows[i][j];
						if(pre_revenue_entity == "PBT13" && pre_location_entity == "JSPL"){//target
							result_val = "Hey, JSPL Standalone Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[53][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[54][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[55][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[56][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[57][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[58][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[59][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[54][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[63][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT13" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY13 has been *₹"+String(Math.round(rows[62][2]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[53][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[54][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCl Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[55][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[55][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[56][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[57][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[58][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML  Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[54][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[63][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT14" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY14 has been *₹"+String(Math.round(rows[62][3]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[53][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[54][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[55][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[56][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[57][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[58][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[59][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[60][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[63][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT15" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY15 has been *₹"+String(Math.round(rows[62][4]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[53][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[54][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[55][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[56][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[57][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[58][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[59][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[60][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[64][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT16" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY16 has been *₹"+String(Math.round(rows[62][5]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[53][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[54][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[55][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[56][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[57][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[58][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[59][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[54][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[63][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT17" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY17 has been *₹"+String(Math.round(rows[62][6]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[53][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[54][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[55][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[56][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[57][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[58][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL  Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[59][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[60][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[63][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT18" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY18 has been *₹"+String(Math.round(rows[62][7]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JSPL"){//variation
							result_val = "Hey, JSPL  Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[53][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JPL" ){//actual
							result_val = "Hey, JPL Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[54][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "WCL" ){//actual
							result_val = "Hey, WCL Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[55][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JSPAL" ){//actual
							result_val = "Hey, JSPAL Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[56][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "Mozambique" ){//actual
							result_val = "Hey, Mozambique Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[57][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JMSA" ){//actual
							result_val = "Hey, JMSA Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[58][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JAIPL" ){//actual
							result_val = "Hey, JAIPL Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[59][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JSPML" ){//actual
							result_val = "Hey, JSPML Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[60][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "SHADEED"){//variation
							result_val = "Hey, JSIS  Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[63][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT19" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY19 has been *₹"+String(Math.round(rows[62][8]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JSPL" ){//actual
							result_val = "Hey, JSPL Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[53][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JPL"){//variation
							result_val = "Hey, JPL  Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[54][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "WCL"){//variation
							result_val = "Hey, WCL Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[55][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JSPAL"){//variation
							result_val = "Hey, JSPAL Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[56][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "Mozambique"){//variation
							result_val = "Hey, Mozambique Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[57][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JMSA"){//variation
							result_val = "Hey, JMSA Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[58][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JAIPL"){//variation
							result_val = "Hey, JAIPL Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[59][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JSPML"){//variation
							result_val = "Hey, JSPML Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[60][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "SHADEED" ){//actual
							result_val = "Hey, JSIS Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[63][9]))+"Cr*";
						}
						else if(pre_revenue_entity == "PBT20" && pre_location_entity == "JCBS" ){//actual
							result_val = "Hey, Jindal Consol Before Shadeed Profit Before Tax for FY20 has been *₹"+String(Math.round(rows[62][9]))+"Cr*";
						}
						else{
							result_val = "Query Result not found";
						}
				}
		}
		agent.add(result_val);
		//return agent.add("End");
		console.log("End");
		//agent.add(response_text);
	}).catch(error =>{
		console.log("Something is wrong");
		console.log(error);
		//agent.add(bot_response);
	});
	}


		function pat_profit_after_tax(agent){
			const xlsxFile = require('read-excel-file/node');
			var pre_revenue_entity = req.body.queryResult.parameters.pre_revenue_entity;
			var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
			return xlsxFile('./Excel/PastPerformance.xlsx', { sheet: 'Summary' }).then((rows) => {
			console.log(rows);
			console.log(rows[0][1]);
			for (i in rows){
					for (j in rows[i]){
							response_text = rows[i][j];
							if(pre_revenue_entity == "PAT13" && pre_location_entity == "JSPL"){//target
								result_val = "Hey, JSPL Standalone Profit After Tax for FY13 has been *₹"+String(Math.round(rows[69][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JPL" ){//actual
								result_val = "Hey, JPL Profit After Tax for FY13 has been *₹"+String(Math.round(rows[70][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "WCL" ){//actual
								result_val = "Hey, WCL Profit After Tax for FY13 has been *₹"+String(Math.round(rows[71][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JSPAL" ){//actual
								result_val = "Hey, JSPAL Profit After Tax for FY13 has been *₹"+String(Math.round(rows[72][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "Mozambique" ){//actual
								result_val = "Hey, Mozambique Profit After Tax for FY13 has been *₹"+String(Math.round(rows[73][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JMSA" ){//actual
								result_val = "Hey, JMSA Profit After Tax for FY13 has been *₹"+String(Math.round(rows[74][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JAIPL" ){//actual
								result_val = "Hey, JAIPL Profit After Tax for FY13 has been *₹"+String(Math.round(rows[75][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JSPML" ){//actual
								result_val = "Hey, JSPML Profit After Tax for FY13 has been *₹"+String(Math.round(rows[76][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "SHADEED"){//variation
								result_val = "Hey, JSIS  Profit After Tax for FY13 has been *₹"+String(Math.round(rows[79][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT13" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY13 has been *₹"+String(Math.round(rows[78][2]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JSPL" ){//actual
								result_val = "Hey, JSPL Profit After Tax for FY14 has been *₹"+String(Math.round(rows[69][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JPL"){//variation
								result_val = "Hey, JPL  Profit After Tax for FY14 has been *₹"+String(Math.round(rows[70][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "WCL"){//variation
								result_val = "Hey, WCL Profit After Tax for FY14 has been *₹"+String(Math.round(rows[71][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JSPAL"){//variation
								result_val = "Hey, JSPAL Profit After Tax for FY14 has been *₹"+String(Math.round(rows[72][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "Mozambique"){//variation
								result_val = "Hey, Mozambique  Profit After Tax for FY14 has been *₹"+String(Math.round(rows[73][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JMSA"){//variation
								result_val = "Hey, JMSA Profit After Tax for FY14 has been *₹"+String(Math.round(rows[74][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JAIPL"){//variation
								result_val = "Hey, JAIPL  Profit After Tax for FY14 has been *₹"+String(Math.round(rows[75][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JSPML"){//variation
								result_val = "Hey, JSPML  Profit After Tax for FY14 has been *₹"+String(Math.round(rows[76][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "SHADEED" ){//actual
								result_val = "Hey, JSIS Profit After Tax for FY14 has been *₹"+String(Math.round(rows[79][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT14" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY14 has been *₹"+String(Math.round(rows[78][3]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JSPL"){//variation
								result_val = "Hey, JSPL  Profit After Tax for FY15 has been *₹"+String(Math.round(rows[69][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JPL" ){//actual
								result_val = "Hey, JPL Profit After Tax for FY15 has been *₹"+String(Math.round(rows[70][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "WCL" ){//actual
								result_val = "Hey, WCL Profit After Tax for FY15 has been *₹"+String(Math.round(rows[71][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JSPAL" ){//actual
								result_val = "Hey, JSPAL Profit After Tax for FY15 has been *₹"+String(Math.round(rows[72][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "Mozambique" ){//actual
								result_val = "Hey, Mozambique Profit After Tax for FY15 has been *₹"+String(Math.round(rows[73][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JMSA" ){//actual
								result_val = "Hey, JMSA Profit After Tax for FY15 has been *₹"+String(Math.round(rows[74][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JAIPL" ){//actual
								result_val = "Hey, JAIPL Profit After Tax for FY15 has been *₹"+String(Math.round(rows[75][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JSPML" ){//actual
								result_val = "Hey, JSPML Profit After Tax for FY15 has been *₹"+String(Math.round(rows[76][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "SHADEED"){//variation
								result_val = "Hey, JSIS  Profit After Tax for FY15 has been *₹"+String(Math.round(rows[79][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT15" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY15 has been *₹"+String(Math.round(rows[78][4]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JSPL" ){//actual
								result_val = "Hey, JSPL Profit After Tax for FY16 has been *₹"+String(Math.round(rows[69][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JPL"){//variation
								result_val = "Hey, JPL  Profit After Tax for FY16 has been *₹"+String(Math.round(rows[70][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "WCL"){//variation
								result_val = "Hey, WCL  Profit After Tax for FY16 has been *₹"+String(Math.round(rows[71][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JSPAL"){//variation
								result_val = "Hey, JSPAL  Profit After Tax for FY16 has been *₹"+String(Math.round(rows[72][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "Mozambique"){//variation
								result_val = "Hey, Mozambique Profit After Tax for FY16 has been *₹"+String(Math.round(rows[73][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JMSA"){//variation
								result_val = "Hey, JMSA Profit After Tax for FY16 has been *₹"+String(Math.round(rows[74][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JAIPL"){//variation
								result_val = "Hey, JAIPL Profit After Tax for FY16 has been *₹"+String(Math.round(rows[75][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JSPML"){//variation
								result_val = "Hey, JSPML Profit After Tax for FY16 has been *₹"+String(Math.round(rows[76][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "SHADEED" ){//actual
								result_val = "Hey, JSIS Profit After Tax for FY16 has been *₹"+String(Math.round(rows[79][5]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT16" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY16 has been *₹"+String(Math.round(rows[78][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JSPL"){//variation
								result_val = "Hey, JSPL  Profit After Tax for FY17 has been *₹"+String(Math.round(rows[69][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JPL" ){//actual
								result_val = "Hey, JPL Profit After Tax for FY17 has been *₹"+String(Math.round(rows[70][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "WCL" ){//actual
								result_val = "Hey, WCL Profit After Tax for FY17 has been *₹"+String(Math.round(rows[71][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JSPAL" ){//actual
								result_val = "Hey, JSPAL Profit After Tax for FY17 has been *₹"+String(Math.round(rows[72][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "Mozambique" ){//actual
								result_val = "Hey, Mozambique Profit After Tax for FY17 has been *₹"+String(Math.round(rows[73][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JMSA" ){//actual
								result_val = "Hey, JMSA Profit After Tax for FY17 has been *₹"+String(Math.round(rows[74][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JAIPL" ){//actual
								result_val = "Hey, JAIL Profit After Tax for FY17 has been *₹"+String(Math.round(rows[75][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JSPML" ){//actual
								result_val = "Hey, JSPML Profit After Tax for FY17 has been *₹"+String(Math.round(rows[76][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "SHADEED"){//variation
								result_val = "Hey, JSIS  Profit After Tax for FY17 has been *₹"+String(Math.round(rows[79][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT17" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY17 has been *₹"+String(Math.round(rows[78][6]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JSPL" ){//actual
								result_val = "Hey, JSPL Profit After Tax for FY18 has been *₹"+String(Math.round(rows[69][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JPL"){//variation
								result_val = "Hey, JPL  Profit After Tax for FY18 has been *₹"+String(Math.round(rows[70][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "WCL"){//variation
								result_val = "Hey, WCL  Profit After Tax for FY18 has been *₹"+String(Math.round(rows[71][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JSPAL"){//variation
								result_val = "Hey, JSAPL Profit After Tax for FY18 has been *₹"+String(Math.round(rows[72][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "Mozambique"){//variation
								result_val = "Hey, Mozambique  Profit After Tax for FY18 has been *₹"+String(Math.round(rows[73][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JMSA"){//variation
								result_val = "Hey, JMSA Profit After Tax for FY18 has been *₹"+String(Math.round(rows[74][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JAIPL"){//variation
								result_val = "Hey, JAIPL Profit After Tax for FY18 has been *₹"+String(Math.round(rows[75][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JSPML"){//variation
								result_val = "Hey, JSPML Profit After Tax for FY18 has been *₹"+String(Math.round(rows[76][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "SHADEED" ){//actual
								result_val = "Hey, JSIS Profit After Tax for FY18 has been *₹"+String(Math.round(rows[79][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT18" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY18 has been *₹"+String(Math.round(rows[78][7]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JSPL"){//variation
								result_val = "Hey, JSPL  Profit After Tax for FY19 has been *₹"+String(Math.round(rows[69][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JPL" ){//actual
								result_val = "Hey, JPL Profit After Tax for FY19 has been *₹"+String(Math.round(rows[70][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "WCL" ){//actual
								result_val = "Hey, WCL Profit After Tax for FY19 has been *₹"+String(Math.round(rows[71][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JSPAL" ){//actual
								result_val = "Hey, JSPAL Profit After Tax for FY19 has been *₹"+String(Math.round(rows[72][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "Mozambique" ){//actual
								result_val = "Hey, Mozambique Profit After Tax for FY19 has been *₹"+String(Math.round(rows[73][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JMSA" ){//actual
								result_val = "Hey, JMSA Profit After Tax for FY19 has been *₹"+String(Math.round(rows[74][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JAIPL" ){//actual
								result_val = "Hey, JAIPL Profit After Tax for FY19 has been *₹"+String(Math.round(rows[75][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JSPML" ){//actual
								result_val = "Hey, JSPML Profit After Tax for FY19 has been *₹"+String(Math.round(rows[76][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "SHADEED"){//variation
								result_val = "Hey, JSIS  Profit After Tax for FY19 has been *₹"+String(Math.round(rows[79][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT19" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY19 has been *₹"+String(Math.round(rows[78][8]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JSPL" ){//actual
								result_val = "Hey, JSPL Profit After Tax for FY20 has been *₹"+String(Math.round(rows[69][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JPL"){//variation
								result_val = "Hey, JPL  Profit After Tax for FY20 has been *₹"+String(Math.round(rows[70][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "WCL"){//variation
								result_val = "Hey, WCL Profit After Tax for FY20 has been *₹"+String(Math.round(rows[71][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JSPAL"){//variation
								result_val = "Hey, JSPAL Profit After Tax for FY20 has been *₹"+String(Math.round(rows[72][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "Mozambique"){//variation
								result_val = "Hey, Mozambique Profit After Tax for FY20 has been *₹"+String(Math.round(rows[73][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JMSA"){//variation
								result_val = "Hey, JMSA Profit After Tax for FY20 has been *₹"+String(Math.round(rows[74][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JAIPL"){//variation
								result_val = "Hey, JAIPL Profit After Tax for FY20 has been *₹"+String(Math.round(rows[75][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JSPML"){//variation
								result_val = "Hey, JSPML Profit After Tax for FY20 has been *₹"+String(Math.round(rows[76][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "SHADEED" ){//actual
								result_val = "Hey, JSIS Profit After Tax for FY20 has been *₹"+String(Math.round(rows[79][9]))+"Cr*";
							}
							else if(pre_revenue_entity == "PAT20" && pre_location_entity == "JCBS" ){//actual
								result_val = "Hey, Jindal Consol Before Shadeed Profit After Tax for FY20 has been *₹"+String(Math.round(rows[78][9]))+"Cr*";
							}
							else{
								result_val = "Query Result not found";
							}
					}
			}
			agent.add(result_val);
			//return agent.add("End");
			console.log("End");
			//agent.add(response_text);
		}).catch(error =>{
			console.log("Something is wrong");
			console.log(error);
			//agent.add(bot_response);
		});
		}


	function past_performance_trend(agent){
		const {
		  dialogflow,
		  //BasicCard,
		  BrowseCarousel,
		  BrowseCarouselItem,
		  //Button,
		  Carousel,
		  Image,
		  LinkOutSuggestion,
		  List,
		  MediaObject,
		  Suggestions,
		  SimpleResponse,
		 } = require('actions-on-google');

		const {WebhookClient} = require('dialogflow-fulfillment');
		const {Card,Suggestion} = require('dialogflow-fulfillment');
		const {BasicCard, Button} = require('actions-on-google');

		console.log("In the SAP function");
		var past_performance_trend_entity = req.body.queryResult.parameters.past_performance_trend_entity;
		var pre_location_entity = req.body.queryResult.parameters.pre_location_entity;
		console.log("Pre location entity :",pre_location_entity)
		var url = "https://i.ibb.co/zsVXG3g/image.png";
		var string = pre_location_entity.toString();
		if(past_performance_trend_entity == "PREXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JSPL'){
			url = "https://i.ibb.co/j4jd3nH/pre-jsplv3.png";
		}
		else if(past_performance_trend_entity == "PREXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JPL'){
			url = "https://i.ibb.co/6WFy7wM/pre-jplv3.png"
			console.log("JPL working");
		}
		else if(past_performance_trend_entity == "PREXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'SHADEED'){
			url = "https://i.ibb.co/Vp1kB3W/pre-shadeedv3.png"
		}
		else if(past_performance_trend_entity == "PEBXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JSPL'){
			url = "https://i.ibb.co/89xbsDZ/ebitda-jsplv3.png"
		}
		else if(past_performance_trend_entity == "PEBXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JPL'){
			url = "https://i.ibb.co/Fm92nvK/ebitda-jplv3.png"
		}
		else if(past_performance_trend_entity == "PEBXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'SHADEED'){
			url = "https://i.ibb.co/C6zkhbD/ebitda-shadeedv2.jpg"
		}
		else if(past_performance_trend_entity == "PFCXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JSPL'){
			url = "https://i.ibb.co/GpVFGcC/fct-jsplv3.png"
		}
		else if(past_performance_trend_entity == "PFCXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JPL'){
			url = "https://i.ibb.co/1KDC8RK/fct-jplv3.png"
		}
		else if(past_performance_trend_entity == "PFCXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'SHADEED'){
			url = "https://i.ibb.co/0F2byXh/fct-shadeedv3.png"
		}
		else if(past_performance_trend_entity == "PBTXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JSPL'){
			url = "https://i.ibb.co/zfgh3gW/pbt-jsplv3.png"
		}
		else if(past_performance_trend_entity == "PBTXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JPL'){
			url = "https://i.ibb.co/VqccspH/pbt-jplv3.png"
		}
		else if(past_performance_trend_entity == "PBTXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'SHADEED'){
			url = "https://i.ibb.co/6PQk5sK/pbt-shadeedv3.png"
		}
		else if(past_performance_trend_entity == "PATXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JSPL'){
			url = "https://i.ibb.co/MfyxxPj/pat-jsplv3.png"
		}
		else if(past_performance_trend_entity == "PATXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'JPL'){
			url = "https://i.ibb.co/LpkZzYw/pat-jplv3.png"
		}
		else if(past_performance_trend_entity == "PATXX" && (string.replace('[','').replace(']','').replace(' ','')) == 'SHADEED'){
			url = "https://i.ibb.co/sy3t0Wk/pat-shadeedv3.png"

		}

		agent.add(new Card({
			title : "Past Performance",
			imageUrl : url,//https://drive.google.com/file/d/1j0gT_9r-csGmGeYxMhwOT_oF7zF8c8PH/view?usp=sharing
			//text : 'Click Link below ',
			//buttonText : 'Link',
			//buttonUrl : 'https://ithelpdesk.jspl.com:9443/ItSupport/jspl/common/ticket-add.html'
		}));
		//agent.add("I am learning about this and would be able to take related queries soon. Till then you may please raise a ticket on the above link")

	}


	var intentMap = new Map();
	intentMap.set('webhookDemo',demo)
	intentMap.set('weather',weather)
	intentMap.set('forecast',forecast)
	intentMap.set('stocks',stocks)
	intentMap.set('end',end)
	intentMap.set('Demo',demo)
	intentMap.set('analytics',analytics)
	intentMap.set('start',start)
	intentMap.set('sap',sap)
	intentMap.set('past_performance_trend',past_performance_trend)
	intentMap.set('portals',portals)
	intentMap.set('infra',infra)
/////////////////////////////////////////////////////////////////////////////////////////////
	intentMap.set('0R1142 Rail EBITDA Details responses',rail_ebitda_data_fetch)
	intentMap.set('0R121 Rail Contribution Responses',rail_contribution_data_fetch)
	intentMap.set('0R1162 Rail Cash Score Details Responses',rail_cash_score_data_fetch)
	intentMap.set("0R1152 Rail Contribution Response",rail_bucontribution_data_fetch)
	intentMap.set('0R1112 Rail Finished Product Responses',rail_finished_production_data_fetch)
	intentMap.set('0R1132 Rail Collection Responses',rail_collection_data_fetch)
	intentMap.set('0R1122 Rail Sales Responses',rail_sales_data_fetch)
	intentMap.set('0R1182 Rail pure var cost responses',rail_pure_variable_cost_data_fetch)
	intentMap.set('0R1172 Rail pure conv cost Responses',rail_pure_conversion_cost_data_fetch)
	intentMap.set('0R1161 Rail Cash Score Summary',rail_cash_score_summary)
	intentMap.set('0R1181 Rail pure var cost Summary',rail_pure_variable_cost_summary)
	intentMap.set('0R1121 Rail Sales Summary',rail_sales_summary)
	intentMap.set('0R1111 Rail Finished Production Summary',rail_finished_production_summary)
	intentMap.set('0R1171 Rail Pure Conversion Cost Summary',rail_pure_conversion_cost_summary)
	intentMap.set('0R1151 Rail Contribution Summary',rail_bucontribution_summary)
	intentMap.set('0R1131 Rail Collection Summary',rail_collection_summary)
	intentMap.set('0R1141 Rail EBITDA Summary',rail_ebitda_summary)
	//////////////////////////////////////////LINKING_STRUCTURES_LINKING///////////////////////////////////////////////////
	intentMap.set('0ST1142 Structures EBITDA Details responses',structures_ebitda_data_fetch)
	intentMap.set('0ST121 Structures Contribution Responses',structures_contribution_data_fetch)
	intentMap.set('0ST1162 Structures Cash Score Details Responses',structures_cash_score_data_fetch)
	intentMap.set("0ST1152 Structures Contribution Response",structures_bucontribution_data_fetch)
	intentMap.set('0ST1112 Structures Finished Product Responses',structures_finished_production_data_fetch)
	intentMap.set('0ST1132 Structures Collection Responses',structures_collection_data_fetch)
	intentMap.set('0ST1122 Structures Sales Responses',structures_sales_data_fetch)
	intentMap.set('0ST1182 Structures pure var cost responses',structures_pure_variable_cost_data_fetch)
	intentMap.set('0ST1172 Structures pure conv cost Responses',structures_pure_conversion_cost_data_fetch)
	intentMap.set('0ST1161 Structures Cash Score Summary',structures_cash_score_summary)
	intentMap.set('0ST1181 Structures pure var cost Summary',structures_pure_variable_cost_summary)
	intentMap.set('0ST1121 Structures Sales Summary',structures_sales_summary)
	intentMap.set('0ST1111 Structures Finished Production Summary',structures_finished_production_summary)
	intentMap.set('0ST1171 Structures Pure Conversion Cost Summary',structures_pure_conversion_cost_summary)
	intentMap.set('0ST1151 Structures Contribution Summary',structures_bucontribution_summary)
	intentMap.set('0ST1131 Structures Collection Summary',structures_collection_summary)
	intentMap.set('0ST1141 Structures EBITDA Summary',structures_ebitda_summary)
	//////////////////////////////////////////LINKING_SEMIS_LINKING///////////////////////////////////////////////////
	intentMap.set('0SE1142 Semis EBITDA Details responses',semis_ebitda_data_fetch)
	intentMap.set('0SE121 Semis Contribution Responses',semis_contribution_data_fetch)
	intentMap.set('0SE1162 Semis Cash Score Details Responses',semis_cash_score_data_fetch)
	intentMap.set("0SE1152 Semis Contribution Response",semis_bucontribution_data_fetch)
	intentMap.set('0SE1112 Semis Finished Product Responses',semis_finished_production_data_fetch)
	intentMap.set('0SE1132 Semis Collection Responses',semis_collection_data_fetch)
	intentMap.set('0SE1122 Semis Sales Responses',semis_sales_data_fetch)
	intentMap.set('0SE1182 Semis pure var cost responses',semis_pure_variable_cost_data_fetch)
	intentMap.set('0SE1172 Semis pure conv cost Responses',semis_pure_conversion_cost_data_fetch)
	intentMap.set('0SE1161 Semis Cash Score Summary',semis_cash_score_summary)
	intentMap.set('0SE1181 Semis pure var cost Summary',semis_pure_variable_cost_summary)
	intentMap.set('0SE1121 Semis Sales Summary',semis_sales_summary)
	intentMap.set('0SE1111 Semis Finished Production Summary',semis_finished_production_summary)
	intentMap.set('0SE1171 Semis Pure Conversion Cost Summary',semis_pure_conversion_cost_summary)
	intentMap.set('0SE1151 Semis Contribution Summary',semis_bucontribution_summary)
	intentMap.set('0SE1131 Semis Collection Summary',semis_collection_summary)
	intentMap.set('0SE1141 Semis EBITDA Summary',semis_ebitda_summary)
	////////////////////////////////////////////LINKING_BSM_LINKING/////////////////////////////////////////////////////////
	intentMap.set('0B1142 BSM EBITDA Details responses',bsm_ebitda_data_fetch)
	intentMap.set('0B121 BSM Contribution Responses',bsm_contribution_data_fetch)
	intentMap.set('0B1162 BSM Cash Score Details Responses',bsm_cash_score_data_fetch)
	intentMap.set("0B1152 BSM Contribution Response",bsm_bucontribution_data_fetch)
	intentMap.set('0B1112 BSM Finished Product Responses',bsm_finished_production_data_fetch)
	intentMap.set('0B1132 BSM Collection Responses',bsm_collection_data_fetch)
	intentMap.set('0B1122 BSM Sales Responses',bsm_sales_data_fetch)
	//intentMap.set('ebitda_data_fetch',ebitda_data_fetch)
	intentMap.set('0B1182 BSM pure var cost responses',bsm_pure_variable_cost_data_fetch)
	intentMap.set('0B1172 BSM pure conv cost Responses',bsm_pure_conversion_cost_data_fetch)
	intentMap.set('0B1161 BSM Cash Score Summary',bsm_cash_score_summary)
	intentMap.set('0B1181 BSM pure var cost Summary',bsm_pure_variable_cost_summary)
	intentMap.set('0B1121 BSM Sales Summary',bsm_sales_summary)
	intentMap.set('0B1111 BSM Finished Production Summary',bsm_finished_production_summary)
	intentMap.set('0B1171 BSM Pure Conversion Cost Summary',bsm_pure_conversion_cost_summary)
	intentMap.set('0B1151 BSM Contribution Summary',bsm_bucontribution_summary)
	intentMap.set('0B1131 BSM Collection Summary',bsm_collection_summary)
	intentMap.set('0B1141 BSM EBITDA Summary',bsm_ebitda_summary)
	////////////////////////////////////////////LINKING_TMT_LINKING/////////////////////////////////////////////////////////
	intentMap.set('0T1142 TMT EBITDA Details responses',tmt_ebitda_data_fetch)
	intentMap.set('0T121 TMT Contribution Responses',tmt_contribution_data_fetch)
	intentMap.set('0T1162 TMT Cash Score Details Responses',tmt_cash_score_data_fetch)
	intentMap.set("0T1152 TMT Contribution Response",tmt_bucontribution_data_fetch)
	intentMap.set('0T1112 TMT Finished Product Responses',tmt_finished_production_data_fetch)
	intentMap.set('0T1132 TMT Collection Responses',tmt_collection_data_fetch)
	intentMap.set('0T1122 TMT Sales Responses',tmt_sales_data_fetch)
	intentMap.set('0T1182 TMT pure var cost responses',tmt_pure_variable_cost_data_fetch)
	intentMap.set('0T1172 TMT pure conv cost Responses',tmt_pure_conversion_cost_data_fetch)
	intentMap.set('0T1161 TMT Cash Score Summary',tmt_cash_score_summary)
	intentMap.set('0T1181 TMT pure var cost Summary',tmt_pure_variable_cost_summary)
	intentMap.set('0T1121 TMT Sales Summary',tmt_sales_summary)
	intentMap.set('0T1111 TMT Finished Production Summary',tmt_finished_production_summary)
	intentMap.set('0T1171 TMT Pure Conversion Cost Summary',tmt_pure_conversion_cost_summary)
	intentMap.set('0T1151 TMT Contribution Summary',tmt_bucontribution_summary)
	intentMap.set('0T1131 TMT Collection Summary',tmt_collection_summary)
	intentMap.set('0T1141 TMT EBITDA Summary',tmt_ebitda_summary)
	////////////////////////////////////////////LINKING_WRM_LINKING/////////////////////////////////////////////////////////
	intentMap.set('0W1142 WRM EBITDA Details responses',wrm_ebitda_data_fetch)
	intentMap.set('0W121 WRM Contribution Responses',wrm_contribution_data_fetch)
	intentMap.set('0W1162 WRM Cash Score Details Responses',wrm_cash_score_data_fetch)
	intentMap.set("0W1152 WRM Contribution Response",wrm_bucontribution_data_fetch)
	intentMap.set('0W1112 WRM Finished Product Responses',wrm_finished_production_data_fetch)
	intentMap.set('0W1132 WRM Collection Responses',wrm_collection_data_fetch)
	intentMap.set('0W1122 WRM Sales Responses',wrm_sales_data_fetch)
	intentMap.set('0W1182 WRM pure var cost responses',wrm_pure_variable_cost_data_fetch)
	intentMap.set('0W1172 WRM pure conv cost Responses',wrm_pure_conversion_cost_data_fetch)
	intentMap.set('0W1161 WRM Cash Score Summary',wrm_cash_score_summary)
	intentMap.set('0W1181 WRM pure var cost Summary',wrm_pure_variable_cost_summary)
	intentMap.set('0W1121 WRM Sales Summary',wrm_sales_summary)
	intentMap.set('0W1111 WRM Finished Production Summary',wrm_finished_production_summary)
	intentMap.set('0W1171 WRM Pure Conversion Cost Summary',wrm_pure_conversion_cost_summary)
	intentMap.set('0W1151 WRM Contribution Summary',wrm_bucontribution_summary)
	intentMap.set('0W1131 WRM Collection Summary',wrm_collection_summary)
	intentMap.set('0W1141 WRM EBITDA Summary',wrm_ebitda_summary)
	//////////////////////////////////////////////////LINKING_PLATE_ANGUL//////////////////////////////////////////////////////////////////
	intentMap.set('0PA1142 Plate Angul EBITDA Details responses',plate_angul_ebitda_data_fetch)
	intentMap.set('0PA121 Plate Angul Contribution Responses',plate_angul_contribution_data_fetch)
	intentMap.set('0PA1162 Plate Angul Cash Score Details Responses',plate_angul_cash_score_data_fetch)
	intentMap.set("0PA1152 Plate Angul Contribution Response",plate_angul_bucontribution_data_fetch)
	intentMap.set('0PA1112 Plate Angul Finished Product Responses',plate_angul_finished_production_data_fetch)
	intentMap.set('0PA1132 Plate Angul Collection Responses',plate_angul_collection_data_fetch)
	intentMap.set('0PA1122 Plate Angul Sales Responses',plate_angul_sales_data_fetch)
	intentMap.set('0PA1182 Plate Angul pure var cost responses',plate_angul_pure_variable_cost_data_fetch)
	intentMap.set('0PA1172 Plate Angul pure conv cost Responses',plate_angul_pure_conversion_cost_data_fetch)
	intentMap.set('0PA1161 Plate Angul Cash Score Summary',plate_angul_cash_score_summary)
	intentMap.set('0PA1181 Plate Angul pure var cost Summary',plate_angul_pure_variable_cost_summary)
	intentMap.set('0PA1121 Plate Angul Sales Summary',plate_angul_sales_summary)
	intentMap.set('0PA1111 Plate Angul Finished Production Summary',plate_angul_finished_production_summary)
	intentMap.set('0PA1171 Plate Angul Pure Conversion Cost Summary',plate_angul_pure_conversion_cost_summary)
	intentMap.set('0PA1151 Plate Angul Contribution Summary',plate_angul_bucontribution_summary)
	intentMap.set('0PA1131 Plate Angul Collection Summary',plate_angul_collection_summary)
	intentMap.set('0PA1141 Plate Angul EBITDA Summary',plate_angul_ebitda_summary)
	//////////////////////////////////////////////////////////PLATE_RAIGARH///////////////////////////////////////////////////////////////////
		intentMap.set('0PR1142 Plate Raigarh EBITDA Details responses',plate_raigarh_ebitda_data_fetch)
		intentMap.set('0PR121 Plate Raigarh Contribution Responses',plate_raigarh_contribution_data_fetch)
		intentMap.set('0PR1162 Plate Raigarh Cash Score Details Responses',plate_raigarh_cash_score_data_fetch)
		intentMap.set("0PR1152 Plate Raigarh Contribution Response",plate_raigarh_bucontribution_data_fetch)
		intentMap.set('0PR1112 Plate Raigarh Finished Product Responses',plate_raigarh_finished_production_data_fetch)
		intentMap.set('0PR1132 Plate Raigarh Collection Responses',plate_raigarh_collection_data_fetch)
		intentMap.set('0PR1122 Plate Raigarh Sales Responses',plate_raigarh_sales_data_fetch)
		intentMap.set('0PR1182 Plate Raigarh pure var cost responses',plate_raigarh_pure_variable_cost_data_fetch)
		intentMap.set('0PR1172 Plate Raigarh pure conv cost Responses',plate_raigarh_pure_conversion_cost_data_fetch)
		intentMap.set('0PR1161 Plate Raigarh Cash Score Summary',plate_raigarh_cash_score_summary)
		intentMap.set('0PR1181 Plate Raigarh pure var cost Summary',plate_raigarh_pure_variable_cost_summary)
		intentMap.set('0PR1121 Plate Raigarh Sales Summary',plate_raigarh_sales_summary)
		intentMap.set('0PR1111 Plate Raigarh Finished Production Summary',plate_raigarh_finished_production_summary)
		intentMap.set('0PR1171 Plate Raigarh Pure Conversion Cost Summary',plate_raigarh_pure_conversion_cost_summary)
		intentMap.set('0PR1151 Plate Raigarh Contribution Summary',plate_raigarh_bucontribution_summary)
		intentMap.set('0PR1131 Plate Raigarh Collection Summary',plate_raigarh_collection_summary)
		intentMap.set('0PR1141 Plate Raigarh EBITDA Summary',plate_raigarh_ebitda_summary)
		//////////////////////////////////////////////////////////PLATE_RAIGARH///////////////////////////////////////////////////////////////////
			intentMap.set('0SS1142 SSD EBITDA Details responses',ssd_ebitda_data_fetch)
			intentMap.set('0SS121 SSD Contribution Responses',ssd_contribution_data_fetch)
			intentMap.set('0SS1162 SSD Cash Score Details Responses',ssd_cash_score_data_fetch)
			intentMap.set("0SS1152 SSD Contribution Response",ssd_bucontribution_data_fetch)
			intentMap.set('0SS1112 SSD Finished Soduct Responses',ssd_finished_production_data_fetch)
			intentMap.set('0SS1132 SSD Collection Responses',ssd_collection_data_fetch)
			intentMap.set('0SS1122 SSD Sales Responses',ssd_sales_data_fetch)
			intentMap.set('0SS1182 SSD pure var cost responses',ssd_pure_variable_cost_data_fetch)
			intentMap.set('0SS1172 SSD pure conv cost Responses',ssd_pure_conversion_cost_data_fetch)
			intentMap.set('0SS1161 SSD Cash Score Summary',ssd_cash_score_summary)
			intentMap.set('0SS1181 SSD pure var cost Summary',ssd_pure_variable_cost_summary)
			intentMap.set('0SS1121 SSD Sales Summary',ssd_sales_summary)
			intentMap.set('0SS1111 SSD Finished Production Summary',ssd_finished_production_summary)
			intentMap.set('0SS1171 SSD Pure Conversion Cost Summary',ssd_pure_conversion_cost_summary)
			intentMap.set('0SS1151 SSD Contribution Summary',ssd_bucontribution_summary)
			intentMap.set('0SS1131 SSD Collection Summary',ssd_collection_summary)
			intentMap.set('0SS1141 SSD EBITDA Summary',ssd_ebitda_summary)
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	intentMap.set('0R51 IT Security Result',demo)
	intentMap.set('0R22 Abroad Locations',weather)
	intentMap.set('PRE REVENUE',pre_revenue)
	intentMap.set('PEB EBITDA',peb_ebitda)
	intentMap.set('PFC Finance Cost',pfc_finance_cost)
	intentMap.set('PBT Profit Before Tax',pbt_profit_before_tax)
	intentMap.set('PAT Profit After Tax',pat_profit_after_tax)
	agent.handleRequest(intentMap);
});
//app.listen(443,()=>console.log("Server is live at port 443"));
app.listen(8083,()=>console.log("Server is live at port 8083"));
