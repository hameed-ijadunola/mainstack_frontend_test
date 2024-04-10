import styled from 'styled-components';

export const CalendarContainer = styled.div`
  font-size: 11.8px;
  border: none;
  overflow: hidden;
  font-family: 'Degular';
  font-weight: 600;
  color: #131316;
`;

export const CalendarHeader = styled.div`
  font-size: 13.48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template: repeat(7, auto) / repeat(7, auto);
  align-items: center;
  justify-content: space-between;
`;

export const CalendarMonth = styled.div`
  font-size: 13.48px;
  text-align: center;
  padding: 0.5em 0.25em;
  word-spacing: 5px;
  user-select: none;
`;

export const CalendarCell = styled.div`
  text-align: center;
  align-self: center;
  font-size: 11.8px;
  letter-spacing: 0.1rem;
  width: 32.02px;
  height: 32.02px;
  user-select: none;
  grid-column: ${(props) => (props.index % 7) + 1} / span 1;
`;

export const CalendarDay = styled(CalendarCell)`
  font-size: 11.8px;
  color: #56616b !important;
  padding-top: 14.3px;
`;

export const CalendarDate = styled(CalendarCell)`
  font-size: 11.8px;
  cursor: pointer;
  margin-top: 13.4px;
  padding-top: 2px;
  padding-left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16.01px;
`;

export const HighlightedCalendarDate = styled(CalendarDate)`
  color: #fff !important;
  background-color: #131316 !important;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    height: calc(100%);
    border-radius: 16.01px;
  }
`;

export const TodayCalendarDate = styled(HighlightedCalendarDate)`
  background-color: #fff !important;
  /* border: 0.5px solid #131316; */
  color: #131316 !important;
`;

export const HiddenCalendarDate = styled(CalendarDate)`
  display: none;
`;

export const DisabledCalendarDate = styled(CalendarDate)`
  color: #56616b !important;
  background: #56616b1a !important;
  position: relative;
`;

export const BlockedCalendarDate = styled(CalendarDate)`
  color: black !important;
  background: gray !important;
  position: relative;
  :hover {
    color: black !important;
    background: gray !important;
    border-color: gray;
    cursor: default;
  }
`;
