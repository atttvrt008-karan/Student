// import React, { Component, Fragment } from 'react'
// // import { findDOMNode } from 'react-dom';
// // import App from '../../App';
// import axios from 'axios';
// // import TabsUnstyled from '@mui/base/TabsUnstyled';
// // import TabsListUnstyled from '@mui/base/TabsListUnstyled';
// // import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
// // import TabUnstyled from '@mui/base/TabUnstyled';
// import { BrowserRouter as Router, Switch, 
//   Route, Redirect,} from "react-router-dom";

// var array = [];
// var status =0;
// var arrayindex = -1;
// var thiapp;
// var  rollnoindex; 
// var filter1;
// var dataSearch1;

// // var marklist = [];
// class Togle extends Component {
//   constructor() {
//     super()
//     // this.state = {}
//     this.state = {
//       firstName: "",
//       lastName: "",
//       rollno: "",
//       gender: "",
//       phoneno: "",
//       filter: "",
//       marklist: [],
//       readOnly :false,
//       filter1 :"",
//    }
//     //console.log(this);
//     // this.setPageNumber = this.setPageNumber.bind(this);
//     // this.handleSubmit = this.handleSubmit.bind(this)
//     // this.handleApiClick =this.handleApiClick.blind(this)
//   }

//   // state = {
//   //   divcontainer1: false,
//   //   divcontainer2: false,

//   // }



//   markhandler = (event) => {
//     var mark = event.target.value;


//     var  m = event.currentTarget.getAttribute("tag");
//     var cindex = event.currentTarget.getAttribute("mark");

//     var temparr = thiapp.state.marklist;
//     if (cindex == 1 && mark<=100)
//       temparr[m].mark1Value = parseInt(mark);
//     else if (cindex == 2 && mark<=100)

//       temparr[m].mark2Value = parseInt(mark);
//     else if (mark<=100)
//       temparr[m].mark3Value = parseInt(mark);

//     var totalmarks = parseInt(temparr[m].mark1Value + temparr[m].mark2Value + temparr[m].mark3Value);
//     //console.log(totalmarks);
//     temparr[m].totalmarks = totalmarks;
//     // console.log(thiapp.state.marklist);
//     this.setState({ 
     
//       mark1Value :"",
//       mark2Value:"",
//       mark3Value:"",
//       totalmarks:"",
    
    
//     });


//   }



//   selectChanged(event, i) {

//     const firstnameIndex = event.target.selectedIndex;
//     // console.log(firstnameIndex);
//     var a = event.currentTarget.getAttribute("tag");
//     // console.log(a);

//     const lastnameValue = array[firstnameIndex - 1].lastname;
//     const rollnoValue = array[firstnameIndex - 1].rollno;

//     const firstnameValue = array[firstnameIndex - 1].firstname;
  
//     const mark1Value ="";
//     const mark2Value ="";
//     const mark3Value ="";
//      const totalmarks="";
//     var temparr = thiapp.state.marklist;
    
//     temparr[a].lastnameValue = lastnameValue;
//     temparr[a].rollnoValue = rollnoValue;
//     temparr[a].firstnameValue = firstnameValue;
//     temparr[a].mark1Value =mark1Value;
//     temparr[a].mark2Value =mark2Value;
//     temparr[a].mark3Value =mark3Value;
//     temparr[a].totalmarks =totalmarks;
//   //   if(temparr.length>0)
//   //   {
//   //     if(firstnameValue.length>0 && lastnameValue.length>0 && rollnoValue.length >0 && temparr[a].mark1Value.length >0);
//   //     {
//   //     console.log(mark1Value);
//   //     mark=1;
//   //   }
//   // }
//      //  temparr[a].mark1Value=mark1Value;
//     //  temparr[a].mark2Value=mark2Value;
//     //  temparr[a].mark3Value=mark3Value;
//     //  temparr[a].totalmarks=totalmarks;

//     //  temparr=[0].rollnoValue=rollnoValue;
//     //   var r=findDOMNode(findDOMNode(event.currentTarget).parentNode).parentNode;
//     //   console.log(r);

//     // console.log(a);
//     //   var c=findDOMNode(r).childNodes[1];

//     //  console.log(findDOMNode(c).childNodes[0]);
//     // console.log(temparr[1])

//     thiapp.setState({
//     //  marklist: temparr,
//      mark1Value :"",
//       mark2Value:"",
//       mark3Value:"",
//       totalmarks:"",
//     }

//     )

