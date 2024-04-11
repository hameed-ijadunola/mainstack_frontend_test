import CustomButton from 'components/CustomButton';
import { CustomText } from 'components/CustomText';
import { capitalize, formatCurrency } from 'helpers/formatText';
import { useScreenSize } from 'hooks/useScreenSize';
import LeftMenuBar from 'layouts/dashboard/navbars/LeftMenuBar';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as InfoSvg } from 'assets/svg/info.svg';
import { ReactComponent as FilterSvg } from 'assets/svg/expand_more.svg';
import { ReactComponent as ExportSvg } from 'assets/svg/download.svg';
import { ReactComponent as ExportSvg1 } from 'assets/svg/download1.svg';
import { ReactComponent as IncomingSvg } from 'assets/svg/Group 6782.svg';
import { ReactComponent as OutgoingSvg } from 'assets/svg/Group 67821.svg';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { FilterModal } from './FilterModal';
import CustomChart from 'components/CustomChart';
import { customFetchQuery } from 'redux/features/customFetchQuery';
import {
  useGetTransactionsMutation,
  useGetUserMutation,
  useGetWalletMutation,
} from 'redux/features/user/userApi';
import { saveToStore } from 'redux/features/user/userSlice';
import { useCustomSelector } from 'redux/features/customSelector';
import {
  findOldestAndNewestDates,
  getIntervalTranslation,
  isArrayNonEmpty,
  isDateWithinRange,
  isSubstringInArray,
  removeDuplicates,
  sortByDate,
} from 'helpers/functions';
import { useReactToPrint } from 'react-to-print';

