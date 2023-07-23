import { createSlice } from "@reduxjs/toolkit";
const InvoiceSlice = createSlice({
  name: "invoiceSlice",
  initialState: {
    invoices: [
      {
        id: "",
        isOpen: false,
        currency: "$",
        currentDate: "",
        invoiceNumber: 1,
        dateOfIssue: "",
        billTo: "",
        billToEmail: "",
        billToAddress: "",
        billFrom: "",
        billFromEmail: "",
        billFromAddress: "",
        notes: "",
        total: "0.00",
        subTotal: "0.00",
        taxRate: "",
        taxAmount: "0.00",
        discountRate: "",
        discountAmount: "0.00",
        items: [
          {
            id: 0,
            name: "",
            description: "",
            price: "1.00",
            quantity: 1,
          },
        ],
      },
    ],
    invoiceCount: 0,
  },

  reducers: {
    checkCurrency: (state, action) => {
      const { key, value } = action.payload;
      state.invoices[state.invoiceCount][key] = value;
    },

    editFieldReducer: (state, action) => {
      const { name, value } = action.payload;
      state.invoices[state.invoiceCount][name] = value;
    },

    itemizedItemEditReducer: (state, action) => {
      const { updatedItems } = action.payload;
      state.invoices[state.invoiceCount]["items"] = updatedItems;
    },
    rowAddReducer: (state, action) => {
      const { items } = action.payload;
      state.invoices[state.invoiceCount]["items"] = items;
    },

    rowDeleteReducer: (state, action) => {
      const { updatedItems } = action.payload;
      state.invoices[state.invoiceCount]["items"] = updatedItems;
    },

    calculateTotalReducer: (state, action) => {
      const { subTotal, taxAmount, discountAmount, total } = action.payload;
      state.invoices[state.invoiceCount].subTotal = subTotal;
      state.invoices[state.invoiceCount].taxAmount = taxAmount;
      state.invoices[state.invoiceCount].discountAmount = discountAmount;
      state.invoices[state.invoiceCount].total = total;
    },

    modalReducer: (state, action) => {
      state.invoices[state.invoiceCount].isOpen = action.payload.isOpen;
    },

    saveInvoiceReducer: (state, action) => {
      // pass id
      state.invoices[state.invoiceCount]["id"] = Date.now();

      const currentInvoice = state.invoices[state.invoiceCount];

      // copied array push
      state.invoices.push(currentInvoice);

      state.invoiceCount++;

      state.invoices[state.invoiceCount] = { ...state.invoices[0] };
    },
  },
});
export const {
  checkCurrency,
  editFieldReducer,
  rowDeleteReducer,
  itemizedItemEditReducer,
  rowAddReducer,
  calculateTotalReducer,
  modalReducer,
  saveInvoiceReducer
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
