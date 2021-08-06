import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from "./Card";
import Score from "./score";
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from './slice/loader';
import { setApiResponses, setActiveClue, setWagerAmount } from './slice/main';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const CATEGORIES = [49, 21, 267, 25];
const CLUES = [100, 200, 300, 400, 500];
const ROUNDS = ["Round 1", "Round 2"];
const UNLOCK_ROUND2 = 1;

const TooltipTopNavItem = ({ title, tooltipMessage, eventKey, disabled }) => {

    return (
        <>
            {
                tooltipMessage ?
                    <OverlayTrigger
                        key={`${eventKey}-top`}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                {tooltipMessage}
                            </Tooltip>
                        }
                    >
                        <Nav.Item>
                            <Nav.Link disabled={disabled} eventKey={eventKey}>{title}</Nav.Link>
                        </Nav.Item>
                    </OverlayTrigger>
                    :
                    <Nav.Item>
                        <Nav.Link disabled={disabled} eventKey={eventKey}>{title}</Nav.Link>
                    </Nav.Item>
            }
        </>

    )
}

function ControlledTabsWithTooltip() {
    const count = useSelector(state => state.main.count);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if (count >= UNLOCK_ROUND2) {
            setFlag(false);
        } else {
            setFlag(true);
        }
    }, [count])

    // const isRound2Enabled = () => {
    //     if (count === UNLOCK_ROUND2) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    const [key, setKey] = useState('managed');
    return (
        <Tab.Container id="tabs-example" onSelect={(k) => setKey(k)} activeKey={key}>
            {/* <Row> */}
            {/* <Col sm={3}> */}
            <Nav variant="pills">
                <Col sm={6}>
                    <TooltipTopNavItem title={ROUNDS[0]} eventKey={"managed"} />
                </Col>
                <Col sm={6}>
                    <TooltipTopNavItem disabled={flag} title={ROUNDS[1]} tooltipMessage={' One correct answer from Round 1 to enable Round 2'} eventKey={"unmanaged"} />
                </Col>
                {/* <TooltipTopNavItem title={'Source'} tooltipMessage={'Source tooltip'} eventKey={"source"} /> */}
            </Nav>
            {/* </Col> */}
            {/* <Col sm={9}> */}
            <Tab.Content>
                <Tab.Pane eventKey="managed">
                    <RoundBody />
                </Tab.Pane>
                <Tab.Pane eventKey="unmanaged">
                    {/* <RoundBody jeopardy={2} /> */}
                    <CreateFinalRound />
                </Tab.Pane>
            </Tab.Content>
            {/* </Col> */}
            {/* </Row> */}
        </Tab.Container>);
}

function CreateFinalRound() {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [flag, setFlag] = useState(true);
    const [chance, SetChance] = useState(true);
    const data = useSelector(state => state.main.apiData);
    const clue = data.length > 0 && data[0].clues[(Math.floor(Math.random() * 50) + 1)];

    const onChange = (e) => {
        setAmount(e.target.value);
    }

    const handleClueClick = (event) => {
        document.getElementById("cardCustom").style.left = '0';
        SetChance(false);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFinalAmount(amount);
        setWagerAmount(amount);
        setFlag(false);
        const copyClue = JSON.parse(JSON.stringify(clue));
        copyClue.value = parseInt(amount);
        dispatch(setActiveClue(copyClue));
    }
    return (<>
        <div className="finalQuestionContainer">
            <div>
                <p>Bet Amount</p>
                <input class="form-control" name="amount" value={finalAmount} type="text" disabled />
            </div>
            <div className={flag ? '' : 'disabledbutton'}>
                <p>Set the bet Amount</p>
                <form onSubmit={onSubmit} autoComplete="off">
                    <input class="form-control" name="answer" value={amount} onChange={onChange} type="text" />
                    <br />
                    <Button variant="primary" type="submit">Set Amount</Button>
                </form>
            </div>

        </div>
        {
            chance && <Button variant="primary" type="submit" onClick={handleClueClick} disabled={flag}>Set the bet amount first and Click to open question!</Button>
        }
    </>)
}

