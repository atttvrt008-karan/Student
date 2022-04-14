import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Switch, 
    Route, Redirect,} from "react-router-dom";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';


var array = [];
var arrayindex = -1;
var thiapp;
var  rollnoindex; 
var base;

    class Details extends Component {
        constructor(props) {
          super(props)
         
          this.state = {
            firstName: "",
            lastName: "",
            rollno: "",
            gender: "",
            phoneno: "",
            filter: "",
            marklist: [],
            readOnly :false,
            filter1 :"",
            firstname1:"",
            lastname1:"",
            rollno1:"",
            gender:"",
            phoneno1:"",
            image :"",
            file: null,
            base64URL: "",
         }
         console.log(this.state.readOnly);
         this.searchTxt = this.searchTxt.bind(this)
        //  this.setLastname = this.setLastname.bind(this)
        }
        firsthandler = (event) => {
          this.setState({
            firstname1: event.target.value
          })
        }
        lasthandler = (event) => {
          this.setState({
            lastname1: event.target.value
          })
        }
        rollnohandler = (event) => {
          this.setState({
            rollno1: event.target.value
          })
        }
      
        genderhandler = (event) => {
          this.setState({
            gender1: event.target.value
          })
        }
        phonenumberhandler = (event) => {
          this.setState({
            phoneno1: event.target.value
          })
        }
        searchTxt(e) {
            this.setState({ filter: e.target.value });
          }
          getBase64 = file => {
            return new Promise(resolve => {
              let fileInfo;
              let baseURL = "";
              // Make new FileReader
              let reader = new FileReader();
        
              // Convert the file to base64 text
              reader.readAsDataURL(file);
        
              // on reader load somthing...
              reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
              };
              console.log(fileInfo);
            });
          };
          handleFileInputChange = e => {
            console.log(e.target.files[0]);
            let { file } = this.state;
        
            file = e.target.files[0];
        
            this.getBase64(file)
              .then(result => {
                base =result;
               console.log(result);
                file["base64"] = result;
                console.log("File Is", file);
                this.setState({
                  base64URL: result,
                  file
                });
              })
              .catch(err => {
                console.log(err);
              });
        
            // this.setState({
             
              this.setState({
                file: e.target.files[0],
                image: URL.createObjectURL(e.target.files[0])
              });
            // });
          };
        handleApiClick =() => {
          // alert("1")
          // axios.get("https://192.168.131.170:5001/api/students/rollno")
           axios.get("https://localhost:5001/api/students/rollno")
           .then((response) =>      
         
             { console.log(response); 
                 array=response.data;
                 console.log(array);
                 this.setState({
                  response:array
                 })
         
         })
         }
        componentWillMount() {
          this.handleApiClick()
         
        }
      

          render() {
  //           const location = useLocation();
  // const state = location.state;
  // console.log(state);
  // const [firstFocus, setFirstFocus] = React.useState(false);
  // const [lastFocus, setLastFocus] = React.useState(false);
            thiapp = this;

            let filter = this.state.filter;
            var dataSearch = array.filter(item => {
              return Object.keys(item).some(key =>
                item["firstname"].toLowerCase().includes(filter.toLowerCase())) ||
                item["rollno"]
                  .toString()
                  .toLowerCase()
                  .includes(filter.toLowerCase())
            });
            
            
            // }
            // else
            // {
            //   alert("Not found");
            // }
            // var handleChange1 = e => {
            //   this.setState({ divcontainer1: !this.state.divcontainer1 });
        
            // }
            // const x = this.state.divcontainer1;
            // console.log(x);
            // var handleChange2 = e => {
            //   this.setState({ divcontainer2: !this.state.divcontainer2 });
            // }
            // const y = this.state.divcontainer2;
            //console.log(y);
            const handleDeleteClick = (index,event) => {
              // event.preventDefault();
             const rollno= array[index].rollno
            //  axios.delete("https://192.168.131.170:5001/api/students/Delete/"+rollno)
            axios.delete("https://localhost:5001/api/students/Delete/"+rollno)
          .then(res => {
            
             if(res.data==1)
             {
              array.splice(index, 1);
        
              this.setState({ index: array });
          }
          })
           
            // console.log(rollno);
            // }
          
            // console.log(res.data));
           
        
            }
         
       
            //    const history = useHistory();
        
          
              const  handleEditClick =(item,index) => {
              // status=1;
              // item ={item}.rollno;  
               rollnoindex= array[index].rollno  
              // console.log(item);
              // // arrayindex= array[index];
              // console.log(index);
              console.log(rollnoindex)
              arrayindex=index;
              this.setState({
                firstname1: item.firstname,
                lastname1: item.lastname,
                rollno1: item.rollno,
                gender1: item.gender,
                phoneno1: item.phoneno,
                image:item.image
              })
              thiapp.props.setLastname(item)
              
            } 

            const handleSaveClick =() => {
              alert("1");
              const student = {
                firstname : this.state.firstname1,
                lastname : this.state.lastname1,
                 rollno : this.state.rollno1,
                gender :this.state.gender1,
                phoneno : this.state.phoneno1,

               };
               console.log(student);
              var firstName = this.state.firstname1;
             var lastName = this.state.lastname1;
             var rollno = this.state.rollno1;
            var gender =this.state.gender1;
            var phoneno = this.state.phoneno1;
        
          console.log(rollno);
          const image ={
            rollno : this.state.rollno1,
            image :base,
          }
          console.log(image);
      axios.put("https://localhost:5001/api/students/Edit/"+rollno ,{"student":[student],"image":image})
      // axios.put("https://192.168.131.170:5001/api/students/Edit/"+rollno ,student)
      .then(res => {
        this.setState({item: res.data});
      
       })
     
       array.splice(arrayindex, 1 , { "firstname": firstName, "lastname": lastName, "rollno": rollno, "gender": gender, "phoneno": phoneno })
       arrayindex = -1;
       this.setState({
        firstname1: "",
        lastname1: "",
        rollno1: "",
        gender1: "",
        phoneno1: "",
       
      })
     
   
            }
             const click =() => {
              this.props.history.push('/Registration' 
              );
            }
            const click1 =() => {
              this.props.history.push('/Marklist');
            }
               
               
               
              
              // //console.log(arrayindex);
             
              // //console.log(arrayindex);
        
              // // this.setState({
              // //   firstName: item.firstname,
              // //   lastName: item.lastname,
              // //   rollno: item.rollno,
              // //   gender: item.gender,
              // //   phoneno: item.phoneno,
              // // })
              // }
                
            
             
              
            //   //  console.log(student1)
               
            //   // .then(res => {
                
            //   //   // if(res.data==1)
            //   //   // {
            //   // })
        
              
        
            // }
          //   const _click =() => {
            
          //     this.setState(prevState => ({readOnly: !prevState.readOnly}))
          //     console.log(this.state.readOnly);
          //  }

            return (
        
              <div>
                <button onClick={()=> click()}>form</button>
               <button onClick={()=> click1()}>Marklist</button>
   
             <label>search :</label><input type="text" value={filter} onChange={this.searchTxt}  /> <div> 
{/* <button type="button"  onClick={() => handleApiClick()} >
                  API
                </button> */}
                 </div>
                { 
        (dataSearch.length >0)
          ? <div> search for {filter} </div> 
          : <div> Not found {filter} </div> 
      }


<div >
  <center>

    <table >
      <thead>
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>rollno</th>
          <th>Gender</th>
          <th>phoneno</th>
          <th>photo</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr> 
          <td><input type="text" value={this.state.firstname1}onChange={this.firsthandler} /> </td>
          <td><input type="text" value={this.state.lastname1}onChange={this.lasthandler} /> </td>
          <td><input type="text" value={this.state.rollno1}onChange={this.rollnohandler} /> </td>
          <td><input type="text" value={this.state.gender1}onChange={this.genderhandler}/> </td>
          <td><input type="text" value={this.state.phoneno1}onChange={this.phonenumberhandler} /> </td>
          <td>   <input type="file" onChange={this.handleFileInputChange} />  <img  src={this.state.image}/> </td>

          <td>  <button type="button" className='buttonDelete' 
          // onClick={() => handleSaveClick()}
           >
                Save 
                </button></td>

        </tr>
        {dataSearch.length > 0 ? (
        dataSearch.map((item, index) => {
          return (
            
            <tr key={index}>
              <td>{item.firstname} </td>
              <td>{item.lastname}  </td>
              <td>{item.rollno}</td>
              <td>{item.gender}</td>
              <td>{item.phoneno}</td> 
              <td><img src={item.image}/> </td>
              <td>
                
              <button
                  type="button" className='buttonEdit'
                  onClick={() =>handleEditClick(item, index)}>
                  Edit
                </button>
           
                <button type="button" className='buttonDelete' onClick={() => handleDeleteClick(index)}>
                  Delete
                </button>
              </td>

            </tr>
            
        )
          })
           ):(
          
            array.map((item, index) => {
              
            return (
             
           
            
              <tr key={index}>
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.rollno}</td>
              <td>{item.gender}</td>
              <td>{item.phoneno}</td>
              <td><img src={item.image}/></td>
              <td> <button
                  type="button" className='buttonEdit'
                  onClick={() =>  handleEditClick(item, index)}>
                  Edit
                </button>
            
            
                <button type="button" className='buttonDelete' onClick={() => handleDeleteClick(index)}>
                  Delete
                </button>
              </td>

            </tr>
         
        )
          })
            
          
           ) }
  

      </tbody>
    </table>

  </center>
  <br />
  <br />
  <br />
  <button onClick={()=>this.props.setLastname()}>Set LastName</button>

{/* first name:{this.props.firstName}<br/>
last name:{this.props.lastName}<br/>
rollNo:{this.props.rollNo}<br/>
gender:{this.props.gender}<br/>
phoneNo:{this.props.phoneNo}<br/>

<br /> */}

{/* last name: {this.props.lastName} */}


        </div>
        </div>
             );
            
            }
        }

        const mapStateToProps = (state) =>{

          return {
        
            firstName:state.user.firstName,
            lastName:state.user.lastName,
            rollNo:state.user.rollNo,
            gender:state.user.gender,
            phoneNo:state.user.phoneNo,
          }
        
        }
        
        
        
        const mapDispatchToProps = (dispatch)=>{
        
          return {
        
            setLastname(item){
             const user ={
            firstName:item.firstname,
            lastName:item.lastname,
            rollNo:item.rollno,
            gender:item.gender,
            phoneNo:item.phoneno,
            image:item.image
             }
             console.log(user)
              
              dispatch({type:"SET_LASTNAME",state:user})
             
              thiapp.props.history.push('/Registration' 
              ); 
            }
           
           
          }
          
        }
        
          
          export default connect(mapStateToProps,mapDispatchToProps)(Details)
          