const Dashboard = () => {
  const { isLaptop, isMobile, isMobileS, isTablet } = useScreenSize();
  const history = useHistory();
  const dispatch = useDispatch();
  const { wallet, filters, transactions } = useCustomSelector();

  useEffect(() => {
    document.body.className = 'bg-white';
  });

  const stats = useMemo(() => {
    return [
      { id: uuid(), title: 'Ledger balance', amount: wallet?.ledger_balance },
      { id: uuid(), title: 'total payout', amount: wallet?.total_payout },
      { id: uuid(), title: 'total revenue', amount: wallet?.total_revenue },
      { id: uuid(), title: 'pending payout', amount: wallet?.pending_payout },
    ];
  }, [wallet]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [getWallet, { isLoading: loadingWallet }] = useGetWalletMutation();
  const [getTransactions, { isLoading: loadingTransactions }] =
    useGetTransactionsMutation();

  const fetchTransactions = async () => {
    await customFetchQuery({
      api: getTransactions,
      dispatch,
      handleSuccess: (data) => {
        dispatch(saveToStore(['transactions', data]));
        const defaultStartAndEndDates = findOldestAndNewestDates(
          data?.map((x) => x?.date)
        );
        dispatch(
          saveToStore(['defaultStartAndEndDates', defaultStartAndEndDates])
        );
        dispatch(
          saveToStore([
            'defaultTypes',
            removeDuplicates(
              data
                ?.map((x) => x?.type?.replace(/_/g, ' '))
                ?.filter(
                  (item) => item !== undefined && item !== null && item !== ''
                )
            ),
          ])
        );
        dispatch(
          saveToStore([
            'filters',
            { ...filters, ...defaultStartAndEndDates, selectedInterval: '' },
          ])
        );
      },
    });
  };
  const fetchWallet = async () => {
    await customFetchQuery({
      api: getWallet,
      dispatch,
      handleSuccess: (data) => {
        dispatch(saveToStore(['wallet', data]));
      },
    });
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions || [];
    filtered = sortByDate(filtered);
    if (filters?.startDate && filters?.endDate) {
      filtered = filtered?.filter((x) =>
        isDateWithinRange(x?.date, filters?.startDate, filters?.endDate)
      );
    }
    if (isArrayNonEmpty(filters?.selectedType)) {
      filtered = filtered?.filter((x) =>
        isSubstringInArray(
          x?.type?.replace(/_/g, ' '),
          filters?.selectedType?.map((x) => x?.value)
        )
      );
    }
    if (isArrayNonEmpty(filters?.selectedStatus)) {
      filtered = filtered?.filter((x) =>
        isSubstringInArray(
          x?.status,
          filters?.selectedStatus?.map((x) => x?.value)
        )
      );
    }
    return filtered;
  }, [transactions, filters]);

  const chartProps = useMemo(() => {
    const chartLabels = sortByDate(filteredTransactions, true)?.map((x) =>
      moment(x?.date).format('MMM DD, YYYY')
    );

    const chartData = {
      labels: chartLabels,
      datasets: [
        {
          data: sortByDate(filteredTransactions, true)?.map((x) =>
            isNaN(parseFloat(x?.amount)) ? null : parseFloat(x?.amount)
          ),
          borderColor: '#FF5403',
          backgroundColor: '#FF5403',
          borderWidth: 1,
          tension: 0.3,
        },
      ],
    };
    return { labels: chartLabels, data: chartData };
  }, [filteredTransactions]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `@page { margin: 1in; }`,
  });

  return (
    <Fragment>
      <Container
        className="min-vh-100 mt-13 position-relative"
        data-testid="dashboard-container"
      >
        <LeftMenuBar />
        <div style={{ marginTop: -200 }}>
          <Row className="px-8 py-6">
            <Col lg={8} md={12} className="spaced-colcentered">
              {/* <TransactionGraph /> */}
              <Col className="w-100">
                <Row className="d-flex align-items-center">
                  <Col md={'auto'} sm={12}>
                    <CustomText
                      fontSize={14}
                      fontWeight={500}
                      text={'Available Balance'}
                      variant="light"
                    />
                    <CustomText
                      fontSize={36}
                      fontWeight={700}
                      text={
                        typeof wallet?.balance === 'undefined'
                          ? '...'
                          : formatCurrency(wallet?.balance)
                      }
                    />
                  </Col>
                  <Col md={'auto'} sm={12} className={'ms-lg-8 ms-auto'}>
                    <CustomButton text={'Withdraw'} height={52} width={167} />
                  </Col>
                </Row>
              </Col>
              <Col
                className="w-100 centered pb-lg-0 pb-10"
                style={{ height: 300 }}
              >
                <CustomChart {...chartProps} />
              </Col>
            </Col>
            <Col
              lg={4}
              md={12}
              className={'mt-md-4 mt-lg-0 ps-2 ps-lg-6 ps-xl-12'}
            >
              {/* Transaction details cards */}
              {stats?.map((stat) => (
                <Col key={stat?.id} md={'auto'} sm={12} className="mb-4">
                  <div className="spaced-rowcentered pb-2">
                    <CustomText
                      fontSize={14}
                      fontWeight={500}
                      text={stat?.title}
                      variant="light"
                      className="text-capitalize"
                    />
                    <InfoSvg />
                  </div>
                  <CustomText
                    fontSize={28}
                    fontWeight={700}
                    text={
                      typeof stat?.amount === 'undefined'
                        ? '...'
                        : formatCurrency(stat?.amount)
                    }
                  />
                </Col>
              ))}
            </Col>
          </Row>
          <Row className="px-8 pb-4 pt-8">
            <Row sm={12} className="spaced-rowcentered m-0 p-0 mb-4">
              <Col sm={12} md={'auto'}>
                <CustomText
                  fontSize={24}
                  fontWeight={700}
                  text={`${filteredTransactions?.length || '0'} Transaction${
                    filteredTransactions?.length > 1 ? 's' : ''
                  }`}
                  textStyle={{ lineHeight: 1 }}
                  // removeView={true}
                />
                <CustomText
                  fontSize={14}
                  fontWeight={500}
                  text={`Your transactions ${
                    filters?.selectedInterval
                      ? filters?.selectedInterval === 'Custom'
                        ? moment(filters?.startDate)?.format('MMM DD, YYYY') +
                          ' to ' +
                          moment(filters?.endDate)?.format('MMM DD, YYYY')
                        : 'for ' +
                          getIntervalTranslation(filters?.selectedInterval)
                      : 'for all time'
                  }`}
                  variant="light"
                />
              </Col>
              <Col
                sm={12}
                md={'auto'}
                className={`row justify-content-end m-0 p-0 ${
                  isMobile ? 'mt-3' : ''
                }`}
              >
                <CustomButton
                  text={
                    <span>
                      Filter&nbsp;
                      <FilterSvg />
                    </span>
                  }
                  variant="secondary"
                  width={107}
                  className={'me-md-2'}
                  onClick={openModal}
                />
                <CustomButton
                  text={
                    <span>
                      Export list&nbsp;
                      {isArrayNonEmpty(filteredTransactions) ? (
                        <ExportSvg />
                      ) : (
                        <ExportSvg1 />
                      )}
                    </span>
                  }
                  variant="secondary"
                  width={139}
                  className={isMobile ? 'ms-auto' : ''}
                  onClick={handlePrint}
                  disabled={!isArrayNonEmpty(filteredTransactions)}
                />
              </Col>
            </Row>
            <Col sm={12} className="m-0 p-0" ref={componentRef}>
              {/* Transaction list items */}
              {filteredTransactions?.map((trxn) => (
                <Row
                  key={JSON.stringify(trxn)}
                  sm={12}
                  className={`m-0 p-0 px-2 g-0 mb-3`}
                >
                  <Col xs="auto" className={'text-wrap d-flex'}>
                    {trxn?.type === 'deposit' ? (
                      <IncomingSvg />
                    ) : (
                      <OutgoingSvg />
                    )}
                    <div style={{ paddingLeft: 14.5 }}>
                      <CustomText
                        fontSize={16}
                        fontWeight={500}
                        text={
                          trxn?.type === 'deposit'
                            ? trxn?.metadata?.product_name ||
                              trxn?.metadata?.name
                            : 'Cash withdrawal'
                        }
                      />
                      <CustomText
                        fontSize={14}
                        fontWeight={500}
                        text={
                          trxn?.type === 'deposit'
                            ? trxn?.metadata?.name
                            : capitalize(trxn?.status)
                        }
                        variant="light"
                        styleColor={
                          trxn?.type == 'deposit'
                            ? ''
                            : isSubstringInArray(trxn?.status, ['successful'])
                            ? '#0EA163'
                            : '#A77A07'
                        }
                      />
                    </div>
                  </Col>
                  <Col
                    md="auto"
                    xs={'auto'}
                    className={`d-flex ${
                      isMobileS
                        ? 'spaced-rowcentered w-100'
                        : 'flex-column align-items-end ms-auto'
                    }`}
                  >
                    <CustomText
                      fontSize={16}
                      fontWeight={700}
                      text={formatCurrency(trxn?.amount)}
                    />
                    <CustomText
                      fontSize={14}
                      fontWeight={500}
                      text={moment(trxn?.date).format('MMM DD, YYYY')}
                      variant="light"
                    />
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        </div>
      </Container>
      <FilterModal
        handleClose={closeModal}
        visible={modalIsOpen}
        data-testId="filter-modal"
      />
    </Fragment>
  );
};

export default Dashboard;
