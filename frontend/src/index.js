import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as SRD from "storm-react-diagrams";

import "./styles.css";
import Modal from 'react-responsive-modal';
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';


require("storm-react-diagrams/dist/style.min.css");

var engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

// 2) setup the diagram model
var model = new SRD.DiagramModel();

// 3) create a default node
//var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
//let port1 = node1.addOutPort("Out");
//node1.setPosition(100, 100);

// 4) create another default node
//var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
//let port2 = node2.addInPort("In");
//node2.setPosition(400, 100);

// 5) link the ports
//let link1 = port1.link(port2);

// 6) add the models to the root graph
//model.addAll(node1, node2, link1);

// 7) load model into engine
engine.setDiagramModel(model);
// console.log(model);
// console.log(engine);

const str="name,age,country,region"
const listSQL=['and','or','where','not','like','>','<','<>','=','<=','>=','AVG','MIN','MAX','(',')','+','-','*','/']
const listGroupBy=['AVG','MIN','MAX','FIRST',',']
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {sqlString:''
    ,openSelect:false,
    opencombine:false,
    firstSQL:"select "
    ,inputSQl:""
    ,listNodesId:[],
  finalRqt:[],
  finalSQL:"",
  lastgroupby:[],
  lastGroupByRqt:"",
openGroupBy:false };

  }

 path="EA_result_1351.xlsx";


  fileInput = e => {
    const file = e.target.files[0];
    const newNode = new SRD.DefaultNodeModel(file.name, "blue");
    newNode.addOutPort("out");
    model.addNode(newNode);

    this.forceUpdate();

    


  
    /*  this.componentDidMount()
    {
      fetch('http://localhost:9000/findallcolumns/{file.name}').then(res=>{
        res.json()
      }).then(res=>{
        this.setState({
          columns: res
        }).catch(error=>{
          console.log(error)
        })
      })    
    }
  */
  
  };

  
  
  componentDidMount() {
    axios.get(`http://localhost:9000/test3/{path}`)
      .then(res => {
        const s = res.data;
// console.log(s);   
   })
  }



    

  addSelect = () => {
    const newNode1 = new SRD.DefaultNodeModel("Select", "green");
    newNode1.addOutPort("out");
    newNode1.addInPort("in");
    model.addNode(newNode1);
    console.log(newNode1)
    this.forceUpdate(); 


    //  newNode1.addListener({selectionChanged : console.log("******")});

  
    // console.log("hiiii");
    // console.log(model.getSelectedItems());



  //   model.addListener({
  //     linksUpdated: e => {  
  //       console.log("udated!!") 
  //       console.log(e)
  //       if( (e.link.sourcePort!=null)&&(e.link.targetPort!=null)){
  //       console.log("*************************")
  //       if(e.link.targetPort.parent.id!=e.link.sourcePort.parent.id)
  //   {
  //     console.log("dsfsdf")
  //     this.setState({listNodesId:[e.link.sourcePort.parent.id,e.link.targetPort.parent.id]})   }}
  // }
  
      
// });


    newNode1.addListener({
      selectionChanged: () => {
        document.getElementById('configureCombine').style.display = 'none';

        document.getElementById('configureGroupBy').style.display = 'none';
        document.getElementById('configureSelect').style.display = 'block';
      }
        });


  };

  addSQL = (item) => {
    console.log(item)
     this.setState({sqlString:  this.state.sqlString +' '+ item.item})
    console.log(this.state.sqlString)
  };


  addCombine = () => {
    const newNode = new SRD.DefaultNodeModel("Combine", "red");
    newNode.addOutPort("out");
    newNode.addInPort("in1");
    newNode.addInPort("in2");
    model.addNode(newNode);
    this.forceUpdate();
    console.log(model);
    newNode.addListener({
      selectionChanged: () => {
        document.getElementById('configureSelect').style.display = 'none';
        document.getElementById('configureGroupBy').style.display = 'none';
        document.getElementById('configureCombine').style.display = 'block';
      }
        });
    
  };
  addGroupBy = () => {
    const newNode = new SRD.DefaultNodeModel("GroupBy", "pink");
    newNode.addOutPort("out");
    newNode.addInPort("in");
    model.addNode(newNode);

    this.forceUpdate();


    newNode.addListener({
      selectionChanged: () => {
        document.getElementById('configureSelect').style.display = 'none';
        document.getElementById('configureGroupBy').style.display = 'block';
        document.getElementById('configureCombine').style.display = 'none';


      }
        });
  };

  // state = {
  //   open: false,
  // };


  getColumns=()=> {
    var newstr = str.split(',');
    return newstr
  }

 
    //console.log(model.links)
  
    onOpenGroupByModal =()=>{
      this.setState({openGroupBy:true})
    }

  onOpenSelectModal = () => {
    this.setState({ openSelect: true });
  };
  
  onOpenCombineModal = () => {
    this.setState({ opencombine: true });
  };



  onCloseCombine=()=>{

  }

  onCloseSelectModal = () => {
    Object.keys(model.links).map((item, i) => (
      this.setState({listNodesId:[model.links[item].sourcePort.parent.id,model.links[item].targetPort.parent.id]})  
    ))
    this.setState({finalSQL:this.state.firstSQL+this.state.sqlString });
    if (this.state.finalSQL)
    {
    this.setState({finalRqt:[...this.state.finalRqt,[...this.state.listNodesId,this.state.finalSQL]]})
    this.setState({openSelect: false})
    this.setState({finalSQL:"",sqlString:""})
    }
  };

  onCloseGroupBy=()=>{
    Object.keys(model.links).map((item, i) => (
      this.setState({listNodesId:[model.links[item].sourcePort.parent.id,model.links[item].targetPort.parent.id]})  
    ))
    this.setState({lastGroupByRqt:this.state.firstSQL+this.state.sqlString+this.state.lastgroupby})

    if (this.state.lastGroupByRqt)
    {
      this.setState({finalRqt:[this.state.finalRqt,[...this.state.listNodesId,this.state.lastGroupByRqt]]})
      this.setState({openGroupBy:false})
      this.setState({firstSQL:"",sqlString:"",lastgroupby:"",lastGroupByRqt:""})

    }
   
  }

  handleChangeSQL=(event)=>{
    
    this.setState({inputSQl:event.target.value})

  }

  _handleKeyPress = (e) => {
    
    if (e.key === 'Enter') {
      this.setState({sqlString:this.state.sqlString+' '+this.state.inputSQl,inputSQl:""})
    }
  }
   

  columnNamesChanged = (newItems) => {
    

    this.setState({
      firstSQL: "select "+ newItems.toString(),
      lastgroupby:" GroupBy "+newItems.toString()
      // firstSQL:this.state.firstSQL+','+newItems
      // fruits: newFruits
    });
  }


  render() {
    const { openSelect,openGroupBy,openCombine } = this.state;
    var sentenceSQL = this.state.sqlString
    var arrayop = [...listSQL, ...this.getColumns()]
    var groupByopArray = [...listGroupBy]
    this.getColumns().map((item,i)=>{
      groupByopArray.push('('+item+')')
    })
    return (
    <div className="App">






 <Modal open={openSelect} onClose={this.onCloseSelectModal} center>           
<div id="betbet">
  <CheckboxGroup
    checkboxDepth={2} // This is needed to optimize the checkbox group
    name="fruits"
    value={this.state.columnNames}
    onChange={this.columnNamesChanged}>
 {this.getColumns().map(function(item, i){
   return <label><Checkbox value={item}/> {item}</label>})}
  </CheckboxGroup>
  </div>


  <div>
    {
 arrayop.map((item)=>(
     <button class="button" onClick={() => this.addSQL({item})} value={item}>{item}</button>
  ))
} </div>
<div>
  <input type='text' value={this.state.inputSQl} onChange={this.handleChangeSQL.bind(this)}
  onKeyPress={this._handleKeyPress} />
  </div>
      <div id="betbet1">
  {sentenceSQL}
     </div>
          

        </Modal>    
  



  <Modal  open={openGroupBy} onClose={this.onCloseGroupBy} center>

      <div id="betbet2">
  <CheckboxGroup
    checkboxDepth={2} // This is needed to optimize the checkbox group
    name="fruits"
    
    value={this.state.columnNames}
    onChange={this.columnNamesChanged}
>
 {
   this.getColumns().map(function(item, i){
   
   return <label><Checkbox value={item}/> {item}</label>})}
  </CheckboxGroup>
  </div>
<div>
{
  groupByopArray.map((item)=>(
     <button  class="button" onClick={() => this.addSQL({item})} value={item}>{item}</button>
  ))
}
  </div>
  <div id="betbet3">{this.state.firstSQL+this.state.sqlString}</div>
</Modal> 





  <Modal open={openCombine} onClose={this.onCloseCombine} center>
<div>
<CheckboxGroup
checkboxDepth={2} // This is needed to optimize the checkbox group
name="fruits"

value={this.state.columnNames}
onChange={this.columnNamesChanged}
>
{
this.getColumns().map(function(item, i){

return <label><Checkbox value={item}/> {item}</label>})}
</CheckboxGroup>
</div>

<div>{this.state.firstSQL+this.state.sqlString}</div>
   </Modal> 
    
        <button class="button" id="configureSelect" hidden="hidden" onClick={this.onOpenSelectModal} >Configure Select</button>
        <button class="button" id="configureGroupBy" hidden="hidden" onClick={this.onOpenGroupByModal}> Configure GroupBy</button>
        <button class="button" id="configureCombine" hidden="hidden" onClick={this.onOpenCombineModal}> Configure Combine</button>

        <input type="file" label="upload" onChange={this.fileInput} />
        <button class="button" onClick={this.addSelect}>Select</button>
        <button class="button" onClick={this.addCombine}>Combine</button>
        <button class="button" onClick={this.addGroupBy}>GroupBy</button>

        <SRD.DiagramWidget diagramEngine={engine} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
