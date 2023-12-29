import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { customerThunk } from './customerThunk'
import { sortByEmail, sortByFirstName, sortByID } from '@/app/utils/sortFunctions'

export type customerType = {
    id?: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    avatar?: string,
}

export type customerStateType = {
    customers: customerType[] | [],
    isLoadingAdd: boolean,
    errAdd?: string | null,
    isLoadingGet: boolean,
    errGet?: string | null,

}

const initialState: customerStateType = {
    customers: [],
    isLoadingAdd: false,
    errAdd: null,
    isLoadingGet: false,
    errGet: null
}



const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        // ----add customer-----
        addCustomer: (state, action: PayloadAction<customerType>) => {
            state.customers = [action.payload, ...state.customers];
        },
        // ----remove customer-----
        removeCustomer: (state, action: PayloadAction<customerType>) => {
            state.customers = state.customers.filter(item => item.id != action.payload.id);
        },
        // ----update customer-----
        updateCustomer: (state, action: PayloadAction<customerType>) => {
            state.customers = state.customers.map(item =>
                item.id == action.payload.id ?
                    action.payload : item
            );
        },
        // ----update customer-----
        sortCustomer: (state, action: PayloadAction<"id" | "email" | "name">) => {

            if (action.payload == "id")
                state.customers = sortByID(state.customers)
            if (action.payload == "email")
                state.customers = sortByEmail(state.customers)
            if (action.payload == "name")
                state.customers = sortByFirstName(state.customers)
        },

    },
    //login thunk
    extraReducers: customerThunk

})

export default customersSlice.reducer;

export const {
    updateCustomer, addCustomer, removeCustomer,
    sortCustomer
} = customersSlice.actions;

