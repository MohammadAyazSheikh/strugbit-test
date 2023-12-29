import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { getApi, postApi } from '../../../utils/api/api';
import { customerStateType } from './customerSlice';








export const getCustomers = createAsyncThunk("customers/get", () => {
    return getApi("https://reqres.in/api/users?page=1")
});


export const customerThunk = (builder: ActionReducerMapBuilder<customerStateType>) => {

    // ---------------get customer thunk--------------
    //if  loading
    builder.addCase(
        getCustomers.pending,
        state => {
            state.isLoadingGet = true;
        })
    //if  success
    builder.addCase(
        getCustomers.fulfilled,
        (state, action) => {
            console.log("Get Customers Response ✅:", JSON.stringify(action.payload, null, 2));
            state.isLoadingGet = false;

            if (action.payload.data) {
                state.errGet = null;
                state.customers = action.payload?.data;
            }
            else {
                state.errGet = action.payload?.message || "something went wrong 👀";
                alert(state.errGet);
            }
        }
    );
    //if   failed
    builder.addCase(
        getCustomers.rejected,
        (state, action) => {
            console.error("Get customer Error ❌:", action.error.message)
            state.isLoadingGet = false;
            state.errGet = action.error.message! || "something went wrong 👀";
            alert(state.errGet);
        }
    )
}

