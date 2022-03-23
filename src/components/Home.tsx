import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { Link, Outlet } 
       from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Table, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoadingOverlay from "react-loading-overlay";
import { BeatLoader } from "react-spinners";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import "../App.css";
import { txns, value } from '../redux/selectors';
import { txnActions } from '../redux/reducers'
import { useAppSelector, useAppDispatch } from '../redux/hooks'

interface BondDetailInfo {
  companyID: number;
  companyName: string;
  bondID: string;
  faceValue: number;
  interval: number;
  coupon: number;
  maturity: number;
  owned: number;
}

const bondHeader = [
  "ROI 9.5% Maturity June 2025 ",
  "ROI 14.5% Maturity January 2035",
  "ROI 22.5% Maturity June 2030",
];

function User() { 
  const testValue = useSelector(value)
  console.log(testValue)
  return <>testValue</>
}

export default function Home() {
  //const dispatch = useDispatch();
  const dispatch = useAppDispatch()

  const [walletAddress, setWalletAddress] = useState<string>("");
  const [investAmountToAdd, setInvestAmountToAdd] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [bondItems, setBondItems] = useState<{ key: number; value: string }[]>(
    []
  );
  const [selectedBondIndex, setSelectedBondIndex] = useState<number>(0);
  const [selectedBondItem, setSelectedBondItem] = useState<
    { key: number; value: string }[]
  >([]);
  const [bondInvestmentHashInfo, setBondInvestmentHashInfo] =
    useState<string>("");
  const [bondID, setBondID] = useState<string>("");
  const [bondDetailInfoList, setBondDetailInfoList] = useState<BondDetailInfo[]>([])
  const [bondTokenOwned, setBondTokenOwned] = useState<number>(0);

  let counter: number = 0;

  const showLoading = (shouldShow: boolean) => {
    if (shouldShow) {
      setShowOverlay(true);
      counter++;
    } else {
      if (--counter <= 0) {
        setShowOverlay(false);
        counter = 0;
      }
    }
  };

  const setBondInfo = () => {
    const bondJson =
      '{ \
      "1":"Token A",  \
      "2":"Token B",  \
      "3":"Token C" \
    }';
    const bondList = JSON.parse(bondJson);
    setBondItems(
      Object.entries(bondList).map(([keyIndex, value]) => {
        //console.log(keyIndex)
        const key = parseInt(keyIndex, 10);
        return {
          key,
          value: String(value || ""),
        };
      })
    );
    console.log(bondItems);
  };

  useEffect(() => {
    setBondInfo();

    dispatch(txnActions.SET_VALUE(5))

  }, []);

  const onInvestAmountToAddChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInvestAmountToAdd(e.target.value);
  };

  const onDropdownClick = (e: any) => {
    console.log(e.currentTarget.textContent);

    let selectedIndex: number = e.currentTarget.textContent.replace(
      /[^0-9]/g,
      ""
    );

    const selectedBondItem = bondItems.filter((item) => {
      console.log(item.key);
      console.log(selectedIndex);
      return item.key == selectedIndex;
    });
    setSelectedBondItem(selectedBondItem);
    setSelectedBondIndex(selectedIndex);
  };

  function viewRedux() {
    console.log('viewRedux')
    return <User/>
  }

  return (
    <LoadingOverlay
      active={showOverlay}
      spinner={<BeatLoader color="#FFFFFF" />}
    >
      <div className="App">
        <Container>
          <Row>
            <h2>Token UI</h2>
          </Row>
          <hr></hr>      
          <Row>
            <Col>
              <Container className="section">
                <Row>
                  <Col>
                    <h3>Token</h3>
                  </Col>
                </Row>
                <Row>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Token List
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={onDropdownClick}
                      >
                        Token 1
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={onDropdownClick}
                      >
                        Token 2
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        onClick={onDropdownClick}
                      >
                        Token 3
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Row>
              </Container>
            </Col>
            <Col>
              <Container className="section">
                <Row>
                  <Col>
                    <h3>Token Information</h3>
                  </Col>
                </Row>
                <Row>
                  <Table>
                    <tbody>
                      {selectedBondItem.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item.key}</td>
                            <td>{item.value}</td>
                          </tr>
                        );
                      })}
                      <tr>
                        <td></td>
                        <td>{bondHeader[selectedBondIndex - 1]}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col>
                    <Container className="section">
                      <Row>
                        <Col>
                          <Link 
                          to={`/viewTransactions/0x4598657123`} 
                          //target="_blank" 
                          //rel="noopener noreferrer"
                          state={{ name: "test", owned : bondTokenOwned }}>
                            <Button className="bg-blue-600" >View Transactions</Button>
                          </Link>
                        </Col>
                        <Col>
                        <Button className="bg-blue-600" onClick={viewRedux}>View Redux</Button>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col> 
           </Row>  
        </Container>
      </div>
    </LoadingOverlay>
  );
}