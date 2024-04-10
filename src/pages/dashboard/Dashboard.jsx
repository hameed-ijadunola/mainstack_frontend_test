import CustomButton from 'components/CustomButton';
import { CustomText } from 'components/CustomText';
import { formatCurrency } from 'helper/formatText';
import { useScreenSize } from 'hooks/useScreenSize';
import LeftMenuBar from 'layouts/dashboard/navbars/LeftMenuBar';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as InfoSvg } from 'assets/svg/info.svg';
import { ReactComponent as FilterSvg } from 'assets/svg/expand_more.svg';
import { ReactComponent as ExportSvg } from 'assets/svg/download.svg';
import { ReactComponent as IncomingSvg } from 'assets/svg/Group 6782.svg';
import { ReactComponent as OutgoingSvg } from 'assets/svg/Group 67821.svg';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { FilterModal } from './FilterModal';
import CustomChart from 'components/CustomChart';

const Dashboard = () => {
  const { isLaptop, isMobile, isMobileS, isTablet } = useScreenSize();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.className = 'bg-white';
  });

  const stats = useMemo(() => {
    return [
      { id: uuid(), title: 'Ledger balance', amount: 0 },
      { id: uuid(), title: 'total payout', amount: 55080 },
      { id: uuid(), title: 'total revenue', amount: 175580 },
      { id: uuid(), title: 'pending payout', amount: 0 },
    ];
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Fragment>
      <Container className="min-vh-100 mt-13 position-relative">
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
                      text={formatCurrency(120500)}
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
                <CustomChart />
              </Col>
            </Col>
            <Col
              lg={4}
              md={12}
              className={'mt-md-4 mt-lg-0 ps-2 ps-lg-6 ps-xl-12'}
            >
              {/* Transaction details cards */}
              {stats?.map((stat) => (
                <Col md={'auto'} sm={12} className="mb-4">
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
                    text={formatCurrency(stat?.amount)}
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
                  text={'24 Transactions'}
                  textStyle={{ lineHeight: 1 }}
                  // removeView={true}
                />
                <CustomText
                  fontSize={14}
                  fontWeight={500}
                  text={'Your transactions for the last 7 days'}
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
                      <ExportSvg />
                    </span>
                  }
                  variant="secondary"
                  width={139}
                  className={isMobile ? 'ms-auto' : ''}
                />
              </Col>
            </Row>
            {/* Transaction list items */}
            <Row sm={12} className={`m-0 p-0 px-2 g-0 mb-3`}>
              <Col xs="auto" className={'text-wrap d-flex'}>
                <IncomingSvg />
                <div style={{ paddingLeft: 14.5 }}>
                  <CustomText
                    fontSize={16}
                    fontWeight={500}
                    text={'24 Transactions'}
                  />
                  <CustomText
                    fontSize={14}
                    fontWeight={500}
                    text={'Your transactions for the'}
                    variant="light"
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
                  text={formatCurrency(24)}
                />
                <CustomText
                  fontSize={14}
                  fontWeight={500}
                  text={moment().format('MMM DD, YYYY')}
                  variant="light"
                />
              </Col>
            </Row>
          </Row>
        </div>
      </Container>
      <FilterModal handleClose={closeModal} visible={modalIsOpen} />
    </Fragment>
  );
};

export default Dashboard;
