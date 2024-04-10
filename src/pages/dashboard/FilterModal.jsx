import CustomButton from 'components/CustomButton';
import { Col } from 'react-bootstrap';

import { useScreenSize } from 'hooks/useScreenSize';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCustomSelector } from 'redux/features/customSelector';
import Modal from 'react-modal';
import { CustomText } from 'components/CustomText';
import { ReactComponent as CloseSvg } from 'assets/svg/32px icon button.svg';
import { useEffect, useMemo, useState } from 'react';
import CustomSelectInput from 'components/CustomSelectInput';
import { v4 as uuid } from 'uuid';
import Calendar from 'components/Calendar';
import moment from 'moment';

import { ReactComponent as DropSvg } from 'assets/svg/expand_more1.svg';
import { ReactComponent as Drop1Svg } from 'assets/svg/expand_less1.svg';
import { saveToStore } from 'redux/features/user/userSlice';

export const FilterModal = ({ visible, handleClose, showCloseBtn }) => {
  const { isMobile, isMobileS, isTablet, isLaptop, isDesktop } =
    useScreenSize();
  const history = useHistory();
  const dispatch = useDispatch();
  const { filters } = useCustomSelector();

  const customStyles = {
    content: {
      top: '0',
      right: '0',
      bottom: 'auto',
      left: 'auto',
      // marginRight: '-50%',
      // transform: 'translateY(-50%)',
      // width: '456px',
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
      transition: 'transform 0.3s ease-out',
      backgroundColor: 'transparent',
      border: 'none',
      zIndex: 1200,
    },
    overlay: {
      backgroundColor: 'rgba(217, 217, 217, 0.6)',
      zIndex: 1200,
    },
  };

  const intervals = useMemo(() => {
    return [
      { id: uuid(), width: '70px', title: 'Today' },
      { id: uuid(), width: '98px', title: 'Last 7 days' },
      { id: uuid(), width: '99px', title: 'This month' },
      { id: uuid(), width: '116px', title: 'Last 3 months' },
      { id: uuid(), width: '80px', title: 'This year' },
      { id: uuid(), width: '80px', title: 'Last year' },
      { id: uuid(), width: '80px', title: 'All time' },
    ];
  }, []);

  const transactionStatusOptions = useMemo(() => {
    return [
      { id: uuid(), label: 'Successful', value: 'Successful' },
      { id: uuid(), label: 'Pending', value: 'Pending' },
      { id: uuid(), label: 'Failed', value: 'Failed' },
    ];
  }, []);

  const transactionTypeOptions = useMemo(() => {
    return [
      { id: uuid(), label: 'Store Transactions', value: 'Store Transactions' },
      { id: uuid(), label: 'Get Tipped', value: 'Get Tipped' },
      { id: uuid(), label: 'Withdrawals', value: 'Withdrawals' },
      { id: uuid(), label: 'Chargebacks', value: 'Chargebacks' },
      { id: uuid(), label: 'Cashbacks', value: 'Cashbacks' },
      { id: uuid(), label: 'Refer & Earn', value: 'Refer & Earn' },
    ];
  }, []);

  const [menuOpen, setMenuOpen] = useState({ start: false, end: false });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedInterval, setSelectedInterval] = useState('All time');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    if (visible) {
      setMenuOpen({ start: false, end: false });
      setStartDate(filters?.startDate || new Date());
      setEndDate(filters?.endDate || new Date());
      setSelectedInterval(filters?.selectedInterval || 'All time');
      setSelectedType(filters?.selectedType || []);
      setSelectedStatus(filters?.selectedStatus || []);
    }
  }, [filters, visible]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setMenuOpen({ start: false, end: false });
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setMenuOpen({ start: false, end: false });
  };

  const handleTypeChange = (val) => {
    console.log('date', val);
    setSelectedType(val);
  };
  const handleStatusChange = (val) => {
    setSelectedStatus(val);
  };

  const handleIntervalChange = (selectedInterval) => {
    const currentDate = new Date();

    setSelectedInterval(selectedInterval.title);

    switch (selectedInterval.title) {
      case 'Today':
        setStartDate(currentDate);
        setEndDate(currentDate);
        break;
      case 'Last 7 days':
        const lastWeek = new Date(currentDate);
        lastWeek.setDate(currentDate.getDate() - 7);
        setStartDate(lastWeek);
        setEndDate(currentDate);
        break;
      case 'This month':
        const firstDayOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        setStartDate(firstDayOfMonth);
        setEndDate(currentDate);
        break;
      case 'Last 3 months':
        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
        const firstOfMonth = new Date(
          threeMonthsAgo.getFullYear(),
          threeMonthsAgo.getMonth(),
          1
        );
        setStartDate(firstOfMonth);
        setEndDate(currentDate);
        break;
      case 'This year':
        const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
        setStartDate(firstDayOfYear);
        setEndDate(currentDate);
        break;
      case 'Last year':
        const lastYear = new Date(currentDate.getFullYear() - 1, 11, 31);
        setStartDate(new Date(currentDate.getFullYear() - 1, 0, 1));
        setEndDate(lastYear);
        break;
      case 'All time':
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setStartDate(nextWeek);
        setEndDate(currentDate);
        break;
      default:
        setStartDate(currentDate);
        setEndDate(currentDate);
        break;
    }
  };

  const customCalendar = useMemo(() => {
    return (
      <div
        className={`shadow calendar-container ${
          menuOpen?.start ? 'left' : 'right'
        }`}
      >
        <Calendar
          date={menuOpen?.start ? startDate : endDate}
          onDateChanged={
            menuOpen?.start ? handleStartDateChange : handleEndDateChange
          }
          isNextMonthValid={({ month, year }) => {
            const monthStart = moment(menuOpen?.start ? endDate : startDate)
              .month(parseInt(month) - 1)
              .startOf('month');
            const isYearValid =
              moment(menuOpen?.start ? endDate : startDate).year() >
              parseInt(year);
            const valid =
              menuOpen?.end ||
              isYearValid ||
              moment(menuOpen?.start ? endDate : startDate).isAfter(
                monthStart,
                'month'
              );
            return valid;
          }}
          isPrevMonthValid={({ month, year }) => {
            const monthStart = moment(menuOpen?.start ? endDate : startDate)
              .month(parseInt(month) - 1)
              .startOf('month');
            const isYearValid =
              moment(menuOpen?.start ? endDate : startDate).year() <
              parseInt(year);
            const valid =
              menuOpen?.start ||
              isYearValid ||
              moment(menuOpen?.start ? endDate : startDate).isBefore(
                monthStart,
                'month'
              );
            return valid;
          }}
          disableDatesAfter={menuOpen?.start && endDate}
          disableDatesBefore={menuOpen?.end && startDate}
        />
      </div>
    );
  }, [startDate, endDate, menuOpen]);

  const startDateDropdown = useMemo(() => {
    return !menuOpen?.start ? <DropSvg /> : <Drop1Svg />;
  }, [menuOpen?.start]);
  const endDateDropdown = useMemo(() => {
    return !menuOpen?.end ? <DropSvg /> : <Drop1Svg />;
  }, [menuOpen?.end]);

  const handleModalClose = () => {
    handleClose();
    setMenuOpen({ start: false, end: false });
  };

  const handleClear = () => {
    dispatch(saveToStore(['filters', {}]));
    setMenuOpen({ start: false, end: false });
    // handleClose();
  };

  const handleApply = () => {
    dispatch(
      saveToStore([
        'filters',
        {
          startDate,
          endDate,
          selectedInterval,
          selectedType,
          selectedStatus,
        },
      ])
    );
    setMenuOpen({ start: false, end: false });
    // handleClose();
  };

  const isApplyDisabled = false;

  return (
    <Modal
      isOpen={visible}
      onRequestClose={handleModalClose}
      style={customStyles}
      contentLabel="Filter Modal"
      appElement={document.getElementById('root') || undefined}
    >
      <div
        style={{
          height: window.innerHeight - 20,
          borderRadius: 20,
          padding: '20px 22px',
        }}
        className="bg-white filter-modal"
      >
        <div className="d-flex flex-column justify-content-between w-100 h-100">
          <div>
            <div
              className="spaced-rowcentered pb-3"
              style={{ paddingLeft: 2, paddingRight: 2 }}
            >
              <CustomText fontSize={24} fontWeight={700} text={'Filter'} />
              <CloseSvg onClick={handleModalClose} />
            </div>
            <div
              className="spaced-rowcentered pb-3 justify-content-between hide-scrollbar"
              style={{ overflowX: 'auto', width: '100%' }}
            >
              {intervals?.map((interval) => (
                <CustomText
                  key={interval.id}
                  fontSize={14}
                  fontWeight={600}
                  text={interval?.title}
                  textStyle={{
                    width: interval?.width,
                    height: 36,
                    flexShrink: 0,
                    marginRight: '10px',
                  }}
                  textClassName={`centered border ${
                    selectedInterval == interval?.title
                      ? 'border-primary bg-primary text-white'
                      : 'border-light-primary text-primary'
                  } rounded-pill`}
                  // removeView={true}
                  onClick={() => handleIntervalChange(interval)}
                />
              ))}
            </div>

            <div className="spaced-rowcentered pb-3 align-items-end">
              <CustomSelectInput
                label={'Date Range'}
                width="49%"
                touchWidth="40%"
                mt={24}
                placeholder={moment(startDate).format('DD MMM YYYY')}
                selectProps={{
                  isMulti: false,
                  isSearchable: false,
                  menuIsOpen: menuOpen?.start,
                  onMenuOpen: () =>
                    setMenuOpen((prev) => ({
                      end: false,
                      start: !prev?.start,
                    })),
                }}
                handleContainerClick={(e) => {
                  setMenuOpen((prev) => ({ end: false, start: !prev?.start }));
                }}
                extraComponents={{
                  Menu: () => customCalendar,
                  DropdownIndicator: () => startDateDropdown,
                }}
              />
              <CustomSelectInput
                label={''}
                width="49%"
                touchWidth="40%"
                mt={24}
                placeholder={moment(endDate).format('DD MMM YYYY')}
                selectProps={{
                  isMulti: false,
                  isSearchable: false,
                  menuIsOpen: menuOpen?.end,
                  onMenuOpen: () =>
                    setMenuOpen((prev) => ({
                      start: false,
                      end: !menuOpen?.end,
                    })),
                }}
                extraComponents={{
                  Menu: () => customCalendar,
                  DropdownIndicator: () => endDateDropdown,
                }}
                handleContainerClick={(e) => {
                  setMenuOpen((prev) => ({
                    start: false,
                    end: !menuOpen?.end,
                  }));
                }}
              />
            </div>
            <CustomSelectInput
              label={'Transaction Type'}
              selectOptions={transactionTypeOptions}
              value={selectedType}
              onChange={handleTypeChange}
            />
            <CustomSelectInput
              label={'Transaction Status'}
              mt={24}
              selectOptions={transactionStatusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <CustomButton
              width={'48%'}
              text={'Clear'}
              variant="outline"
              onClick={handleClear}
            />
            <CustomButton
              width={'48%'}
              text={'Apply'}
              disabled={isApplyDisabled}
              onClick={handleApply}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
