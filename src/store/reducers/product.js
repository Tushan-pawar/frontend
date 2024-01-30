const initialState= {list:[]}

const product = (state=initialState,action)=>{
  if(action.type === 'GET_LIST'){
    return{...state,list :action.payload}
  }  
      if(action.type === 'UPDATE_PRODUCT'){

        //destructure the action to read id and status
        const{id,status}= action.payload;
        //clone this object and update the status
        let productObj=state.list.find(p=>p.id===id);
        //delete object from list before readding
        let cloneObj= Object.assign({},productObj);
        cloneObj.featured=status
        //add updated object 
        let templist =state.list.filter(p=>p.id !==id)
        templist.push(cloneObj)
        return {...state,list:templist}
      }  




}
export default product;