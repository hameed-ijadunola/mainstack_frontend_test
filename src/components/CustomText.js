import React from 'react';

export const CustomText = ({
  text = '---',
  fontSize = 15,
  fontWeight = 400,
  fontFamily = 'Degular',
  mb = '0px',
  mt = '0px',
  mr = '0px',
  ml = '0px',
  onClick,
  onPress,
  disabled,
  cNColor,
  variant = 'dark',
  styleColor,
  divStyle = null,
  textStyle = {},
  divClassName = '',
  className = '',
  textClassName = 'text-start',
  children,
  removeView,
}) => {
  return removeView ? (
    <p
      className={`${cNColor || ''} ${
        variant === 'dark' ? 'text-primary' : 'text-primary-400'
      } ${textClassName}`}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontWeight: fontWeight,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        color: styleColor && styleColor,
        ...textStyle,
      }}
      onClick={!disabled && (onClick || onPress)}
    >
      {children || text}
    </p>
  ) : (
    <div
      style={divStyle}
      className={divClassName || className}
      onClick={!disabled && (onClick || onPress)}
    >
      <p
        className={`${cNColor || ''} ${
          variant === 'dark' ? 'text-primary' : 'text-primary-400'
        } ${textClassName}`}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
          fontWeight: fontWeight,
          marginTop: mt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          color: styleColor && styleColor,
          ...textStyle,
        }}
      >
        {children || text}
      </p>
    </div>
  );
};
