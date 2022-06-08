/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  background-color: #5db075;
  height: 2.75rem;
  border-radius: 1.375rem;
  @media only screen and (max-width: 600px) {
    min-width: calc(90vw);
    left: calc(5vw);
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
    left: calc(50vw - 270px);
  }
  margin: 8px auto 8px auto;
  font-size: 1rem;
  color: #ffffff;
  text-transform: uppercase;
  outline: none;
  border: none;
  text-align: center;
  position: absolute;
  bottom: 25px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`

export default function SubmitButton(props) {
  return <ButtonWrapper {...props}>{props.label}</ButtonWrapper>
}
