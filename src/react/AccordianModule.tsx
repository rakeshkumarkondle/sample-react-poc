import React, { Component } from 'react'
import { Accordion, Icon, Button, Dropdown, Input } from 'semantic-ui-react'
import Autocomplete from 'react-google-autocomplete';

export default class AccordionExampleFluid extends Component {
  state = { activeIndex: -1 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  addRow = (e,obj,key) => {
    let childKey = key.slice(0,key.length-1);
    let newObj = {};
    newObj[childKey] = {};
    obj[key].push(newObj);
    this.props.onChange();
  }

  render() {
    const { activeIndex } = this.state;
    let list = [];
    this.props.metaInfos.forEach((data,key) =>{
      list.push(
        <Accordion.Title  active={activeIndex === key} index={key}>
          <span className="accordian-header-title">{data.fieldName} {(this.props.ind || this.props.ind ===0)?(this.props.ind+1):''}</span>
          <span className={"accordian-header-desc "+((activeIndex ===key) ? '' :(this.props.description(this.props.fields,data)!=='incomplete'?'filled':''))} >{(activeIndex ===key) ? 'completing': (this.props.description(this.props.fields,data) ? this.props.description(this.props.fields,data) :'incomplete') }</span>
          <Icon className={"pull-right "+ ((activeIndex>-1 ) ?'hidden':'')} name='write' size='large' onClick={ (event) => {this.handleClick(event,{index:key})}}/>
        </Accordion.Title>
      );
      list.push(
        <Accordion.Content active={activeIndex === key}>
          <div className="ui container form-data-fields">
            {
              data[data.formName].fields.map((detail) => {
                  if (detail.componentType == "textbox") {
                    return <div className="form-fields-area"><label>{detail.fieldName}</label><input type="text" value={this.props.fields[data.formName][detail.key]} onChange={(e) => this.props.saveFields(e,this.props.fields,data,detail.key, e.target.value) } />
                  </div>
                  } else if(detail.componentType == "selectBox"){
                    return <div className="form-fields-area"><label>{detail.fieldName}</label>
                           <Dropdown text={this.props.fields[data.formName][detail.key]} search selection placeholder='Select' options={detail.options} onChange={(e, value) => this.props.saveFields(e,this.props.fields,data,detail.key,value) }/>
                         </div>
                  }
                  else if(detail.componentType == "segment"){
                    return <SegmentControl detail={detail} fields={this.props.fields} data={data} onClick={(e,option) => this.props.saveFields(e,this.props.fields,data,detail.key,option) } />
                  } else if(detail.componentType == "datePicker"){
                    return <DatePicker dateObj={this.props.fields[data.formName][detail.key]} onChange={(e, value) => this.props.saveFields(e, this.props.fields,data,detail.key, value)}/>
                  }
                  else if (detail.componentType == "accordion") {

                    let AddBtton = '', htmlStr = '';

                    if(detail.type === 'array'){
                      AddBtton = <div className="right aligned ui container">
                                   <Button className="add-btn" primary onClick={(e) => this.addRow(e, this.props.fields,data.formName)}>{detail.fieldName}</Button>
                                 </div>
                        htmlStr = _.map(this.props.fields[data.formName] || [], (fieldData,ind) => {
                        return <div className="nested-accordian"> <AccordionExampleFluid ind={ind}  fields={fieldData} metaInfos={[detail]} saveFields={this.props.saveFields} onChange={this.props.onChange} description={this.props.description}  /></div>
                      });
                    } else{
                        htmlStr = <div className="nested-accordian"> <AccordionExampleFluid fields={this.props.fields[data.formName]}
                        metaInfos={[detail]} saveFields={this.props.saveFields} onChange={this.props.onChange} description={this.props.description} /></div>
                    }

                    return [AddBtton, htmlStr];
                  }
                  else if(detail.componentType === 'addressAutoComplete'){
                    return <ShroogalAutoComplete label={detail.fieldName} address= { this.props.fields[data.formName][detail.key]} onChange={(e, value) => this.props.saveFields(e, this.props.fields,data,detail.key, value)}/>
                  } else if(detail.componentType === 'fileUpload'){
                    return <div className="form-fields-area">
                      <label>{detail.fieldName}</label>
                      <input type="file" className="upload" value={this.props.fields[data.formName][detail.key]} onChange={(e) => this.props.saveFields(e, this.props.fields,data,detail.key, e.target.value)} /> {this.props.fields[data.formName][detail.key]}
                    </div>;
                  }

              })
            }
            <div className="right aligned ui container">
              <Button className="close-btn" primary onClick={this.handleClick}>Close</Button>
            </div>
          </div>
        </Accordion.Content>
      );
    })
    return (
      <Accordion fluid styled>
        {list}
      </Accordion>

    )
  }
}

class SegmentControl extends React.Component{
  constructor(props){
    super(props);
  }

