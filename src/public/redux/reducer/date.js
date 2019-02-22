const initialState ={
    detail: []
}

const date = (state= initialState, action)=>{
    switch (action.type){
        case "ADDDATE":
         return{
             ...state,
            detail: [...state.detail, action.payload]
         }
         default: 
         return state;
    }
}

export default date;