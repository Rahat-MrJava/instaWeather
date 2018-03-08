/*
AUTHOR: Benjamin Ofoedu

WHAT THIS IS:
A basic vesion of the web scraper.
Only generates events in the future. But does not support overflow (i.e., two events in december, one event in janurary)
*/
      var request = require("request");
      var cheerio = require("cheerio");
      var fs = require("fs-extra");
      //Necessary module imports.
      var url = "http://www.seasky.org/astronomy/astronomy-calendar-current.html";
    request(url, function(error, response, body){ //Get the URL (which is now "body")
      if(error){ //Error handler
        return false;
      }
      var che = cheerio.load(body); //Pass url to cheerio

      var events = []; //Array which we'll parse into JSON.
      var edates = [];
      var enames = [];
      var edescs = [];
      var ename;
      var edate;
      var edesc;
      var i = 0; //Iterator
      var today = new Date() ;
          che('div#right-column-content li').each(function(n, elem){ //For each list element on the page
            if(i > 5) return false;
            edesc = che(this).clone().find('p').children().remove().end().text(); //Add the description.
            edate = che(this).find('span.date-text').text(); //Add the date.
            ename = che(this).find('span.title-text').text(); //Add the name.
            if(laterMonth(today.getMonth(), edate)){
              if(laterDay(today.getDay(), edate)){
                //Psuedocode: Clone this segment of HTML. Find all instances of 'p'. Find and remove any child segments they may have.
                edescs[i] = edesc.substring(4); //Remove dash and preceeding whitespace.
                edates[i] = edate;
                enames[i] = ename.substring(0, ename.length-1);
                i++;
              }
            }
          });
          events = {"ename":enames, "edate":edates, "edesc":edescs};
      fs.outputJson('EVENTDATA.json', events, (err)=>{//Create JSON file.
        error
      });
    });

    function laterMonth(thisMonth, checkDate){
    var checkDateARRAY = checkDate.split(" ");
    var checkMonth = checkDateARRAY[0]; //Get the name of the month from the String.
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (months.indexOf(checkMonth) >= thisMonth) return true; //If the month has not passed.
    else return false;
    }

    function laterDay(thisDay, checkDate){
    var checkDateARRAY = checkDate.split(" ");
    if (checkDateARRAY.length > 2){ //If there are two days listed
      if(thisDay <= parseInt(checkDateARRAY[2])) return true; //If the second day has not passed
      else return false;
    }
    else{
      if(thisDay <= parseInt(checkDateARRAY[1])) return true; //If the day has not passed.
      else return false;
    }
    }
