import { createSlice } from "@reduxjs/toolkit";
const InvoiceSlice = createSlice({
    name: 'invoiceSlice',
    // for now im not making initialState state as an array but i believe this state must be kept inside an array  
    initialState:
    {
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
    }
    ,
    reducers: {
        add: (state, action) => {
            // state.push()
            const { key, value } = action.payload;
            state[key] = value;
        },
        checkCurrency: (state,action)=>{
            const { key, value } = action.payload;
            state[key]= value;
        },
        editFieldReducer:(state,action)=>{
            const {name,value}=action.payload;
            state[name]= value;

        },

        
        itemizedItemEditReducer:(state,action)=>{
            const {updatedItems}=action.payload;
            state['items']=updatedItems;
            
        },
        rowAddReducer:(state,action)=>{
            const {items} = action.payload;
            state['items']=items;
        },
        
        rowDeleteReducer:(state,action)=>{
            const {updatedItems}=action.payload;
            state['items']=updatedItems;
        },
        
        calculateTotalReducer:(state,action)=>{
            const {subTotal,taxAmount,discountAmount,total}=action.payload;
            state.subTotal = subTotal;
            state.taxAmount = taxAmount;
            state.discountAmount = discountAmount;
            state.total = total;

        }
    }
})
export const { add,checkCurrency,editFieldReducer ,rowDeleteReducer,itemizedItemEditReducer ,rowAddReducer,calculateTotalReducer} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;