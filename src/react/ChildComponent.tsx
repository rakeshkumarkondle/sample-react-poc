import React, { Component } from 'react';
import 'lodash';
import AccordionExampleFluid from "./AccordianModule.tsx";
import moment from 'moment';
export class ChildComponent extends Component{



  render() {
    return <div>
      <h1>Child component {this.props.fields.personalInfos[0].personalInfo.name.firstName}</h1>
    </div>
  }


}
