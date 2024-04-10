import React from 'react';
import { Col } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import { CustomText } from './CustomText';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveToUserStore } from 'redux/features/user/userSlice';

const CustomToast = ({ type = 'success', text, duration = 400000 }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(saveToUserStore({ key: 'toastMessage', value: null }));
    }, duration);
  }, [text]);

  return (
    <div
      className="fixed-top"
      style={{
        backgroundColor:
          type === 'error'
            ? '#FA3737'
            : type === 'success'
            ? '#039D00'
            : '#FFC804',
        padding: '6px',
        width: window.innerWidth,
        marginTop: 82,
      }}
    >
      <CustomText
        fontFamily={'Degular'}
        fontSize={14}
        textClassName="text-center"
        styleColor="white"
        text={text}
      />
    </div>
  );
};

export default CustomToast;
