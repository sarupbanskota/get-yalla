import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  date: new Date(),
  calendar: null,
  viewingPeriod: null,
  users: ['Sarup', 'Martin', 'Sarit'],
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
      from: '7-12-2016',
      to: '8-12-2016',
      description: 'Getting hitched'
    }, {
      from: '9-12-2016',
      to: '12-12-2016',
      description: 'Conference'
    }]
  }, {
    username: 'Sarit',
    requests: [{
      from: '6-12-2016',
      to: '9-12-2016',
      description: 'Take Shakira for a walk'
    }]
  }],
  init() {
    this._super();
    let startOfPeriod = moment().startOf('week');
    let endOfPeriod = moment().endOf('week');
    let day = startOfPeriod;
    let daysInPeriod = [];

    while (day <= endOfPeriod) {
      daysInPeriod.push(day.format('DD-MM-YYYY'));
      day = day.clone().add(1, 'd');
    }

    this.set('viewingPeriod', daysInPeriod);
  },
  actions: {
    makeCalendar() {
      let startOfPeriod = moment().startOf('week');
      let endOfPeriod = moment().endOf('week');
      this.get('data').forEach(user => {
        user.requests.forEach(request => {
          let fromMoment = moment(request.from, 'DD-MM-YYYY');
          let toMoment = moment(request.to, 'DD-MM-YYYY');

          if (fromMoment.isBetween(startOfPeriod, endOfPeriod)) {
            let soonerDate = toMoment.isSameOrBefore(endOfPeriod) ? toMoment : endOfPeriod;
            let duration = Math.abs(fromMoment.diff(soonerDate, 'days')) + 1;

            console.log(`${request.description} : ${duration}`);

            let userFromCell = Ember.$(`#${user.username}-${fromMoment.format('DD-MM-YYYY')}`);
            userFromCell.attr('colspan', duration);
            userFromCell.addClass('onVacation');
            userFromCell.html(request.description);

            let day = fromMoment.add(1, 'd');
            while (day <= soonerDate) {
              let userDayCell = Ember.$(`#${user.username}-${day.format('DD-MM-YYYY')}`);
              userDayCell.remove();
              userDayCell.addClass('onVacation');
              day = day.clone().add(1, 'd');
            }

          } else {
            console.log('request is outside, no bother');
          }
        });
      });
    }
  }
});
