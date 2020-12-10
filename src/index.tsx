import colors from 'colors'
import * as React from 'react'
import ReactDOM from 'react-dom'

import { COMBINE_NANO, NANO_FAUCET, BLA_FAUCET } from './config'
import * as api from './api'
import * as statement from './statement'
import * as test from './test'
import './index.css';
interface IState{
  density : number;
  level : number;
  amount : number;
}

export class Game extends React.Component<any, IState> {
  constructor(props:any){
    super(props);
    this.state = {
      density : 2,
      level : 2,
      amount : 1
    };
  }
  handleDensityChange(e: React.ChangeEvent<HTMLInputElement>){
    this.setState({density : Number(e.target.value)});
  }
  handleLevelChange(event : any){
    this.setState({level : event.target.value});
  }
  handleAmountChange(event : any){
    this.setState({amount : event.target.value});
  }
  render(){
    return (
  
<div className="input">
  <div>
density: <input name="density" value={this.state.density} onChange={this.handleDensityChange}></input> 
</div>
<div>level:<input name="level" value = {this.state.level} onChange={this.handleLevelChange}></input></div>
<div>amount:<input name="amount" value = {this.state.amount} onChange={this.handleAmountChange}></input></div>
<button onClick={()=>test.emulation(this.state.density, this.state.level, this.state.amount)}> matrix test</button>
</div>
    )
  }

}
ReactDOM.render(<Game/>, document.getElementById('root'));
 