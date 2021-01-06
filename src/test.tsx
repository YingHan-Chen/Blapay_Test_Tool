import colors from 'colors'
import * as React from 'react'
import ReactDOM from 'react-dom'

import { COMBINE_NANO, NANO_FAUCET, BLA_FAUCET } from './config'
import * as api from './api'
import * as statement from './statement'
import './test.css';

let transaction, transaction_hash, balance, info

type XXX = {
  row: number;
  col: number;
  data: any;
  time : any;
};

class Square extends React.Component<any> {
  constructor(props : any){
    super(props)
  }

  render() {
    return (
      <div>
        id={this.props.data.id}<br></br>
        balance={this.props.data.balance}<br></br>
      
      </div>
    );
  }
}


class Board extends React.Component<any> {
  constructor(props : any){
    super(props)
    
  }
  renderCol(data:any, col:number){
    if (col <=1){
      return <Square data={data}/>;
    }
    const child = [];
    for(let i=0;i<col;i++){
     child.push(<Square data={data[i]}/>);
    }
    let xx = <div className="result-row"> {child}</div>;
    return xx
  }
  renderRow(data:any){
    const child =[];
    // if(data.row>1){
    for(let i =0;i<data.row;i++){
      
      child.push(this.renderCol(data.data[i],data.col));
    }
  // }else{
  //     return this.renderCol(data.data, data.col)
  //   }
    return child;
  }
  renderSquare(data:any) {
    return <Square data={data}/>;
  }
 
  render() {
   return (
      <div>
        <div className="status">"confirmed within " {this.props.data.time} `ms`</div>
        <div className="board"> {this.renderRow(this.props.data)} </div>

      </div>
    );
  }
}


class Game extends React.Component<any> {
 
  constructor(props:any){
    super(props);
  }

  render() {
    return (
      <div className="game">
    
        
        <div className="game-board">
          <Board data={this.props.data}/>
        </div>
        <div className="game-info">
          <div id="matrix-result">{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        
      </div>
      
    );
  }
}

// ========================================


async function getRandomIntInclusive(min : number, max : number): Promise<number> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
}

async function sleep(time : number) : Promise<void>{
  return new Promise<void>((res,rej)=>{
      setTimeout(res,time);
  });
}

 export const emulation = async (density: number, level: number, amount: number): Promise<void> => {
  let aa : XXX
  let accounts = new Array(level)
  for(let i=0 ;i<level;i++){
    accounts[i] = new Array(density)
    for(let j=0;j<density;j++){
      accounts[i][j] = await api.create_account()
      statement.account_info(accounts[i][j])
    }
  }
 
  // deposit basic coins
  for(let i=0; i<level ;i++){
    for(let j=0;j<density;j++){
      for(let k=0;k<5;k++){
        statement.only_message_result(await api.transfer(BLA_FAUCET.account, accounts[i][j].id , "1")) 
      }
    }
  }



 // deposit
    

    
    for(let j=0;j<density;j++){
      console.log(colors.green("\ndepositFromBla "), accounts[0][j].id, amount.toString()) 
      statement.only_message_result(await api.transfer(BLA_FAUCET.account, accounts[0][j].id , amount.toString() ))
      
    }

    let status
    do{
      await sleep(100)
      status = await api.getServiceStatus()
      console.log(`numProcessingTxn: ${status.numberProcessingTxn}\nnumProcessingPoW: ${status.numberProcessingPoW}\n`)
    
    }while(status.numberProcessingTxn !== 0 || status.numberProcessingPoW !==0 )
  
    //  console.log(colors.green("\ndepositFromNano (Account A , +1000)"))
    //  statement.only_message_result(await api.deposit_from_nano(account_a.id, "1000", NANO_FAUCET.account))

  const start = new Date().getTime();
  console.log("Start measuring")
  for(let i=1; i<level ;i++){
    for(let j=0;j<density;j++){
      for(let k=0;k<amount;k++){
        console.log(colors.green("\ntransfer"),accounts[i-1][j].id, accounts[i][(j+k)%density].id)
        
        await api.transfer(accounts[i-1][j].id, accounts[i][(j+k)%density].id, "1")
        
      }
    }
  }
  do{
    await sleep(100)
    status = await api.getServiceStatus()
    console.log(`numProcessingTxn: ${status.numberProcessingTxn}\nnumProcessingPoW: ${status.numberProcessingPoW}\n`)
  
  }while(status.numberProcessingTxn !== 0)

  let durations = new Date().getTime() - start;
  let data = new Array(level)
  for(let i=0 ;i<level;i++){
    data[i] = new Array(density)
    
    for(let j=0;j<density;j++){
      data[i][j] = await api.get_account_info(accounts[i][j].id)
      statement.account_info(accounts[i][j])
    }
  }
  aa = {
    row : level,
    col : density,
    data : data,
    time : durations
    
  };
  ReactDOM.render(<Game data = {aa}/>, document.getElementById('result'));

  console.log("elapsed time = ", durations)

}


export const randomTxn = async (density: number, count: number, amount: number) => {
  
  let accounts = new Array(density)
  for(let i=0 ;i<density;i++){
      accounts[i] = await api.create_account()
      statement.account_info(accounts[i]);
  }

  // deposit basic coins
    for(let j=0;j<density;j++){
      for(let k=0;k<5;k++){
        statement.only_message_result(await api.transfer(BLA_FAUCET.account, accounts[j].id , "1")) 
      }
    }
    
    for(let j=0;j<density;j++){
      console.log(colors.green("\ndepositFromBla "), accounts[j].id, amount.toString()) 
      statement.only_message_result(await api.transfer(BLA_FAUCET.account, accounts[j].id , amount.toString() ))
      
    }

    let status
    do{
      await sleep(100)
      status = await api.getServiceStatus()
      console.log(`numProcessingTxn: ${status.numberProcessingTxn}\nnumProcessingPoW: ${status.numberProcessingPoW}\n`)
    
    }while(status.numberProcessingTxn !== 0 || status.numberProcessingPoW !==0 )

  const start = new Date().getTime();
  console.log("Start measuring")
  let target : number
        
  for(let i=0; i<count ;i++){
    for(let j=0;j<density;j++){
      for(let k=0;k<amount;k++){
        do{
           target = await getRandomIntInclusive(0,density-1)
        }while(target !== j)
        console.log(colors.green("\ntransfer"),accounts[j].id, accounts[target].id)
        
        await api.transfer(accounts[j].id, accounts[target].id, "1")
        
      }
    }
  }
  do{
    await sleep(100)
    status = await api.getServiceStatus()
    console.log(`numProcessingTxn: ${status.numberProcessingTxn}\nnumProcessingPoW: ${status.numberProcessingPoW}\n`)
  
  }while(status.numberProcessingTxn !== 0)

  const duration = new Date().getTime() - start;
  console.log("elapsed time = ", duration)

}

export const testR = async () => {
  ReactDOM.render(<Game/>, document.getElementById('root'));
  
}
 