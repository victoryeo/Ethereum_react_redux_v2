import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Row } from "react-bootstrap";
import "../App.css"
import { value } from '../redux/selectors';
import { useAppSelector } from '../redux/hooks'

interface TxProps {
  name: string,
  owned: number
}

//export default function ViewTransactions({ name, owned }: TxProps) {
const ViewTransactions = () => {

  const params =  useParams()
  console.log(params)

  const testValue = useAppSelector(value)
  //const testValue = useSelector(value)
  console.log(testValue)

  //const done = useSelector(Selectors.isAppInitialized)
  //console.log(done)


  //const test2 = selectCount()
  //console.log(test2)

  return (
    <div className="App">
      <Container>
        <Row>
          <h2>Transactions</h2>
        </Row>
        <Row>
          <Col>
            <div className="section">
              wallet: {params.account}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="section">
              <Row>
                <Col xs={2}>
                  <div className="section">
                    Bond Name
                  </div>
                </Col>
                <Col xs={1}>
                  <div className="section">
                    Amount
                  </div>
                </Col>
                <Col  xs={2}>
                  <div className="section">
                    From
                  </div>
                </Col> 
                <Col>
                  <div className="section">
                    Txn Hash
                  </div>
                </Col>        
              </Row>
                        
            </Container>
          </Col>
        </Row>
      </Container>   
    </div>
  );
}

export default ViewTransactions