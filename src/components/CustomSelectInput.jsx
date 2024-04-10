import ReactSelect, { components } from 'react-select';
import { CustomText } from './CustomText';
import { ReactComponent as DropSvg } from 'assets/svg/expand_more1.svg';
import { ReactComponent as Drop1Svg } from 'assets/svg/expand_less1.svg';
import { ReactComponent as CheckedSvg } from 'assets/svg/check button.svg';
import { ReactComponent as UncheckedSvg } from 'assets/svg/check button1.svg';
import React from 'react';

const ClearIndicator = () => null;

const IndicatorSeparator = () => null;

const DropdownIndicator = (props) => {
  return props?.selectProps?.menuIsOpen ? <Drop1Svg /> : <DropSvg />;
};
const Option = (props) => {
  return (
    <components.Option {...props}>
      {props?.isSelected ? (
        <CheckedSvg style={{ marginRight: 12 }} />
      ) : (
        <UncheckedSvg style={{ marginRight: 12 }} />
      )}
      <CustomText
        fontSize={16}
        fontWeight={600}
        text={props.label}
        width="auto"
      />
      {/* {props.label} */}
    </components.Option>
  );
};

const MultiValue = ({ children, ...props }) => {
  return <components.MultiValue {...props}>{children},</components.MultiValue>;
};

const MultiValueContainer = ({ selectProps, data }) => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex((selected) => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const labelSuffix = isLastSelected ? `` : ', ';
  const val = `${label}${labelSuffix}`;
  return val;
};

const CustomSelectInput = ({
  value,
  selectOptions = [],
  label,
  fontSize = 14,
  labelStyle,
  inputHeight = '48px',
  width = 'auto',
  inputPadding = 12,
  required = true,
  id,
  placeholder,
  onChange = () => {},
  inputStyle,
  error,
  mt = 0,
  mb = 0,
  inputTop = 5,
  inputBottom = 5,
  disabled,
  returnSelectObject = true,
  selectProps = {},
  extraComponents,
  handleContainerClick,
  touchWidth,
}) => {
  const baseComponents = {
    Option,
    DropdownIndicator,
    IndicatorSeparator,
    ClearIndicator,
    MultiValue,
    MultiValueContainer,
  };

  const selectComponents = extraComponents
    ? { ...baseComponents, ...extraComponents }
    : baseComponents;

  return (
    <div
      style={{ marginTop: mt, marginBottom: mb, width: width }}
      className="text-start"
    >
      {label && (
        <CustomText
          mb={9}
          fontFamily={'Degular'}
          fontSize={16}
          fontWeight={600}
          text={label || ''}
          textStyle={labelStyle}
          cNColor={'text-primary'}
        />
      )}
      {touchWidth && handleContainerClick && (
        <div
          onClick={handleContainerClick}
          style={{
            position: 'absolute',
            height: inputHeight,
            width: touchWidth,
            backgroundColor: 'transparent',
            marginRight: 20,
            zIndex: 20,
          }}
        ></div>
      )}
      <ReactSelect
        options={selectOptions}
        defaultValue={value}
        value={value}
        placeholder={placeholder || label}
        required={required}
        isDisabled={disabled}
        onChange={(e) => {
          onChange(returnSelectObject ? e : e?.value);
        }}
        components={selectComponents}
        styles={{
          indicatorsContainer: (provided) => ({
            ...provided,
            pointerEvents: 'none',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: 0,
            flexWrap: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '90%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }),
          control: (provided, state) => {
            return {
              ...provided,
              backgroundColor: !state?.selectProps?.menuIsOpen
                ? '#EFF1F6'
                : 'white',
              borderStyle: 'solid',
              borderWidth: '3px',
              // borderColor: !state?.selectProps?.menuIsOpen ? 'red' : '#131316',
              borderColor: !state?.selectProps?.menuIsOpen
                ? '#EFF1F6'
                : '#131316',
              '&:hover': {
                borderColor: !state?.selectProps?.menuIsOpen
                  ? '#EFF1F6'
                  : '#131316',
              },
              boxShadow: 'none',
              color: '#131316',
              borderRadius: 12,
              height: inputHeight,
              paddingLeft: inputPadding || '16px',
              paddingRight: inputPadding || '16px',
              fontSize: fontSize,
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              // whiteSpace: 'nowrap',
              ...inputStyle,
            };
          },
          option: (provided, state) => {
            return {
              ...provided,
              cursor: 'pointer',
              backgroundColor: 'transparent',
              ':hover': {
                backgroundColor: '#eff1f6',
              },
              color: '#131316',
              fontSize: 16,
              fontWeight: 600,
              padding: 14,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              marginBottom:
                [...state?.options]?.pop()?.value == state?.value
                  ? '0px'
                  : '4px',
            };
          },
          multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'red',
            padding: '0px',
            maxWidth: 100,
            margin: '0px',
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: '#131316',
            fontSize: fontSize,
            fontWeight: 500,
            paddingLeft: '0px',
            paddingRight: '2px',
            padding: '0px',
            margin: '0px',
          }),
          menu: (provided, state) => ({
            ...provided,
            padding: 8,
            borderRadius: 12,
          }),
          menuList: (provided, state) => ({
            ...provided,
            padding: 0,
          }),
          placeholder: (provided, state) => ({
            ...provided,
            fontSize: fontSize,
            fontWeight: 500,
            color: '#101828',
            ...inputStyle,
          }),
          container: (provided, state) => {
            return {
              ...provided,
              marginTop: inputTop,
              marginBottom: inputBottom,
              width: '100%',
              borderStyle: 'none',
            };
          },
        }}
        closeMenuOnSelect={false}
        isMulti={true}
        hideSelectedOptions={false}
        blurInputOnSelect={false}
        {...selectProps}
      />
    </div>
  );
};

export default CustomSelectInput;