//   }
   
 

 
//   searchTxt1(e) {
//     this.setState({ filter1: e.target.value });
//   }
//   addRow = function (event,index) {
//     var arr = thiapp.state.marklist;
//     if(arr.length == 0) {
//     arr.push({ firstnameValue: "", lastnameValue: "", rollnoValue: "", mark1Value: "", mark2Value: "", mark3Value: "", totalmarks: "" });
    
//    }
//    else if((arr.length > 0) && (arr[arr.length-1].totalmarks > 0) &&(arr[arr.length-1].firstnameValue >0) &&(arr[arr.length-1].firstnameValue >0) ) {
//     arr.push({ firstnameValue: "", lastnameValue: "", rollnoValue: "", mark1Value: "", mark2Value: "", mark3Value: "", totalmarks: "" });
//    }
  
 
//     // const firstnameValue = arr[index].firstnameValue;
//     // console.log(firstnameValue);

//     thiapp.setState({
//       // marklist: arr,
//       mark1Value: "",
//       mark2Value: "",
//       mark3Value: "",
//       totalmarks: "",
//       lastnameValue: "",
//       rollnoValue: "",
//       firstnameValue: ""
//     })




//   }
//   render() {
    
//     const handleDeleteClickml = (event, i) => {
//       var m = event.currentTarget.getAttribute("tag");

//       // console.log(m);
//       const marklist = thiapp.state.marklist;
//       // console.log(marklist);
//       // var m= event.currentTarget.getAttribute("tag"); 
//       marklist.splice(m, 1);

//       
//       // console.log(thiapp.state.marklist);
//     }
//     const _click =() => {

//       this.setState(prevState => ({readOnly: !prevState.readOnly}))
//    }
//     return (
     
     
      
//       <Fragment>
//         {/* <Router>
//         <Switch>
//        <TabsUnstyled >
//       <TabsListUnstyled>
//         <TabUnstyled>student Form</TabUnstyled>
//         <TabUnstyled>Table</TabUnstyled>
//         <TabUnstyled>Marklist Table</TabUnstyled>
//       </TabsListUnstyled>
//       <TabPanelUnstyled value={0}></TabPanelUnstyled>
     
     
//       <TabPanelUnstyled value={1}  > */}
    
//          <div>
//          <div>
     

    
//     </div>


// </div>
// {/* </TabPanelUnstyled>

//       <TabPanelUnstyled value={2}>  */}
//       <div>

// <label>search :</label><input type="text" value={filter1} onChange={this.searchTxt1.bind(this)} />

// </div>

//        <button type="button" className='buttonAdd' onClick={this.addRow} >
//               Add
//             </button>
//             <div>

//               <table >
//                 <thead>
//                   <tr>
//                     <th>FirstName</th>
//                     <th>LastName</th>
//                     <th>rollno</th>
//                     <th>Marks 1</th>
//                     <th>Marks 2</th>
//                     <th>Marks 3</th>
//                     <th> Total Marks</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>

//                 <tbody>
                 
//                   {
                   
//                     dataSearch1.map((item, i) => {
//                       return (

//                         <tr key={i} >

//                           <td>   <select  isClearable={true} tag={i} onChange={this.selectChanged} value={item.firstnameValue}>
                        
//                             <option>Select First Name</option>

//                             {array.map((option) => (

//                               <option >

//                                 {option.firstname}

//                               </option>

//                             ))}

//                           </select></td>
//                           <td ><input type="text" value={item.lastnameValue} /></td>
//                           <td><input type="number" value={item.rollnoValue} /></td>
//                           <td ><input tag={i} type="number" mark={1} readOnly={this.state.readOnly}  value={item.mark1Value} onChange={this.markhandler} /></td>
//                           <td ><input tag={i} type="number" mark={2} value={item.mark2Value}readOnly={this.state.readOnly} onChange={this.markhandler} /></td>
//                           <td ><input tag={i} type="number" mark={3} value={item.mark3Value} readOnly={this.state.readOnly} onChange={this.markhandler} /></td>
//                           <td><input tag={i} type="number" value={item.totalmarks} /></td>
//                           <td><button tag={i} className='buttonEdit' onClick={_click}>
//                           {this.state.readOnly ? 'Edit' : 'Save'}
//                             </button>
//                          <button tag={i} className='buttonDelete' onClick={handleDeleteClickml}>
//                             Delete</button></td>
//                         </tr>

//                       )
//                     })
//                   }
                  
//                 </tbody>
//               </table>

//             </div>
//             {/* </TabPanelUnstyled>
//             </TabsUnstyled>
//             </Switch>
//          </Router> */}
//         </Fragment>

//     )
//   }

// }
// export default Togle;
