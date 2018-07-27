import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { sp } from "@pnp/sp";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxReactPnpExampleWebPartStrings';
import SpFxReactPnpExample from './components/SpFxReactPnpExample';
import { ISpFxReactPnpExampleProps } from './components/ISpFxReactPnpExampleProps';

export interface ISpFxReactPnpExampleWebPartProps {
  description: string;
}

export default class SpFxReactPnpExampleWebPart extends BaseClientSideWebPart<ISpFxReactPnpExampleWebPartProps> {
  public onInit(): Promise<void> {
    return super.onInit().then( _ => {
      // other init code may be present
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISpFxReactPnpExampleProps > = React.createElement(
      SpFxReactPnpExample,
      {
        description: this.properties.description,
        pageContext: this.context.pageContext
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
