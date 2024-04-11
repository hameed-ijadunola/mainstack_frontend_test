import React, { Component, Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styles';
import calendar, {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
} from '../../helpers/calendar';
import { ReactComponent as ArrowLeft } from '../../assets/svg/icon button1.svg';
import { ReactComponent as ArrowRight } from '../../assets/svg/icon button.svg';
import moment from 'moment';

export default function Calendar({
  date,
  onDateChanged,
  isNextMonthValid,
  disableDatesAfter,
  isPrevMonthValid,
  disableDatesBefore,
}) {
  const [dateState, setDateState] = useState(() => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    return {
      current: isDateObject ? date : null,
      month: _date.getMonth() + 1,
      year: _date.getFullYear(),
    };
  });

  // Use 'useEffect' to update the state when the 'date' prop changes
  useEffect(() => {
    if (date && isDate(date)) {
      setDateState({
        current: date,
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
  }, [date]);

  const [today, setToday] = useState(new Date());

  const addDateToState = (date) => {
    const isDateObject = isDate(date);
    const _date = isDateObject ? date : new Date();
    setDateState({
      current: isDateObject ? date : null,
      month: +_date.getMonth() + 1,
      year: _date.getFullYear(),
    });
  };

  const getCalendarDates = () => {
    const { current, month, year } = dateState;
    const calendarMonth = month || +current?.getMonth() + 1;
    const calendarYear = year || current?.getFullYear();
    return calendar(calendarMonth, calendarYear);
  };

  const renderMonthAndYear = () => {
    const { month, year } = dateState;
    const monthname =
      Object.keys(CALENDAR_MONTHS)[Math.max(0, Math.min(month - 1, 11))];
    return (
      <Styled.CalendarHeader>
        <ArrowLeft onClick={handlePrevious} title="Previous Month" />
        <Styled.CalendarMonth>
          {monthname} {year}
        </Styled.CalendarMonth>
        <ArrowRight onClick={handleNext} title="Next Month" />
      </Styled.CalendarHeader>
    );
  };

  const renderDayLabel = (day, index) => {
    const daylabel = WEEK_DAYS[day];
    return (
      <Styled.CalendarDay key={daylabel} index={index}>
        {daylabel}
      </Styled.CalendarDay>
    );
  };

  const renderCalendarDate = (date, index) => {
    const { current, month, year } = dateState;
    const _date = new Date(date.join('-'));

    const isToday = isSameDay(_date, today);

    const isCurrent = current && isSameDay(_date, current);
    console.log('isCurrent', isCurrent);

    const inMonth =
      month && year && isSameMonth(_date, new Date([year, month, 1].join('-')));

    const disabled =
      (disableDatesBefore && moment(_date).isBefore(disableDatesBefore)) ||
      (disableDatesAfter && moment(_date).isAfter(disableDatesAfter));

    const onClick = disabled ? () => null : gotoDate(_date);
    const props = { index, inMonth, onClick, title: _date.toDateString() };

    const DateComponent = isCurrent
      ? Styled.HighlightedCalendarDate
      : !inMonth
      ? Styled.HiddenCalendarDate
      : disabled
      ? Styled.DisabledCalendarDate
      : Styled.CalendarDate;

    return (
      <DateComponent key={getDateISO(_date)} {...props}>
        {_date.getDate()}
      </DateComponent>
    );
  };

  const gotoDate = (date) => (evt) => {
    evt && evt.preventDefault();
    const { current } = dateState;
    addDateToState(date);
    onDateChanged(date);
    // }
  };
  const gotoPreviousMonth = () => {
    const { month, year } = dateState;
    const previousMonth = getPreviousMonth(month, year);
    setDateState({
      month: previousMonth.month,
      year: previousMonth.year,
      current: dateState.current,
    });
  };
  const gotoNextMonth = () => {
    const { month, year } = dateState;
    const nextMonth = getNextMonth(month, year);
    setDateState({
      month: nextMonth.month,
      year: nextMonth.year,
      current: dateState.current,
    });
  };
  const handlePrevious = (evt) => {
    isPrevMonthValid(dateState) && gotoPreviousMonth();
  };
  const handleNext = (evt) => {
    isNextMonthValid(dateState) && gotoNextMonth();
  };

  return (
    <Styled.CalendarContainer>
      {renderMonthAndYear()}
      <Styled.CalendarGrid>
        <Fragment>{Object.keys(WEEK_DAYS).map(renderDayLabel)}</Fragment>
        <Fragment>{getCalendarDates().map(renderCalendarDate)}</Fragment>
      </Styled.CalendarGrid>
    </Styled.CalendarContainer>
  );
}
Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func,
};
