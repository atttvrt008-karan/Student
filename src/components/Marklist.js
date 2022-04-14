import React, { Component, Fragment } from 'react';
import axios from 'axios';

import Pagination from "@material-ui/lab/Pagination";
var array = [];

var thiapp;
var totalmarks;
var marklist = [];

var id = 1;
var totalpage;
//  var dataSearch1 =[];


class Marklist extends Component {
  constructor() {
    super()
    this.state = {
      firstname: "",
      rollno: "",
      lastname: "",
      mark1: "",
      readOnly: false,
      mark2: "",
      mark3: "",
      totalmarks: "",
      marklist: [],
      dataSearch1: "",
      filter1: "",
      offset: 0,
      perPage: 4,
      currentPage: 0

    }
  }
  markhandler = (event) => {
    var mark = event.target.value;


    var m = event.currentTarget.getAttribute("tag");
    var cindex = event.currentTarget.getAttribute("mark");

    var temparr = thiapp.state.marklist;
    if (cindex == 1 && mark <= 100)
      temparr[m].mark1 = parseInt(mark);
    else if (cindex == 2 && mark <= 100)

      temparr[m].mark2 = parseInt(mark);
    else if (mark <= 100)
      temparr[m].mark3 = parseInt(mark);

    totalmarks = parseInt(temparr[m].mark1 + temparr[m].mark2 + temparr[m].mark3);

    temparr[m].totalmarks = totalmarks;

    this.setState({

      // mark1 :"",
      // mark2:"",
      // mark3:"",
      // totalmarks:"",


    });


  }
  selectChanged(event, i) {
    const firstnameIndex = event.target.selectedIndex;
    var a = event.currentTarget.getAttribute("tag");
    const lastname = array[firstnameIndex - 1].lastname;
    const rollno = array[firstnameIndex - 1].rollno;
    const firstname = array[firstnameIndex - 1].firstname;
    const id = "";
    const mark1 = "";
    const mark2 = "";
    const mark3 = "";
    const totalmarks = "";
    var temparr = thiapp.state.marklist;
    temparr[a].firstname = firstname;
    temparr[a].lastname = lastname;
    temparr[a].rollno = rollno;
    temparr[a].id = id;
    temparr[a].mark1 = mark1;
    temparr[a].mark2 = mark2;
    temparr[a].mark3 = mark3;
    temparr[a].totalmarks = totalmarks;
    thiapp.setState({
      //  marklist: temparr,
      // mark1: "",
      // mark2: "",
      // mark3: "",
      // totalmarks: "",
    }

    )

  }
  searchTxt1(e) {
    this.setState({ filter1: e.target.value });
    var rollno = e.target.value;
    //  var st=0;
    var obj;

    console.log(Number(rollno))
    if (Number(rollno) > 0) {
      obj = { "rollno": rollno, "firstname": "" };
    }
    else {
      obj = { "rollno": 0, "firstname": rollno };
    }

    console.log(obj);
    // axios.put("https://192.168.131.170:5001/api/Marklists/Search", obj)
    axios.put("https://localhost:5001/api/Marklists/Search", obj)
      .then(res => {
        const marklist = res.data
        console.log(res.data)
        thiapp.setState({ marklist: marklist });

      })
  }
  addRow = function (event, index) {
    // axios.get("https://localhost:5001/api/Marklists/id")
    //   .then((response) => {
    //     marklist = response.data;
    //     console.log(marklist)
    const arr = thiapp.state.marklist;
    if (arr.length == 0) {
      alert("yes")
      arr.push({ id: "", firstname: "", lastname: "", rollno: "", mark1: "", mark2: "", mark3: "", totalmarks: "" });
    }

    else if ((arr.length > 0) && (arr[arr.length - 1].totalmarks > 0)) {
      alert("no")
      arr.push({ id: "", firstname: "", lastname: "", rollno: "", mark1: "", mark2: "", mark3: "", totalmarks: "" });

    }
    thiapp.setState({
      marklist: arr,
      mark1: "",
      mark2: "",
      mark3: "",
      totalmarks: "",
      lastname: "",
      rollno: "",
      firstname: "",
      id: ""
    })

  }
  getOptions() {
    axios.get("https://localhost:5001/api/Students/rollno")
    // axios.get("https://192.168.131.170:5001/api/Students/rollno")
      .then((response) => {
        array = response.data;
        console.log(array)
      })
  }

  marktable() {

    console.log(id);
    // axios.post("https://192.168.131.170:5001/api/Marklists/" + id)
    axios.post("https://localhost:5001/api/Marklists/" + id)
      .then((response) => {
        console.log(response);
        marklist = response.data.result;
        totalpage= response.data.totalpage;
        thiapp.setState({ marklist: marklist ,totalpage : totalpage});


      })
  }
  prevoius() {
    --id;
    console.log(id);
    // axios.post("https://192.168.131.170:5001/api/Marklists/" + id)
    axios.post("https://localhost:5001/api/Marklists/" + id)
      .then((response) => {
        marklist = response.data.result;
        thiapp.setState({ marklist: marklist });


      })


  }
  next() {
    ++id;
    console.log(id);
    // axios.post("https://192.168.131.170:5001/api/Marklists/" + id)
    axios.post("https://localhost:5001/api/Marklists/" + id)
      .then((response) => {
        marklist = response.data.result;
        thiapp.setState({ marklist: marklist });


      })

  }
  handleInput(e) {
    // console.log(e.target.value);
    console.log(e.target.textContent)
    const id =e.target.textContent;
    // axios.post("https://192.168.131.170:5001/api/Marklists/" + id)
    axios.post("https://localhost:5001/api/Marklists/" + id)
      .then((response) => {
       
        marklist = response.data.result;

        thiapp.setState({ marklist: marklist });


      })

  }
  componentWillMount() {

    this.marktable()
    this.getOptions()
  }
  //   handlePageClick = (e) => {
  //     const selectedPage = e.selected;
  //     const offset = selectedPage * this.state.perPage;

