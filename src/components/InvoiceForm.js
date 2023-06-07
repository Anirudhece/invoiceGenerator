import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

const InvoiceForm = () => {
    const [invoiceData, setInvoiceData] = useState({
        isOpen: false,
        currency: '$',
        currentDate: '',
        invoiceNumber: 1,
        dateOfIssue: '',
        billTo: '',
        billToEmail: '',
        billToAddress: '',
        billFrom: '',
        billFromEmail: '',
        billFromAddress: '',
        notes: '',
        total: '0.00',
        subTotal: '0.00',
        taxRate: '',
        taxAmount: '0.00',
        discountRate: '',
        discountAmount: '0.00',
        items: [
            {
                id: 0,
                name: '',
                description: '',
                price: '1.00',
                quantity: 1
            }
        ]
    });

    useEffect(() => {
        handleCalculateTotal();
    }, []);

    const handleRowDel = (item) => {
        const updatedItems = invoiceData.items.filter((i) => i.id !== item.id);
        setInvoiceData({...invoiceData, items: updatedItems});
    };

    const handleAddEvent = () => {
        const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        const newItem = {
            id: id,
            name: '',
            price: '1.00',
            description: '',
            quantity: 1
        };
        setInvoiceData({...invoiceData, items: [...invoiceData.items, newItem]});
    };

    const handleCalculateTotal = () => {
        const {items, taxRate, discountRate} = invoiceData;
        let subTotal = 0;

        items.forEach((item) => {
            subTotal += parseFloat(item.price) * parseInt(item.quantity);
        });
        const taxAmount = (subTotal * (taxRate / 100)).toFixed(2);
        const discountAmount = (subTotal * (discountRate / 100)).toFixed(2);
        const total = (subTotal - discountAmount + parseFloat(taxAmount)).toFixed(2);

        setInvoiceData({
            ...invoiceData,
            subTotal: subTotal.toFixed(2),
            taxAmount,
            discountAmount,
            total
        });
    };

    const onItemizedItemEdit = (event) => {
        const {id, name, value} = event.target;
        const updatedItems = invoiceData.items.map((item) => {
            if (item.id === id) {
                return {...item, [name]: value};
            }
            return item;
        });

        setInvoiceData({...invoiceData, items: updatedItems});
        handleCalculateTotal();
    };

    const editField = (event) => {
        const {name, value} = event.target;
        setInvoiceData({...invoiceData, [name]: value});
        handleCalculateTotal();
    };

    const onCurrencyChange = (event) => {
        setInvoiceData({...invoiceData, currency: event.target.value});
    };

    const openModal = (event) => {
        event.preventDefault();
        handleCalculateTotal();
        setInvoiceData({...invoiceData, isOpen: true});
    }

    const closeModal = () => {
        setInvoiceData({...invoiceData, isOpen: false});
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Handle form submission logic here
    //     // You can access the complete invoice data using the invoiceData object
    // };

    return (
        <Form onSubmit={openModal}>
            <Row>
                <Col md={8} lg={9}>
                    <Card className="p-4 p-xl-5 my-3 my-xl-4">
                        <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                            <div class="d-flex flex-column">
                                <div className="d-flex flex-column">
                                    <div class="mb-2">
                                        <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                        <span className="current-date">{new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center">
                                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                                    <Form.Control type="date" value={invoiceData.dateOfIssue} name={"dateOfIssue"}
                                                  onChange={(event) => editField(event)} style={{
                                        maxWidth: '150px'
                                    }} required={true}/>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                                <Form.Control type="number" value={invoiceData.invoiceNumber} name={"invoiceNumber"}
                                              onChange={(event) => editField(event)} min="1" style={{
                                    maxWidth: '70px'
                                }} required={true}/>
                            </div>
                        </div>
                        <hr className="my-4"/>
                        <Row className="mb-5">
                            <Col>
                                <Form.Label className="fw-bold">Bill to:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice to?"} rows={3} value={invoiceData.billTo}
                                              type="text" name="billTo" className="my-2"
                                              onChange={(event) => editField(event)} autoComplete="name"
                                              required={true}/>
                                <Form.Control placeholder={"Email address"} value={invoiceData.billToEmail} type="email"
                                              name="billToEmail" className="my-2"
                                              onChange={(event) => editField(event)} autoComplete="email"
                                              required={true}/>
                                <Form.Control placeholder={"Billing address"} value={invoiceData.billToAddress}
                                              type="text" name="billToAddress" className="my-2" autoComplete="address"
                                              onChange={(event) => editField(event)} required={true}/>
                            </Col>
                            <Col>
                                <Form.Label className="fw-bold">Bill from:</Form.Label>
                                <Form.Control placeholder={"Who is this invoice from?"} rows={3}
                                              value={invoiceData.billFrom} type="text" name="billFrom" className="my-2"
                                              onChange={(event) => editField(event)} autoComplete="name"
                                              required={true}/>
                                <Form.Control placeholder={"Email address"} value={invoiceData.billFromEmail}
                                              type="email" name="billFromEmail" className="my-2"
                                              onChange={(event) => editField(event)} autoComplete="email"
                                              required={true}/>
                                <Form.Control placeholder={"Billing address"} value={invoiceData.billFromAddress}
                                              type="text" name="billFromAddress" className="my-2" autoComplete="address"
                                              onChange={(event) => editField(event)} required={true}/>
                            </Col>
                        </Row>
                        <InvoiceItem onItemizedItemEdit={onItemizedItemEdit}
                                     onRowAdd={handleAddEvent} onRowDel={handleRowDel}
                                     currency={invoiceData.currency} items={invoiceData.items}/>
                        <Row className="mt-4 justify-content-end">
                            <Col lg={6}>
                                <div className="d-flex flex-row align-items-start justify-content-between">
              <span className="fw-bold">Subtotal:
              </span>
                                    <span>{invoiceData.currency}
                                        {invoiceData.subTotal}</span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Discount:</span>
                                    <span>
                <span className="small ">({invoiceData.discountRate || 0}%)</span>
                                        {invoiceData.currency}
                                        {invoiceData.discountAmmount || 0}</span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
              <span className="fw-bold">Tax:
              </span>
                                    <span>
                <span className="small ">({invoiceData.taxRate || 0}%)</span>
                                        {invoiceData.currency}
                                        {invoiceData.taxAmmount || 0}</span>
                                </div>
                                <hr/>
                                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                                    fontSize: '1.125rem'
                                }}>
              <span className="fw-bold">Total:
              </span>
                                    <span className="fw-bold">{invoiceData.currency}
                                        {invoiceData.total || 0}</span>
                                </div>
                            </Col>
                        </Row>
                        <hr className="my-4"/>
                        <Form.Label className="fw-bold">Notes:</Form.Label>
                        <Form.Control placeholder="Thanks for your business!" name="notes" value={invoiceData.notes}
                                      onChange={(event) => editField(event)} as="textarea" className="my-2"
                                      rows={1}/>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <div className="sticky-top pt-md-3 pt-xl-4">
                        <Button variant="primary" type="submit" className="d-block w-100">Review Invoice</Button>
                        <InvoiceModal showModal={invoiceData.isOpen} closeModal={closeModal} info={invoiceData}
                                      items={invoiceData.items} currency={invoiceData.currency}
                                      subTotal={invoiceData.subTotal} taxAmmount={invoiceData.taxAmmount}
                                      discountAmmount={invoiceData.discountAmmount} total={invoiceData.total}/>
                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Currency:</Form.Label>
                            <Form.Select onChange={event => onCurrencyChange({currency: event.target.value})}
                                         className="btn btn-light my-1" aria-label="Change Currency">
                                <option value="$">USD (United States Dollar)</option>
                                <option value="£">GBP (British Pound Sterling)</option>
                                <option value="¥">JPY (Japanese Yen)</option>
                                <option value="$">CAD (Canadian Dollar)</option>
                                <option value="$">AUD (Australian Dollar)</option>
                                <option value="$">SGD (Signapore Dollar)</option>
                                <option value="¥">CNY (Chinese Renminbi)</option>
                                <option value="₿">BTC (Bitcoin)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Tax rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="taxRate" type="number" value={invoiceData.taxRate}
                                              onChange={(event) => editField(event)} className="bg-white border"
                                              placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="my-3">
                            <Form.Label className="fw-bold">Discount rate:</Form.Label>
                            <InputGroup className="my-1 flex-nowrap">
                                <Form.Control name="discountRate" type="number" value={invoiceData.discountRate}
                                              onChange={(event) => editField(event)} className="bg-white border"
                                              placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                                    %
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Form>
    )
}

export default InvoiceForm;

