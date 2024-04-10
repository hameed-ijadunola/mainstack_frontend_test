import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { CustomText } from './CustomText';

const CustomButton = ({
  text,
  type = 'button',
  variant = 'primary',
  disabled,
  loading,
  spinnerVariant = 'light',
  className,
  height = 48,
  width,
  borderRadius,
  borderWidth = 1,
  style,
  fontFamily = 'Degular',
  size,
  fontSize = '16px',
  fontWeight = 600,
  buttonTextColor,
  onClick,
  onPress,
  children,
}) => {
  return (
    <Button
      size={size || 'sm'}
      variant={variant}
      onClick={onClick || onPress}
      type={type}
      disabled={disabled || loading}
      className={` ${
        disabled
          ? 'bg-disabled-bg border-light-primary'
          : variant === 'outline'
          ? 'bg-white border-light-primary'
          : variant === 'secondary'
          ? 'bg-light-primary border-light-primary'
          : 'bg-primary border-primary'
      } ${className}`}
      style={{
        height: height,
        width: width,
        borderRadius: borderRadius || height / 2,
        borderWidth: borderWidth,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        ...style,
      }}
    >
      {loading ? (
        <Spinner size="sm" variant={spinnerVariant} />
      ) : text ? (
        <CustomText
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          text={text}
          cNColor={
            buttonTextColor ||
            (disabled
              ? 'text-white'
              : variant === 'outline'
              ? 'text-primary'
              : variant === 'secondary'
              ? 'text-primary'
              : 'text-white')
          }
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
