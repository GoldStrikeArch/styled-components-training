import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  console.log("asd", displayedValue);

  return (
    <Wrapper
      style={{
        "--width": displayedValue.length + 3 + "ch",
      }}
    >
      <SelectWrapper value={value} onChange={onChange}>
        {children}
      </SelectWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`

  width: var(--width);
  position: relative;
  background-color: ${COLORS.transparentGray15};
  border-radius: 8px;

  &:after {
    content: '${(p) => (p.arrowIcon ? "qwe" : "↓")}';
    position: absolute;
    z-index: -1;
    top: 12px;
    left: calc(var(--width) - 2ch);
    color: ${COLORS.gray700};
    
  }

  &:hover:after {
    color: black;
  }
`;

const SelectWrapper = styled.select`
  // A reset of styles, including removing the default dropdown arrow
  appearance: none;
  // Additional resets for further consistency
  width: 100%;
  padding: 12px 18px 16px 12px;
  background-color: transparent;
  border: none;
  font-family: Roboto;
  font-size: 16px;
  color: ${COLORS.gray700};

  &:hover {
    color: black;
  }
`;

// The trick is to use actual select (invisible and behind presentational bit)
const Select2 = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <Wrapper2>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <PresentationalBit>
        {displayedValue}
        <IconWrapper style={{ "--size": 24 + "px" }}>
          <Icon id="chevron-down" strokeWidth={1} size={24} />
        </IconWrapper>
      </PresentationalBit>
    </Wrapper2>
  );
};

const NativeSelect = styled.select`
  appearance: none;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const Wrapper2 = styled.div`
  position: relative;
  width: max-content;
`;

const PresentationalBit = styled.div`
  background-color: ${COLORS.transparentGray15};
  border-radius: 8px;
  font-family: Roboto;
  font-size: 16px;
  color: ${COLORS.gray700};
  padding: 12px 16px;
  padding-right: 52px;

  ${NativeSelect}:focus + & {
    outline: 1px dotted #212121;
    outline: 1px auto -webkit-focus-ring-color;
  }
  ${NativeSelect}:hover + & {
    color: ${COLORS.black};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  width: var(--size);
  height: var(--size);
  /* This one so we can click only on select, not on icon box */
  pointer-events: none;
`;

export default Select2;