  //     this.setState({
  //         currentPage: selectedPage,
  //         offset: offset
  //     }, () => {
  //       this.marktable()
  //     });

  // };
  render() {
    thiapp = this;
    const marklist = thiapp.state.marklist;

    let filter1 = this.state.filter1;
    var dataSearch1 = marklist.filter(item => {
      return Object.keys(item).some(key =>
        item["firstname"].toLowerCase().includes(filter1.toLowerCase())) ||

        item["rollno"]
          .toString()
          .toLowerCase()
          .includes(filter1.toLowerCase())

    });

    const handleSaveClickml = (event) => {
      alert("save")
      var temparr1 = thiapp.state.marklist;
      var a = event.currentTarget.getAttribute("tag");
      const marklist = {

        rollno: temparr1[a].rollno,
        mark1: temparr1[a].mark1,
        mark2: temparr1[a].mark2,
        mark3: temparr1[a].mark3,
        totalmarks: temparr1[a].totalmarks,
      }

      // axios.post("https://192.168.131.170:5001/api/Marklists/Create", marklist)
      axios.post("https://localhost:5001/api/Marklists/Create", marklist)

        .then(response => {
          temparr1[a].id = response.data;
          console.log(temparr1[a].id)
        })
      thiapp.setState({ marklist: temparr1 });

    }

    const handleDeleteClickml = (event, item) => {
      var temparr1 = marklist;
      console.log(temparr1)
      var m = event.currentTarget.getAttribute("tag");

      const id = temparr1[m].id
      console.log(id);


      // axios.delete("https://192.168.131.170:5001/api/marklists/Delete/" + id)
      axios.delete("https://localhost:5001/api/marklists/Delete/" + id)
        .then(res => {

          console.log(res.data)
          if (res.data == 1) {
            temparr1.splice(m, 1);

            thiapp.setState({ temparr1: marklist });
          }
        })

      marklist.splice(m, 1);

      thiapp.setState({ marklist: marklist });

    }
    const _click = (event) => {

      this.setState(prevState => ({ readOnly: !prevState.readOnly }))
      var temparr1 = thiapp.state.marklist;
      // console.log(temparr1)
      var a = event.currentTarget.getAttribute("tag");
      const marklist = {

        rollno: temparr1[a].rollno,
        mark1: temparr1[a].mark1,
        mark2: temparr1[a].mark2,
        mark3: temparr1[a].mark3,
        totalmarks: temparr1[a].totalmarks,
      }
      const id = temparr1[a].id

      // axios.put("https://192.168.131.170:5001/api/Marklists/Edit/" + id, marklist)
      axios.put("https://localhost:5001/api/Marklists/Edit/" + id, marklist)
        .then(res => {
          this.setState({ item: res.data });

        })
    }
    const click = () => {
      this.props.history.push('/Registration');
    }
    const click1 = () => {
      this.props.history.push('/Details');
    }
    //   const prevoius =() => {
    //      value = --value; 
    //   }
    //   const next =() => {
    //     value = ++value; 
    //  }

    return (
      <Fragment>
        <div><button onClick={() => click()}>form</button>
          <button onClick={() => click1()}>Details</button>

          <label>search :</label><input type="text" value={filter1} onChange={this.searchTxt1.bind(this)} />

        </div>

        <button type="button" className='buttonAdd' onClick={this.addRow} >
          Add
        </button>
        <div>

          <table >
            <thead>
              <tr>


                <th>Rollno</th>
                {/* <th> id </th> */}
                <th>firstname</th>
                <th>LastName</th>
                <th>Marks 1</th>
                <th>Marks 2</th>
                <th>Marks 3</th>
                <th> Total Marks</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {

                dataSearch1.map((item, i) => {
                  return (

                    <tr key={i} >

                      <td>   <select isClearable={true} tag={i} onChange={this.selectChanged} value={item.rollno} >

                        <option>Select rollno</option>

                        {array.map((option) => (

                          <option>

                            {option.rollno}

                          </option>

                        ))}

                      </select></td>
                      {/* <td><input type="text" value={item.idValue} /></td> */}
                      <td ><input type="text" value={item.firstname} /></td>
                      <td><input type="text" value={item.lastname} /></td>

                      <td ><input tag={i} type="number" mark={1} readOnly={this.state.readOnly} value={item.mark1} onChange={this.markhandler} /></td>
                      <td ><input tag={i} type="number" mark={2} value={item.mark2} readOnly={this.state.readOnly} onChange={this.markhandler} /></td>
                      <td ><input tag={i} type="number" mark={3} value={item.mark3} readOnly={this.state.readOnly} onChange={this.markhandler} /></td>
                      <td><input tag={i} type="number" value={item.totalmarks} /></td>
                      <td> <button tag={i} className='buttonDelete' onClick={handleSaveClickml}>
                        Save </button><button tag={i} className='buttonEdit' onClick={_click}>
                          {this.state.readOnly ? 'Update' : 'Edit'}
                        </button>
                        <button tag={i} className='buttonDelete' onClick={handleDeleteClickml}>
                          Delete</button></td>

                    </tr>

                  )
                })
              }

            </tbody>
          </table>

      
          <button onClick={this.prevoius}>
            prevoius
          </button>
         <Pagination className="center" count={totalpage} variant="outlined" shape="rounded" onClick={e => this.handleInput(e, "textContent")} />
  <button onClick={this.next}>
            next</button>


        </div>

      </Fragment>
    );
  }
    
}
export default Marklist;
