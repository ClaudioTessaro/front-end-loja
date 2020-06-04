/* eslint-disable react/forbid-prop-types */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import Option from './Option';

export default function Select({ name, data, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <select name={fieldName} ref={inputRef} {...rest}>
        <Option data={data} />
      </select>
    </>
  );
}

Select.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