  saveFields = (e,option) =>{
    this.props.onClick(e, option);
  }

  isActive(value,obj,data,key){
    return 'btn '+((value===obj[data.formName][key]) ?'active':'default');
  }

  render(){
    return (
      <div className="segment-section form-fields-area"><label>{this.props.detail.fieldName}</label>
        <div className = "segment-control">
        {
          this.props.detail.options.map((option) => {
           return <button className={this.isActive(option,this.props.fields,this.props.data,this.props.detail.key)} onClick={(e) => this.saveFields(e,option) }>{option}</button>
         })
        }
        </div>
      </div>
    );
  }
}


class DatePicker extends React.Component {
  state = {};
  constructor(props){
    super(props);
    this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }

  mapDateObject(){
    if(this.props.dateObj){
      let dateObj = new Date(this.props.dateObj),
       locale = "en-us";
      return {
        year : dateObj.getFullYear(),
        month : dateObj.getMonth(),
        day : dateObj.getDate()
      }

    } else{
      return {};
    }

  }

  mapDateObjectText(dateObj) {
    return {
      year: dateObj.year,
      day: dateObj.day,
      month: this.getMonthDisplay(dateObj.month),
    }
  }

  getMonthDisplay(month) {
    return this.months[month];
  }
  getMonthList(){
    let monthList = [];
     _.forEach(this.months, function(value) {
       let obj = {};
       obj['key'] = value.substr(0,3).toUpperCase();
       obj['val'] = value.substr(0,3).toUpperCase();
       obj['text'] = value;
       monthList.push(obj);
     });
     return monthList
  }

  saveDateFn = (e,obj,key) =>{
    obj[key] = e.target.value;
    this.props.onChange(e, new Date(obj.year, obj.month, obj.day));
  }

   render() {
     var dateObj = this.mapDateObject();
     var dateObjText = this.mapDateObjectText(dateObj);
     var monthsList = this.getMonthList();
      return (
          <div className="date-picker-section form-fields-area">
          <div>
          <label className="year-label">Year</label>
          <Input type="number" placeholder='YYYY' value={dateObjText.year} onChange={(e) => this.saveDateFn(e,dateObj,'year') }/>
          </div>
          <div>
          <label>Month</label>
          <Input placeholder='MMM' value={dateObjText.month} onChange={(e) => this.saveDateFn(e,dateObj,'month') }/>
          </div>
          <div>
          <label>Date</label>
          <Input type="number" placeholder='DD' value={dateObjText.day} onChange={(e) => this.saveDateFn(e,dateObj,'day') }/>
          </div>
          </div>
      );
   }
}






class ShroogalAutoComplete extends React.Component {
  constructor(props){
    super(props);
  }

  saveAdressFn = (place,e={}) =>{
    this.props.onChange(e, place.formatted_address);
  }

  changeInputFn = (e) =>{
    this.props.onChange(e, e.target.value);
  }

   render() {
      return (
          <div className="address-auto-complete-section form-fields-area">
            <label>{this.props.label}</label>
            <Autocomplete value={this.props.address} onChange={(e) => this.changeInputFn(e) } onPlaceSelected={(place) => { this.saveAdressFn(place)}} types={[]} componentRestrictions={{country: "Au"}}/>
          </div>
      );
   }
}
