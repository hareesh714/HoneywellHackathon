import { Component } from 'react';
import { Row, Col, Table, Modal, Button } from 'react-bootstrap';

class AdminComp extends Component {

    constructor() {
        super();
        this.state = {
            pendingOrders: [],
            isPendingDataLoaded: false,
            completeOrders: [],
            isCompleteDataLoaded: false,
            modalShow: false,
            fromAddress: '',
            toAddress: '',
            orderNumber: ''
        }
    }

    componentDidMount() {
        //Pending Orders
        fetch("https://run.mocky.io/v3/72f0f30f-42c8-479d-975c-799d959618f3")
            .then(response => response.json())
            .then(data => this.setState({ pendingOrders: data, isPendingDataLoaded: true }));
        //Completed Orders
        fetch("https://run.mocky.io/v3/72f0f30f-42c8-479d-975c-799d959618f3")
            .then(response => response.json())
            .then(data => this.setState({ completeOrders: data, isCompleteDataLoaded: true }));
    }


    modalClose = () => {
        this.setState({ modalShow: false});
    }

    modalSave = (event) => {
        var cartSweetNameId = event.target.value;
        var cartSweetSelectvalue = document.getElementById(cartSweetNameId).value;
        this.setState({ modalShow: false });
    }

    modalOpen  (from, to, ord)  {
        this.setState({ modalShow: true,
            fromAddress: from,
            toAddress: to,
            orderNumber: ord });
    }    


    render() {

        let pendingDeliData = this.state.pendingOrders;
        let completeDeliData = this.state.completeOrders;
        console.log('pendingDeliData: ', pendingDeliData);
        console.log('completeDeliData: ', completeDeliData);

        const pendingDelComp = pendingDeliData.map((sweet, i) => {
            return (
                <tr>
                    <td>{pendingDeliData[i].ordId}</td>
                    <td>{pendingDeliData[i].ordNumber}</td>
                    <td>{pendingDeliData[i].delAssigniee}</td>
                    <td><button onClick={() => this.modalOpen(pendingDeliData[i].from,pendingDeliData[i].to,pendingDeliData[i].ordNumber)}>Track Order</button></td>
                    <td>{pendingDeliData[i].from}</td>
                    <td>{pendingDeliData[i].to}</td>
                    <td>{pendingDeliData[i].traDist}</td>
                    <td>{pendingDeliData[i].startTime}</td>
                    <td>{pendingDeliData[i].ordTot}</td>
                    <td>10 mins</td>
                </tr>
            );
        }
        );

        const completeDelComp = completeDeliData.map((sweet, i) => {
            return (
                <tr>
                    <td>{completeDeliData[i].ordId}</td>
                    <td>{completeDeliData[i].ordNumber}</td>
                    <td>{completeDeliData[i].delAssigniee}</td>
                    <td>{completeDeliData[i].from}</td>
                    <td>{completeDeliData[i].to}</td>
                    <td>{completeDeliData[i].traDist}</td>
                    <td>{completeDeliData[i].startTime}</td>
                    <td>12:50AM</td>
                    <td>{completeDeliData[i].ordTot}</td>
                </tr>
            );

        }
        );

        return (
            <div>

                {
                    (!(this.state.isPendingDataLoaded && this.state.isCompleteDataLoaded))
                        ?
                        (
                            <div>
                                <p>Please wait while gathering all pending and completed deliveries.</p>
                                <img src="https://icons8.com/preloaders/preloaders/1495/Spinner-3.gif" />
                            </div>
                        )
                        :
                        (
                            <div className="admin-del-main">
                                <p>Hello Admin, Monitor the delayed orders on priority basis always.</p>
                                <b>Pending Orders:</b>
                                <div className="admin-del-row">
                                    <div className="admin-del-col-in">
                                        <div className="admin-del-col-in-text">
                                            <Table responsive size="sm" borderless>
                                                <tbody>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <th>Order Number</th>
                                                        <th>Delivery Person</th>
                                                        <th>Track</th>
                                                        <th>From Address</th>
                                                        <th>To Address</th>
                                                        <th>Total Distance</th>
                                                        <th>Start Time</th>
                                                        <th>Amount</th>
                                                        <th>Delay</th>
                                                    </tr>
                                                    {pendingDelComp}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <b>Completed Orders:</b>
                                <div className="admin-del-row">
                                    <div className="admin-del-col-in">
                                        <div className="admin-del-col-in-text">
                                            <Table responsive size="sm" borderless>
                                                <tbody>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <th>Order Number</th>
                                                        <th>Delivery Person</th>
                                                        <th>From Address</th>
                                                        <th>To Address</th>
                                                        <th>Total Distance</th>
                                                        <th>Start Time</th>
                                                        <th>Delivered Time</th>
                                                        <th>Amount</th>
                                                    </tr>
                                                    {completeDelComp}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

                <div className="modal-component-main">
                    <Modal aria-labelledby="contained-modal-title-vcenter" show={this.state.modalShow} onHide={this.modalHide} centered>
                        <Modal.Body>
                            <div className="admin-del-modal-order-text">
                                <b><i>Order Tracking details for </i>{this.state.orderNumber}</b>
                                </div>
                            <Row lg="2">
                                <Col>
                                <div>
                                <div className="admin-del-modal-address">
                                <div className="admin-del-modal-address-in">
                                    From Address:
                                    <p><b>{this.state.fromAddress}</b></p>

                                    To Address:
                                    <p><b>{this.state.toAddress}</b></p>
                                    </div>
                                    </div>
                                    </div>

                                </Col>
                                <Col>
                                    <img
                                        src="https://www.pngfind.com/pngs/m/141-1415175_person-icons-google-maps-location-map-png-transparent.png"
                                        width="200px"
                                        height="150px"
                                    />
                                    Under Development for API integration
                                </Col>
                            </Row>
                            <Button className="btn-sm" variant="secondary" onClick={this.modalClose}>
                                Close
                            </Button>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AdminComp;