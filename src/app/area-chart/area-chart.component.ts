
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { AreaChart } from '@gooddata/react-components';


interface AreaChartBucketProps {
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
}

interface AreChartProps extends AreaChartBucketProps{
  projectId: string;
}

@Component({
  selector: 'app-area-chart',
  template: '<div class="myAreaChart" style="height:300px" [id]="rootDomID"></div>',
})

export class AreaChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() projectId: string;
  @Input() viewBy: string;
  //@Input() stackBy: string;

  Measures = [
    {
        measure: {
            localIdentifier: 'GrossProfit',
            definition: {
                measureDefinition: {
                    item: {
                        identifier: 'aabXfg7igrJF'
                    }
                }
            },
            format: '#,##0'
        }
    }
];


  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): AreChartProps {
    return {
      projectId: this.projectId,
      measures: this.Measures,
    };
  }


  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(AreaChart, this.getProps()), this.getRootDomNode());
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