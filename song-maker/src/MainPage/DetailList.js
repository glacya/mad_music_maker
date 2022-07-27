import React from "react"
import { Input } from "antd"
import styled from "styled-components"

const DetailDiv = styled.div`
  div {
    margin-bottom: 2rem;
    width: 320px;
  }
`

const { TextArea } = Input

const DetailList = (props) => {

  return (
    <DetailDiv>
      {props.countList && props.countList.map((item, i) => (
        <div key={i}>
            <label>내용</label>
            <div>
              
            </div>
        </div>
      ))}
    </DetailDiv>
  )
}

export default DetailList