/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const SIZES = {
  large: {
    "--height": "24px",
    "--padding": "4px",
    "--border-radius": "8px",
    innerBorder: {
      almostThere: "8px",
      aLittleBitmore: "4px",
    },
  },
  medium: {
    "--height": "12px",
    "--padding": 0,
    "--border-radius": "4px",
    innerBorder: {
      almostThere: "4px",
      aLittleBitmore: "2px",
    },
  },
  small: {
    "--height": "8px",
    "--padding": 0,
    "--border-radius": "4px",
    innerBorder: {
      almostThere: "4px",
      aLittleBitmore: "2px",
    },
  },
};

const calculateProgressBarRightSideBorder = (val, size) => {
  let value = val * 100;
  const { almostThere, aLittleBitmore } = SIZES[size].innerBorder;
  if (value + 0.2 >= 100) return almostThere;

  if (value + 0.6 >= 100) return aLittleBitmore;

  return 0;
};

const ProgressBar = ({ value, size }) => {
  const styles = SIZES[size];

  if (!styles) throw new Error(`Unexpected size variant: ${size}`);

  return (
    <Progress
      style={styles}
      aria-label="progress bar"
      aria-valuenow={value + "%"}
      aria-valuemin="0%"
      aria-valuemax="100%"
      value={value / 100}
      size={size}
    ></Progress>
  );
};

const Progress = styled.progress`
  /* Reset the default appearance */
  appearance: none;

  width: 370px;
  height: var(--height);

  /* Outer progress bar (shell) */
  &::-webkit-progress-bar {
    background-color: ${COLORS.transparentGray15};
    border-radius: var(--border-radius);

    box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};
    padding: var(--padding);
  }
  /* Inner progress bar */
  &::-webkit-progress-value {
    background-color: ${COLORS.primary};
    border-radius: 4px 0px 0px 4px;
    border-top-right-radius: ${(p) =>
      calculateProgressBarRightSideBorder(p.value, p.size)};
    border-bottom-right-radius: ${(p) =>
      calculateProgressBarRightSideBorder(p.value, p.size)};
  }
`;

const ProgressBar2 = ({ value, size }) => {
  const styles = SIZES[size];

  if (!styles) throw new Error(`Unexpected size variant: ${size}`);
  return (
    <Wrapper
      style={styles}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {/* This is for accessibility */}
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarRighthandSideCornersTrimmer>
        <Bar
          style={{
            ...styles,
            "--width": `${value}%`,
          }}
        ></Bar>
      </BarRighthandSideCornersTrimmer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  padding: var(--padding);
  border-radius: var(--border-radius);
`;

const Bar = styled.div`
  background-color: ${COLORS.primary};
  width: var(--width);
  height: var(--height);
  border-radius: 4px 0 0 4px;
`;

const BarRighthandSideCornersTrimmer = styled.div`
  border-radius: 4px;
  /* Trim off corners when progress bar is near-full. */
  overflow: hidden;
`;

export default ProgressBar2;
