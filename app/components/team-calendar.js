import moment from 'moment';
import Ember from 'ember';

const { Component, $ } = Ember;

export default Component.extend({
  viewingPeriod: null,
  startOfPeriod: null,
  endOfPeriod: null,
  unit: 'week',
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
    this.updateViewingPeriod();
  },
  didRender() {
    this.fillCalendar();
    $('[data-toggle="tooltip"]').tooltip();
  },
  actions: {
    changePeriod(unit, direction) {
      if (unit) {
        this.set('unit', unit);
        this.set('startOfPeriod', moment().startOf(unit));
        this.set('endOfPeriod',   moment().endOf(unit));
      } else {
        direction = (direction === 'next') ? 1 : -1;
        this.set('startOfPeriod', this.get('startOfPeriod').add(direction, this.get('unit')));
        this.set('endOfPeriod',   this.get('endOfPeriod'  ).add(direction, this.get('unit')));
      }
      this.updateViewingPeriod();
    }
  },
  updateViewingPeriod() {
    if (!(this.get('startOfPeriod') && this.get('endOfPeriod'))) {
      this.set('startOfPeriod', moment().startOf(this.get('unit')));
      this.set('endOfPeriod',   moment().endOf(this.get('unit')));
    }

    let day = this.get('startOfPeriod');
    let daysInPeriod = [];

    while (day <= this.get('endOfPeriod')) {
      daysInPeriod.push(day);
      day = day.clone().add(1, 'd');
    }

    this.set('viewingPeriod', daysInPeriod);
  },
  fillCalendar() {
    const startOfPeriod = this.get('startOfPeriod');
    const endOfPeriod = this.get('endOfPeriod');
    this.get('data').forEach(user => {
      user.requests.forEach(request => {
        const fromMoment = moment(request.from, 'DD-MM-YYYY');
        const toMoment = moment(request.to, 'DD-MM-YYYY');

        if (fromMoment.isBetween(startOfPeriod, endOfPeriod)) {
          const soonerDate = toMoment.isSameOrBefore(endOfPeriod) ? toMoment : endOfPeriod;
          const duration = Math.abs(fromMoment.diff(soonerDate, 'days')) + 1;

          const userFromCell = $(`#${user.username}-${fromMoment.format('DD-MM-YYYY')}`);
          userFromCell.addClass('onVacation');
          userFromCell.attr('colspan', duration);
          userFromCell.attr('data-toggle', 'tooltip');
          userFromCell.attr('data-placement', 'bottom');
          userFromCell.attr('title', request.description);
          userFromCell.html(request.description);

          let day = fromMoment.add(1, 'd');
          while (day <= soonerDate) {
            let userDayCell = $(`#${user.username}-${day.format('DD-MM-YYYY')}`);
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
});
