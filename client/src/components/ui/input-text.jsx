import React from 'react'
import styled from 'styled-components'

const InputWrapper = styled.input`
  background-color: #f6f6f6;
  border: 0.5px solid #e8e8e8;
  border-radius: 8px;
  height: 2.75rem;
  &:focus,
  &:active {
    outline: none;
  }
  font-size: 1.25rem;
  max-width: calc(600px - 10px);

  margin: 8px auto 8px auto;
  padding: 5px;
  display: block;
  @media only screen and (max-width: 600px) {
    min-width: calc(90vw);
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
  }
`

export default function InputField(props) {
  return <InputWrapper {...props} />
}
