import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
var array = [];
var base;
var array1=[];
class Registration extends Component {

  constructor(props) {

    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      rollno: "",
      gender: "",
      phoneno: "",
      filter: "",
      marklist: [],
      readOnly: false,
      filter1: "",
      image: "",
      file: null,
      base64URL: "",

    }

    this.handleSubmit = this.handleSubmit.bind(this)

  }

  firsthandler = (event) => {
    this.setState({
      firstName: event.target.value
    })
  }
  lasthandler = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }
  rollnohandler = (event) => {
    this.setState({
      rollno: event.target.value
    })
  }

  genderhandler = (event) => {
    this.setState({
      gender: event.target.value
    })
  }
  phonenumberhandler = (event) => {
    this.setState({
      phoneno: event.target.value
    })
  }
  searchhandler = (event) => {
    this.setState({
      search: event.target.value
    })
  }
  searchhandler1 = (event) => {
    this.setState({
      search1: event.target.value
    })
  }

  onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        image: URL.createObjectURL(e.target.files[0])
      });
     this. handleFileInputChange(e)
   

    }
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
    // console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        base = result;
        //  console.log(result);
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

    
    this.setState({
      file: e.target.files[0],
      image: URL.createObjectURL(e.target.files[0])
    });
   
  };

  handleSubmit = (event) => {
    if(this.props.rollNo>0){
      const student = {
        firstname : this.state.firstName,
        lastname : this.state.lastName,
         rollno : this.state.rollno,
        gender :this.state.gender,
        phoneno : this.state.phoneno,

       };
       console.log(student);
      var firstName = this.state.firstName;
     var lastName = this.state.lastName;
     var rollno = this.state.rollno;
    var gender =this.state.gender;
    var phoneno = this.state.phoneno;

  console.log(rollno);
  const image ={
    rollno : this.state.rollno,
    image :base,
  }
  console.log(image);
axios.put("https://localhost:5001/api/students/Edit/"+rollno ,{"student":[student],"image":image})
// axios.put("https://192.168.131.170:5001/api/students/Edit/"+rollno ,student)
.then(res => {
this.setState({item: res.data});

})

this.setState({
firstName: "",
lastName: "",
rollno: "",
gender: "",
phoneno: "",
image:"",
})
    }
else {
    alert("registered Successfully");
    const student = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      // rollno : this.state.rollno,
      gender: this.state.gender,
      phoneno: this.state.phoneno,

    };
    const image = {
      image: base
    }
    console.log(image)

    //  if (status === 0){
    // alert("1")
    //  axios.post("https://192.168.131.170:5001/api/students/Create", student)
    axios.post("https://localhost:5001/api/students/Create", { "student": [student], "image": image })
      .then(response => {
        console.log();
        if (response.data.length > 0 && response.data[0].rollno > 0) {
          array.push(response.data[0]);
          this.setState({ item: response.data });

        }

      });
    }


    // console.log(response.data);

    // }

    // else {
    //   const rollno = rollnoindex;
    //   console.log(rollno);

    //   axios.put("https://localhost:5001/api/students/Edit/"+rollno ,student)
    //   .then(res => {
    //     this.setState({item: res.data});

    //    })



    //   array.splice(arrayindex, 1 , { "firstname": firstName, "lastname": lastName, "rollno": rollno, "gender": gender, "phoneno": phoneno })
    //   //array.splice()
    //   status = 0;
    //   arrayindex = -1;?
    // }

    // this.setState({
    //   firstName: "",
    //   lastName: "",
    //   rollno: "",
    //   gender: "",
    //   phoneno: "",

    // })
    // }
    event.preventDefault()
  
}
  // handleApiClick = () => {
  //   // alert("1")
  //   // axios.get("https://192.168.131.170:5001/api/students/rollno")
 
  // }
  componentWillMount() {
    // alert("1")
    if (this.props.rollNo > 0) {
      const rollno=this.props.rollNo;
      axios.get("https://localhost:5001/api/students/"+rollno)
      .then((response) => {
       
        array = response.data;
        console.log(array);
       

        this.setState({
          firstName: response.data.firstname,
        lastName:response.data.lastname,
        rollno: response.data.rollno,
        gender: response.data.gender,
        phoneno: response.data.phoneno,
        // image:response.data.image
        })

      })
      // const rollno1=this.props.rollNo
      console.log(rollno)
    
      axios.get("https://localhost:5001/api/students/image/"+rollno)
      .then((response) => {
        console.log(response);
        array1 = response.data;
        console.log(array1);
        this.setState({
          image:response.data[0].image,
        })
        console.log(this.state)
      })

    }

  }

  render() {
    

    return (

      <div>

        <div >
          <form onSubmit={this.handleSubmit}>
            <h1>Student Form</h1>
            <label>FirstName :</label> <input type="text" value={this.state.firstName} onChange={this.firsthandler} placeholder="FirstName..." /><br /><br />  
            <label>LastName :</label> <input type="text" value={this.state.lastName} onChange={this.lasthandler} placeholder="LastName..." /><br /> <br />
            <label>rollno :</label> <input type="number" value={this.state.rollno} onChange={this.rollnohandler} placeholder="rollno..." /><br /><br />
            <label>Gender :</label><select onChange={this.genderhandler} defaultValue="Select Gender" >
              <option defaultValue>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select><br /><br />
            <label>Phone No :</label> <input type="number" value={this.state.phoneno} onChange={this.phonenumberhandler} placeholder="phoneno..." /><br /><br />
            <input type="file" onChange={this. onImageChange} /><br /><br />
            {/* <img src={image} alt="preview image" /> */}


            <input type="submit" onSubmit={this.handleSubmit} value="Submit" /> < br /><br />
            {/* <button type="button"   onClick={this.detail} >
                  VIEW TABLE
                </button> */}
            <Link to="/Details" >  <button  >
              View Table
            </button></Link>
            <br />
            <br />




          </form>
          <img src={this.state.image} /><br/>
          <button onClick={(e) => this.props.setName(e)}>set Name</button>

          username:{this.props.firstName}
          <br />
          lastname:{this.props.lastName}
          <br />
          rollno:{this.props.rollNo}
          <br />
          gender:{this.props.gender}
          <br />
          phoneno:{this.props.phoneNo}


        </div>

      

      </div>

    );

  }

}
const mapStateToProps = (state) => {

  return {

    firstName: state.user.firstName,
    lastName: state.user.lastName,
    rollNo: state.user.rollNo,
    gender: state.user.gender,
    phoneNo: state.user.phoneNo,

  }

}



const mapDispatchToProps = (dispatch) => {

  return {

    setName() {

      console.log("setting name ,...", "$$$$");

      dispatch({ type: "SET_LASTNAME" })

    }

  }

}



export default connect(mapStateToProps, mapDispatchToProps)(Registration)