/* eslint-disable react/prop-types */
import React from 'react';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';

const itemToString = item => item || '';

const AutoComplete = ({ input, placeholder, items, ...rest }) => (
  <Downshift
    {...input}
    onInputValueChange={inputValue => {
      input.onChange(inputValue);
    }}
    itemToString={itemToString}
    selectedItem={input.value}
  >
    {({
      getInputProps,
      getItemProps,

      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => {
      const filteredItems = matchSorter(items, inputValue, {
        keys: ['label'],
      });
      return (
        <div className="downshift" style={{ position: 'relative' }}>
          <input
            {...getInputProps({
              name: input.name,
              placeholder,
            })}
          />
          {isOpen && !!filteredItems.length && (
            <div
              className="downshift-options"
              style={{
                background: 'white',
                position: 'absolute',
                top: '100%',
                left: 15,
                right: 0,
                zIndex: 4,
              }}
            >
              {filteredItems.map(({ value, label }, index) => (
                <div
                  {...getItemProps({
                    key: value,
                    index,
                    item: value,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === value ? 'bold' : 'normal',
                    },
                  })}
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }}
  </Downshift>
);

export default AutoComplete;
