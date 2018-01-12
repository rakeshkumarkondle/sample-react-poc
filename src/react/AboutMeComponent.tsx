import React, { Component } from 'react';
import 'lodash';
import AccordionExampleFluid from "./AccordianModule.tsx";
import moment from 'moment';
export class AboutMeComponent extends Component{

  saveFields(e,obj,data,key, value, fullKeys) {
    // find the data to update

      if(data.formName === 'placeOfBirth'){
        let selectedText = _.find(value.options,(option)=>{
            return option.value === value.value;
        });
        this.fields[data.formName][key] = selectedText.text;
      } else{
        this.fields[data.formName][key] = value;
      }
      if (key == "countryOfBirth" && value) {
        obj[data.formName]['stateOfBirth'] = '';
        if(value.value === 'IND'){
          data[data.formName].fields[1].options = [
          {'key':'TG','value':'TG','text':'Telangana'},
          {'key':'AP','value':'AP','text':'Andhra pradesh'},
          {'key':'KA','value':'KA','text':'Karnataka'},
          {'key':'TN','value':'TN','text':'Tamilnadu'}]
        } else {
          data[data.formName].fields[1].options = [];
        }
      }
      console.log(this)
      this.onChange();
    }

    description(fields,metaInfo) {
      if(metaInfo.formName === "placeOfBirth"){

        // fetch('https://restcountries.eu/rest/v2/all').then(response => response.json())
        //  .then((data) =>{
        //    let countriesList = []; _.map(data, _.partialRight(_.pick, ['name', 'alpha3Code']))
        //    metaInfo[metaInfo.formName].fields[0].options = [];
        //    _.forEach(data, function(value) {
        //      let obj = {};
        //        obj.text = value.name;
        //        obj.key = value.alpha3Code;
        //        obj.value = value.alpha3Code;
        //        metaInfo[metaInfo.formName].fields[0].options.push(obj)
        //    });
        //  });
      }
      let summaryText = '';
      if(metaInfo.formName === 'personalInfo'){
        summaryText = (fields.personalInfo.name.title?fields.personalInfo.name.title+' ':'') + (fields.personalInfo.name.firstName?fields.personalInfo.name.firstName+' ':'') + (fields.personalInfo.name.middleName?fields.personalInfo.name.middleName+' ':'') + (fields.personalInfo.name.lastName?fields.personalInfo.name.lastName+' ':'');
      }
      if (metaInfo.formName == "name") {
        summaryText = (fields.name.title?fields.name.title+' ':'') + (fields.name.firstName?fields.name.firstName+' ':'') + (fields.name.middleName?fields.name.middleName+' ':'') + (fields.name.lastName?fields.name.lastName+' ':'');
      }
      if(metaInfo.formName === "dateOfBirth"){
        summaryText = fields.dateOfBirth.dateOfBirth?moment(fields.dateOfBirth.dateOfBirth).format("DD MMM YYYY"):'';
      }
      if(metaInfo.formName === "gender"){
        summaryText = fields.gender.gender?fields.gender.gender:'';
      }
      if(metaInfo.formName === "placeOfBirth"){
        summaryText = (fields.placeOfBirth.stateOfBirth?fields.placeOfBirth.stateOfBirth+', ':'') +(fields.placeOfBirth.countryOfBirth?fields.placeOfBirth.countryOfBirth:'');
      }
      if(metaInfo.formName === "safeGuards"){
          let count = 0,findSome = false;
          _.forEach(fields.safeGuards, function(value, key) {

            if(value){
              findSome = true;
              value === 'Yes'?count++:count;
            }
          });
          summaryText = findSome ? (count+' identified'):'';
      }
      if(metaInfo.formName === "additionalInfo"){
        summaryText = (fields.additionalInfo.disability?fields.additionalInfo.disability+', ':'')+(fields.additionalInfo.retirementAge?fields.additionalInfo.retirementAge+' years':'');
      }
      if(metaInfo.formName === "marginInfo"){
           summaryText = (fields.marginInfo.title?fields.marginInfo.title+', ':'') + (fields.marginInfo.email?fields.marginInfo.email:'');
      }
      if(metaInfo.formName === "marginInfos"){
        summaryText = fields.marginInfos.length+' margin infos'
      }
      if(metaInfo.formName === "address"){
           summaryText = fields.address.address;
      }

      summaryText = summaryText.replace(/^[,\s]+|[,\s]+$/g, '');
      if(!summaryText){
          return 'incomplete';
      }
      return summaryText;
    }

  render() {
    return <div>
      {
        _.map(this.props.fields.personalInfos, (fields,ind) => {
          return <AccordionExampleFluid ind={ind}
            fields={fields}
            metaInfos={this.props.metaInfos}
            saveFields={this.saveFields}
            onChange={this.props.onChange}
            description= {this.description}/>
        })
      }
    </div>
  }


}
