/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

const ListWrapper = styled.div`
  height: calc(100vh - 90px - 70px);
  position: absolute;
  top: 90px;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  @media only screen and (max-width: 600px) {
    min-width: calc(90vw);
    left: calc(5vw);
  }
  @media only screen and (min-width: 600px) {
    width: 540px;
    left: calc(50vw - 270px);
  }
  background-color: #fbfbfb;
`

function List({ messages, me, roomId }) {
  return <ListWrapper>Chat messages go here</ListWrapper>
}

export default List
