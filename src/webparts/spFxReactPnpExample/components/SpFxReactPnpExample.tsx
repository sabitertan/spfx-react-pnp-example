import * as React from 'react';
import styles from './SpFxReactPnpExample.module.scss';
import { ISpFxReactPnpExampleProps } from './ISpFxReactPnpExampleProps';
import { ISpFxReactPnpExampleState } from './ISpFxReactPnpExampleState';
import { escape } from '@microsoft/sp-lodash-subset';
import { Web } from "@pnp/sp";

import { IPerson, IResponsePerson } from "../interfaces";

export default class SpFxReactPnpExample extends React.Component<ISpFxReactPnpExampleProps,ISpFxReactPnpExampleState > {
  constructor(props: ISpFxReactPnpExampleProps) {
    super(props);
    // set initial state
    this.state = {
      items: [],
      errors: [],
      imageUrl: "img/default.png"
    };

    // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
    this._readAllPeople.bind(this);
  }
  public onError(): void {
    this.setState({ ...this.state, imageUrl: "img/default.png" });
  }
  public componentDidMount(): void {
    // read all file sizes from People library
    this._readAllPeople("PeopleList");
  }
  public render(): React.ReactElement<ISpFxReactPnpExampleProps> {
    return (

     /** card start */
     <div className="PersonList">
     {this.state.items.map((item, idx) => {
      return (
        <div className={styles.CardContainer}>
        <div className="CardContainerLeft">
          <img src={"/People/" + item.ID +".jpg"}
          className="loadafter" onError={this.onError.bind(this)}/>
          <label><input type="checkbox" data-rolodex={item.ID} />Rolodex</label>
        </div>
        <div className="CardContainerRight">
          <em></em>
          <a href={"mailto:" + item.Email}  className={ styles.title } title={item.Firstname +" "+ item.Lastname + "(" +item.Email+ ")"}>
            <img src="/images/email.png"
            alt={"Email" + item.Firstname + " " +item.Lastname}/>
          </a> 
          <em></em>
        </div>
      </div>
      );
    })}
    </div>
     /** card stop */
    );
  }
    // async functions were introduced with ES3/ES5 native support in TypeScript 2.1
  // https://blogs.msdn.microsoft.com/typescript/2016/12/07/announcing-typescript-2-1/
  // async function always return a Promise, on this scenario we return void Promise
  //   because we will not need it as we are directly setting the Component´s state
  private async _readAllPeople(libraryName: string): Promise<void> {
    try {
      // do PnP JS query, some notes:
      //   - .usingCaching() will be using SessionStorage by default to cache the  results
      //   - .get() always returns a promise
      //   - await converts Promise<IResponseItem[]> into IResponse[]
      const web: Web = new Web(this.props.pageContext.web.absoluteUrl);
      const response: IResponsePerson[] = await web.lists
        .getByTitle(libraryName)
        .items
        .select(
          "ID",
          "Email",
          "Firstname",
          "Lastname"
        ).top(100)
        .filter("(Lastname ne '') and (Firstname ne '')")
        .orderBy("Lastname,Firstname")
        .usingCaching()
        .get();
      // use map to convert IResponsePerson[] into our internal object IPerson[]
      const items: IPerson[] = response.map((item: IResponsePerson) => {
        return {
          ID: item.ID,
          Email: item.Email,
          Firstname: item.Firstname,
          Lastname: item.Lastname,
        };
      });

      // set our Component´s State
      this.setState({ ...this.state, items });
      /*
      // intentionally set wrong query to see console errors...
      const failResponse: IResponseItem[] = await web.lists
        .getByTitle(libraryName)
        .items
        .select("ID", "FirstName", "LastName", "NonExistingColumn").top(1)
        .orderBy("LastName,FirstName")
        .usingCaching()
        .get();
      */
    } catch (error) {
      // set a new state conserving the previous state + the new error
      this.setState({ ...this.state, errors: [...this.state.errors, error] });
    }
  }
}
