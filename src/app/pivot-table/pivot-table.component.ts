
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { PivotTable } from '@gooddata/react-components';


interface PivotTableBucketProps {
  measures?: any[];
  rows?: any[];
  columns?: any[];
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
}
interface PivotTableProps extends PivotTableBucketProps{
  projectId: string;
  pageSize?: number;
  config?: any;
  groupRows?: boolean;
  exportTitle?: string;
}

@Component({
  selector: 'app-pivot-table',
  template: '<div class="myContainer" [id]="rootDomID"></div>',
})

export class PivotTableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() projectId: string;
  @Input() pageSize: number;

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
Columns = [
  {
      visualizationAttribute: {
          displayForm: {
              identifier: "label.restaurantlocation.locationcity"
          },
          localIdentifier: 'locationcity'
      }
  }
];

Rows = [
  {
      visualizationAttribute: {
          displayForm: {
              identifier: "label.restaurantlocation.locationstate"
          },
          localIdentifier: 'locationstate'
      }
  }
];
SortBy = [
  {
      measureSortItem: {
          direction: 'desc',
          locators: [
              {
                  attributeLocatorItem: {
                      attributeIdentifier: 'locationcity',
                      element: '/gdc/md/ht3owbpk6h0yfjtkcsgva3osu3z7paol/obj/2208/elements?id=6340103'
                  }
              },
              {
                  measureLocatorItem: {
                      measureIdentifier: 'GrossProfit'
                  }
              }
          ]
      }
  }
];

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): PivotTableProps {
    return {
      projectId: this.projectId,
      measures: this.Measures,
      rows: this.Rows,
      pageSize: this.pageSize,
      // columns: this.Columns,
      // sortBy: this.SortBy
    };
  }


  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
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