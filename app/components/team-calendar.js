import moment from 'moment';
import Ember from 'ember';

const { Component, $, run, inject: { service } } = Ember;

export default Component.extend({
  calendarEvents : service(),
  classNames     : ['calendar'],
  viewingPeriod  : null,
  startOfPeriod  : null,
  endOfPeriod    : null,
  unit           : 'week',

  init() {
    this._super();
    this._updateViewingPeriod();
  },
  didRender() {
    if (!this.get('data')) {
      this.get('calendarEvents').all().then((data) => {
        this.set('data', data);
        this._fillCalendar();
      });
    } else {
      this._fillCalendar();
    }
  },

  actions: {
    // month/week, and prev/next
    changePeriod(unit, direction) {
      if (unit) {
        this.set('unit', unit);
        this.set('startOfPeriod', moment().startOf(unit));
        this.set('endOfPeriod',   moment().endOf(unit));
      } else {
        direction = (direction === 'next') ? 1 : -1;
        this.set('startOfPeriod', this.get('startOfPeriod').add(direction, this.get('unit')));
        this.set('endOfPeriod',   this.get('endOfPeriod').add(direction, this.get('unit')));
      }
      this._updateViewingPeriod();
    }
  },

  _updateViewingPeriod() {
    if (!(this.get('startOfPeriod') && this.get('endOfPeriod'))) {
      this.set('startOfPeriod', moment().startOf(this.get('unit')));
      this.set('endOfPeriod',   moment().endOf(this.get('unit')));
    }

    let day = this.get('startOfPeriod');
    let daysInPeriod = [];

    while (day <= this.get('endOfPeriod')) {
      daysInPeriod.push(day.format('DD-MM-YYYY'));
      day = day.clone().add(1, 'd');
    }

    this.set('viewingPeriod', daysInPeriod);
  },
  _fillCalendar() {
    let startOfPeriod = this.get('startOfPeriod');
    let endOfPeriod = this.get('endOfPeriod');
    run.schedule('afterRender', () => {
      this.get('data').forEach((user) => {
        user.requests.forEach((request) => {
          let fromMoment = moment(request.from);
          let toMoment = moment(request.to);
          if (fromMoment.isBetween(startOfPeriod, endOfPeriod)) {
            let soonerDate = toMoment.isSameOrBefore(endOfPeriod) ? toMoment : endOfPeriod;
            let duration = Math.abs(fromMoment.diff(soonerDate, 'days')) + 1;

            let userFromCell = $(`#${user.identifier}-${fromMoment.format('DD-MM-YYYY')}`);
            userFromCell.addClass('onVacation');
            userFromCell.attr('colspan', duration);
            userFromCell.attr('data-toggle', 'tooltip');
            userFromCell.attr('data-placement', 'bottom');
            userFromCell.attr('title', request.description);
            userFromCell.html(request.description);

            let day = fromMoment.add(1, 'd');
            while (day <= soonerDate) {
              let userDayCell = $(`#${user.identifier}-${day.format('DD-MM-YYYY')}`);
              userDayCell.remove();
              userDayCell.addClass('onVacation');
              day = day.clone().add(1, 'd');
            }
            $('[data-toggle="tooltip"]').tooltip();

          } else {
            console.log('request is outside, no bother');
          }
        });
      });
    });
  }
});