function ControlledTabs() {
    const count = useSelector(state => state.main.count);
    const [key, setKey] = useState('home');

    const isRound2Enabled = () => {
        if (count === UNLOCK_ROUND2) {
            return false;
        } else {
            return true;
        }
    }

    const tooltip = (
        <Tooltip id="tooltip">
            One correct answer from Round 1 to enable Round 2
        </Tooltip>
    );

    return (
        <Tabs
            bg="primary"
            variant="pills"
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"

        >
            <Tab eventKey="home" title={ROUNDS[0]}>
                <RoundBody />
            </Tab>
            <Tab eventKey="profile" title={ROUNDS[1]} disabled={isRound2Enabled}>
                {/* <OverlayTrigger placement="right" overlay={tooltip}>
                    <span className="d-inline-block">
                    </span>
                </OverlayTrigger> */}
                <RoundBody />
            </Tab>
        </Tabs>
    );
}

function Rounds() {
    const count = useSelector(state => state.main.count);

    const isRound2Enabled = () => {
        if (count === UNLOCK_ROUND2) {
            return false;
        } else {
            return true;
        }
    }

    const tooltip = (
        <Tooltip id="tooltip">
            One correct answer from Round 1 to enable Round 2
        </Tooltip>
    );

    return (
        <>
            <button className="w-40 btn btn-lg btn-primary me-2" type="submit">{ROUNDS[0]}</button>
            <OverlayTrigger placement="right" overlay={tooltip}>
                <span className="d-inline-block">
                    <button className="w-40 btn btn-lg btn-primary me-2" disabled={isRound2Enabled()} type="submit">{ROUNDS[1]}</button>
                </span>
            </OverlayTrigger>
        </>
    )
}

function Jeopardy() {
    const clue = useSelector(state => state.main.clue);
    const loader = useSelector(state => state.loader.loader);
    return (<>
        {
            loader &&
            <>
                <div className="overlay"></div>
                <div className="spinner"></div>
            </>
        }
        <Score />
        <div className="boardHolder">
            <ControlledTabsWithTooltip />
        </div>
        {<Card clue={clue} />}
        {/* <ControlledTabs /> */}
        {/* <Rounds /> */}
        {/* <RoundBody /> */}
    </>);
}

function RoundBody(props) {
    const [data, setData] = useState({ clues: [], categories: [] });
    // const [clue, setClue] = useState({});

    const dispatch = useDispatch();

    const handleClueClick = (event) => {
        let clue = data.clues[event.currentTarget.dataset.clueid];
        dispatch(setActiveClue(clue));

        event.target.classList.add("used");
        document.getElementById("cardCustom").style.left = '0';
    }

    useEffect(() => {
        dispatch(setLoader(true));
        const fetchData = async () => {
            const anAsyncFunction = async item => {
                return await axios(
                    `https://jservice.io/api/category?id=${item}`
                );
            }

            const getData = async () => {
                return Promise.all(CATEGORIES.map(category_id => anAsyncFunction(category_id)))
            }

            const data = await getData();

            dispatch(setLoader(false));

            const apiResponses = [];

            data.forEach(item => {
                apiResponses.push(item.data);
            });

            dispatch(setApiResponses(JSON.parse(JSON.stringify(apiResponses))));

            let clues = [], categories = [];

            apiResponses.forEach((result, categoryIndex) => {

                let category = {
                    title: result.title,
                    clues: []
                }

                result.clues.splice(0, 5).forEach((clue, index) => {
                    let clueId = categoryIndex + "-" + index;
                    category.clues.push(clueId);

                    clues[clueId] = {
                        question: clue.question,
                        answer: clue.answer,
                        value: (index + 1) * 100 * (Math.floor(Math.random() * 2) + 1)
                    };
                })

                categories.push(category);
            });

            setData({ clues, categories });
        };

        fetchData();
    }, []);

    return (
        <div>
            <div id="board" className="board">
                {
                    data.categories.map((category, index) => {
                        return (
                            <div key={index} className="column">
                                <header>{category.title}</header>
                                <ul>
                                    {
                                        category.clues.map(clueId => {
                                            let clue = data.clues[clueId];
                                            return (
                                                <li key={clueId}>
                                                    <button onClick={e => handleClueClick(e)} data-clueid={clueId}>
                                                        {clue.value}
                                                    </button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    })
                }

            </div>
            {/* <Card clue={clue} /> */}
        </div>
    );
}

export default Jeopardy;
