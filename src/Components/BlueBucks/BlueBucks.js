import React from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import HeaderLogo from "../Images/topLogoBar.png";
import { DeskFooter } from "../DeskFooter/DeskFooter";
import { fName, blueBucks  } from "../LocalUser/LocalUser";
import './BlueBucks.css';

export function BlueBucks() {
    let bb_table = []; 

    for (let i in blueBucks) {
        let date = JSON.stringify(blueBucks[i].date);
        let newDate = `${date.slice(6, 8)}/${date.slice(9, 11)}/${date.slice(1, 5)}`;
        bb_table.push(
            <tr style={{ textAlign: "center" }}>
                <td>{blueBucks[i].transactionType}</td>
                <td>{blueBucks[i].amount}</td>
                <td>{newDate}</td>
            </tr>
        );
    }

    // posting No Service Info for users with no services
    if (bb_table.length === 0) {
        bb_table.push(
        <tr style={{ fontSize: "11px", textAlign: "center" }}>
            <td colspan="3">No Blue Bucks</td>
        </tr>
    );
  }

    // Calculation for the Current Balance
    let earned = 0;
    let redeemed = 0;
    for (let i in blueBucks) {
        if (blueBucks[i].transactionType === "Earned") {
            earned += blueBucks[i].amount;
        } else {
            redeemed += blueBucks[i].amount;
        }
    }

    let currentBalance = earned - redeemed;

    return (
        <>
            <BrowserView>
                <BrowserNavBar active="blueBucks" />

                <Card className="border-0 w-100 mx-auto">
                    <Card.Header
                        className="d-flex justify-content-center align-items-center mb-4 border-0"
                        id="cardh"
                    >
                        {fName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body className="mx-auto w-50">
                        <Card.Title id="ctitle">
                            Current Balance: <strong>{currentBalance}</strong>
                        </Card.Title>
                        <div class="tableFixHead">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="tbdy">
                                {bb_table}
                            </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    <Card.Text
                        className="text-center mr-3 ml-3 mb-1 mt-3"
                        id="earned"
                    >
                        Blue Bucks are earned through special promotions and upon payment of
                        services and can be redeemed for future service discounts.
                    </Card.Text>
                    <DeskFooter />
                </Card>
            </BrowserView>

            <MobileView>
                <Image
                    src={HeaderLogo}
                    className="d-flex w-100 mx-auto justify-content-center"
                />

                <Card className="border-0" id="mcrd">
                    <Card.Header
                        className="d-flex justify-content-center align-items-center text-white"
                        id="mchead"
                    >
                        {fName}'s Blue Bucks History
                    </Card.Header>

                    <Card.Body id="crdbody">
                        <Card.Title id="ctitle">
                            Current Balance: <strong>{currentBalance}</strong>
                        </Card.Title>
                        <div class="tableFixHead">
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Transaction Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="tbdy">
                                {bb_table}
                            </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    <Card.Text
                        className="text-center mr-3 ml-3 mb-1"
                        id="earned"
                    >
                        Blue Bucks are earned through special promotions and upon payment of
                        services and can be redeemed for future service discounts.
                    </Card.Text>
                </Card>

                <MobileNavBar active ="blueBucks"  />
            </MobileView>
        </>
    );
}