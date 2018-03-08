import { h, Component } from 'preact';
import style from './style';
import Event from "../events"
import $ from 'jquery';

export default class EventHandler extends Component {

  /* Make initial call for event data */
  constructor(props) {
    super(props)
    this.fetchEvents();
  }

  /* Call for event data from json file */
  fetchEvents = () => {
    var url = "./lib/scraper/EVENTDATA.json";
    $.ajax({
      url: url,
      dataType: "json",
      success: this.parseEvents,
      error: function(req, err){console.log('EventsHandler: EVENTDATA JSON file call failed');}
    })
  }

  render() {
    var i;
    /* Initialize lists which will be utilized in constructing Event components */
    var eveDates = [this.state.eventDate0,this.state.eventDate1,this.state.eventDate2,this.state.eventDate3,this.state.eventDate4,this.state.eventDate5,];
    var eveNames = [this.state.eventName0,this.state.eventName1,this.state.eventName2,this.state.eventName3,this.state.eventName4,this.state.eventName5,];
    var eveDescs = [this.state.eventDesc0,this.state.eventDesc1,this.state.eventDesc2,this.state.eventDesc3,this.state.eventDesc4,this.state.eventDesc5,];
    var count = parseInt(this.props.count);
    var events = [];
    /* Create Event components */
    for(i=0; i<count; i++) {
        var str = "" + eveDescs[i];
        var k = str.indexOf(".");
        var strSub = str.substring(0, k+1);
        events[i] = <div class="swiper-slide">
                      <Event eventDate={eveDates[i]} eventName={eveNames[i]} eventDesc={strSub}/>
                    </div>;
    }

    /* Render Event components in swipable format */
    return (
      <div class ={"allEvents " +style.eventHandler}>
        <div class=".swiper-container swiper-init">
          <div class={"swiper-wrapper " + style.event}>
            <div class="swiper-slide">
              {events[0]}
            </div>
            <div class="swiper-slide">
              {events[1]}
            </div>
            <div class="swiper-slide">
              {events[2]}
            </div>
            <div class="swiper-slide">
              {events[3]}
            </div>
            <div class="swiper-slide">
              {events[4]}
            </div>
            <div class="swiper-slide">
              {events[5]}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* Parse response from json file, setting states which will be necessary to build Event components */
  parseEvents = (parsed_json) => {
    console.log('EventsHandler: EVENTDATA JSON file call sucessful');
    this.setState({
      eventDate0: parsed_json['edate'][0],
      eventName0: parsed_json['ename'][0],
      eventDesc0: parsed_json['edesc'][0],
      eventDate1: parsed_json['edate'][1],
      eventName1: parsed_json['ename'][1],
      eventDesc1: parsed_json['edesc'][1],
      eventDate2: parsed_json['edate'][2],
      eventName2: parsed_json['ename'][2],
      eventDesc2: parsed_json['edesc'][2],
      eventDate3: parsed_json['edate'][3],
      eventName3: parsed_json['ename'][3],
      eventDesc3: parsed_json['edesc'][3],
      eventDate4: parsed_json['edate'][4],
      eventName4: parsed_json['ename'][4],
      eventDesc4: parsed_json['edesc'][4],
      eventDate5: parsed_json['edate'][5],
      eventName5: parsed_json['ename'][5],
      eventDesc5: parsed_json['edesc'][5],
    });
  }
}
