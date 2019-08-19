
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Visualization } from '@gooddata/react-components';


interface VisualizationProps {
  projectId: string;
  uri?: string;
  identifier?: string;
  config?: any;
  filters?: any[];
}
// interface VisualizationState{
//   isLoading: boolean;
//   resultSpec: any;
//   type: any;
//   totals: any[];
//   colorPalette: any[];
//   colorPaletteEnabled: boolean;
//   featureFlags: any;
// }
// interface VisualizationExecInfo {
//   dataSource: any;
//   resultSpec: any;
//   featureFlags: any;
//   type: any;
//   totals: any[];
//   mdObject: any;
// }

@Component({
  selector: 'app-visualization',
  template: '<div class="myVisualization" style="height:300px" [id]="rootDomID"></div>',
})

export class VisualizationComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() projectId: string;
  @Input() identifier: string;
  @Input() uri: string;

  

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps_identifier(): VisualizationProps {
    return {
      projectId: this.projectId,
      identifier: this.identifier,
    };
  }

  protected getProps_uri(): VisualizationProps {
    return {
      projectId: this.projectId,
      uri: this.uri,
    };
  }
  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      //ReactDOM.render(React.createElement(Visualization, this.getProps_identifier()), this.getRootDomNode());
       ReactDOM.render(React.createElement(Visualization, this.getProps_uri()), this.getRootDomNode());
    }
    
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }
  
  
}