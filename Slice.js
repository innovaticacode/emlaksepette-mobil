import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
    name:'counter',
    initialState:{
        count:0
    },
    reducers:{
        increase(state){
            state.count++
        },
        decrease(state){
            state.count--
        },
        sıfırla(state){
            state.count = 0
        }
    }
})
export default Slice;
export const {increase,decrease,sıfırla} =Slice.actions