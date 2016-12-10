import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  date: new Date(),
  calendar: null,
  data: [{
    username: 'Sarup',
    requests: [{
      from: '5-12-2016',
      to: '14-12-2016',
      description: 'Skiing holiday'
    }]
  }, {
    username: 'Martin',
    requests: [{
      from: '13-12-2016',
      to: '15-12-2016',
      description: 'Getting hitched'
    }, {
      from: '18-04-2017',
      to: '20-04-2017',
      description: 'Conference'
    }]
  }, {
    username: 'Sarit',
    requests: [{
      from: '25-12-2016',
      to: '28-12-2016',
      description: 'Take Shakira for a walk'
    }]
  }],
  actions: {
    displayThings() {

      // while (day <= endOfWeek) {
      //   days.push(day.format('dd D MMM'));
      //   day = day.clone().add(1, 'd');
      // }
      //
      // this.set('daysOfSelectedWeek', days);
      //
      // console.log(days);

      let startOfPeriod = moment().startOf('week');
      let endOfPeriod = moment().endOf('week');

      let includedDays = {};
      let day = startOfPeriod;

      let currentDateObj = {};

      while (day <= endOfPeriod) {
        currentDateObj.dayOfWeek = day.format('dd');
        includedDays[day.format('DD-MM-YYYY')] = currentDateObj;
        day = day.clone().add(1, 'd');
        currentDateObj = {};
      }


      let soonerDate = endOfPeriod;
      let fromMoment, toMoment;

      this.get('data').forEach((user) => {
        user.requests.forEach((request) => {
          fromMoment = moment(request.from, 'DD-MM-YYYY');
          toMoment = moment(request.to, 'DD-MM-YYYY');
          if (fromMoment.isBetween(startOfPeriod, endOfPeriod)) {
            soonerDate = toMoment.isSameOrBefore(endOfPeriod) ? toMoment : endOfPeriod;
            day = fromMoment;
            while (day <= soonerDate) {
              includedDays[day.format('DD-MM-YYYY')][user.username] = request.description;
              day = day.clone().add(1, 'd');
            }

          } else {
            console.log('request is outside, no bother');
          }
        });
      });


      this.set('calendar', includedDays);
      console.log(includedDays);
    }
  }
});
