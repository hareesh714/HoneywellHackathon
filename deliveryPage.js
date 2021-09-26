import { Component } from 'react';
import { Row, Col, Table, Modal, Button } from 'react-bootstrap';

class DeliveryComp extends Component {

    constructor() {
        super();
        this.state = {
            delData: [],
            isDelDataLoaded: false,
            pastData: [],
            ispastlDataLoaded: false
        }
    }

    componentDidMount() {
        // current delivery Data
        fetch("https://run.mocky.io/v3/2fd4cbf4-90bf-4f04-b8bd-19c90a182aca")
            .then(response => response.json())
            .then(data => this.setState({ delData: data, isDelDataLoaded: true }));
        // past delivery Data
        fetch("https://run.mocky.io/v3/9dae40cf-59ac-4af2-bbc6-dbc77fe0512d")
            .then(response => response.json())
            .then(data => this.setState({ pastData: data, ispastlDataLoaded: true }));            
    }

    render() {

        let pastDeliData = this.state.pastData;

        const pastDelComp = pastDeliData.map((sweet, i) => {
            return (
                <tr>
                    <td>{pastDeliData[i].ordId}</td>
                    <td>{pastDeliData[i].from}</td>
                    <td>{pastDeliData[i].to}</td>
                    <td>{pastDeliData[i].traDist}</td>
                    <td>{pastDeliData[i].startTime}</td>
                    <td>{pastDeliData[i].deliveredTime}</td>
                    <td>{pastDeliData[i].delay}</td>
                </tr>
            );
        }
        );

        return (
            <div>
                {(!(this.state.isDelDataLoaded && this.state.ispastlDataLoaded))
                    ?
                    (
                        <div>
                            <p>Please wait while gathering all details about your deliveries.</p>
                            <img src="https://icons8.com/preloaders/preloaders/1495/Spinner-3.gif" />
                        </div>
                    )
                    : (
                        <div>
                            <p>Hello {this.state.delData[0].delAssigniee}, make sure to deliver the product safely.
                                Inform support on 040-9999999 incase any difficulties in delivering the product on time.</p>
                                <div className="del-main-data">

                            <Row>
                                <Col lg="6">
                                <div className="del-current-data bgc-green">
                                <div className="del-current-data-in">
                                    <b>Current assigned delivery</b>
                                    <Table responsive size="sm" borderless>
                                    <tr>
                                            <td>Order No</td>
                                            <td>{this.state.delData[0].ordNumber}</td>
                                        </tr>                                        
                                        <tr>
                                            <td>From Address</td>
                                            <td>{this.state.delData[0].from}</td>
                                        </tr>
                                        <tr>
                                            <td>To Address</td>
                                            <td>{this.state.delData[0].to}</td>
                                        </tr>
                                        <tr>
                                            <td>Distance</td>
                                            <td>{this.state.delData[0].traDist} KM</td>
                                        </tr>
                                        <tr>
                                            <td>Estimated Time</td>
                                            <td>{this.state.delData[0].estimateTime}</td>
                                        </tr>
                                    </Table>
                                    </div>
                                    </div>
                                </Col>
                                <Col lg="2">
                                    <div className="bgc-green">
                                    <b>Total deliveries till date</b>
                                    <p className="del-current-num">{this.state.delData[0].totalDel}</p>
                                    </div>
                                </Col>
                                <Col lg="2">
                                <div className="bgc-green">
                                    <b>otal ratings</b>
                                    <p className="del-current-num">{this.state.delData[0].totalRating}</p>
                                    </div>
                                </Col>
                                <Col lg="2">
                                <div className="bgc-green">
                                    <b>5 star ratings</b>
                                    <p className="del-current-num">{this.state.delData[0].total5Rating}</p>
                                    </div>
                                </Col>
                            </Row>
                            </div>

                            <div className="admin-del-row">
                                    <div className="admin-del-col-in">
                                        <div className="admin-del-col-in-text">
                                            <Table responsive size="sm" borderless>
                                                <tbody>
                                                    <tr>
                                                        <th>Order Number</th>
                                                        <th>From Address</th>
                                                        <th>To Address</th>
                                                        <th>Total Distance</th>
                                                        <th>Start Time</th>
                                                        <th>Delivered Time</th>
                                                        <th>Delay</th>
                                                    </tr>
                                                    {pastDelComp}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>                            

                        </div>)
                }
            </div>
        );
    }

}

export default DeliveryComp;