import {createSlice} from "@reduxjs/toolkit"

const initialState = null
const editTaskSlice = createSlice({
    name:"Task",
    initialState,
    reducers: {
        addEditTask:(_state, action)=>{
            return action.payload
        },
        removeEditTask:() =>{
            return null
        }
    }
})

export const {addEditTask, removeEditTask} = editTaskSlice.actions
export default editTaskSlice.reducer

