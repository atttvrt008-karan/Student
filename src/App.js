import './App.css';
// import Switch from "react-switch";
import Routes from './router'
import Details from './components/Details'
// import store from './router/store';
// import { BrowserRouter } from 'react-router-dom' 
// import store from './components/app/store';
import {BrowserRouter as HashRouter, Switch ,Route } from 'react-router-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

const initialUserState = {
  firstName:"",
  lastName:"",
  rollNo:"",
  gender:"",
  phoneNo:"",
  image:"",
}

const userReducer = (state=initialUserState,action)=>{

  // if(action.type==="SET_NAME"){
  //   return {...state,firstName:"karan",lastName:"c",rollNo:"19",gender:"Male",phoneNo:"8012261027"}
  // }
      
  
  if(action.type==="SET_LASTNAME"){

    
    return{state,firstName:action.state.firstName,lastName:action.state.lastName,rollNo:action.state.rollNo,gender:action.state.gender,phoneNo:action.state.phoneNo,image:action.state.image}
  }
  //   return {state, user: action.state}
  // }

  return state
}

const reducers = combineReducers({
  user:userReducer
})

const store = createStore(reducers)


store.subscribe(()=>{
  console.log(store.getState(),"$$$$");
})

function App() {

  return (

    <div>

      <HashRouter>

      <div className="App">
      <Provider store={store}>
        <Switch>

          {

            Routes.map((item, index) => {

              return <Route key={'route_' + index}

              path={item.path}

              component={item.component}

              exact={item.exact || false}

              />

            })

          }

        </Switch>
        </Provider>
      </div>



      </HashRouter>

    </div>

  );

}



export default App;
