import {createSlice} from "@reduxjs/toolkit"

const initialState = null
const userSlice = createSlice({
    name:"User",
    initialState,
    reducers: {
        addAuthUser:(_state, action)=>{
            return action.payload
        },
        removeAuthUser:() =>{
            return null
        }
    }
})

export const {addAuthUser, removeAuthUser} = userSlice.actions
export default userSlice.reducer

