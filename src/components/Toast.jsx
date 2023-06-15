
// export default Toast;
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toastReducer } from '../store/slices/InvoiceSliceReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
    const displayToast = useSelector((state) => state.displayToast);
    const dispatch = useDispatch();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(toastReducer(false))
    };

    return (
        <Snackbar open={displayToast} autoHideDuration={1000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: "100%" }}>
                invoice saved successfully
            </Alert>
        </Snackbar>
    );
}
