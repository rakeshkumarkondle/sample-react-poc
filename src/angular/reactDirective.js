import app from '../../main'
import React from "react";
import ReactDOM from "react-dom";

let componentList = {
  ...require("../react/AboutMeComponent.tsx"),
  ...require("../react/ChildComponent.tsx"),
};


const reactDirective = app.directive('reactDirective', function() {

  function render(scope, el) {
    let Component = getComponent(scope);
    ReactDOM.render(<Component fields={scope.fields} metaInfos={scope.metaInfos} onChange={() => {
      scope.fields = _.extend({}, scope.fields);
      render(scope, el,Component);
    }} />, el[0]);
  }

  function getComponent(scope){
    return componentList[scope.component];
  }

  return {
      scope: {
        metaInfos:"=",
        fields:"=",
        component:"@"
      },
      link: function(scope, el, attrs){
        render(scope, el);
      }
    }
})

export default reactDirective;
