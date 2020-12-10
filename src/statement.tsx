import { SHOW_API_RESPONSE } from './config'

export const account_info = (createAccount_response: any) => {
  if (createAccount_response.error) {
    console.log(`error: ${createAccount_response.error}`)
    return
  }
  
  console.log(`id: ${createAccount_response.id}\nprivate key: ${createAccount_response.private}\npublic key: ${createAccount_response.public}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(createAccount_response, null, 4))
  }
}

export const account_balance = (getBalance_response: any) => {
  if (getBalance_response.error) {
    console.log(`error: ${getBalance_response.error}`)
    return
  }
  
  console.log(`balance: ${getBalance_response.balance}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(getBalance_response, null, 4))
  }
}

export const only_message_result = (response: any) => {
  if (response.error) {
    console.log(`error: ${response.error}`)
    return
  }
  
  console.log(`message: ${response.message}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(response, null, 4))
  }
}

export const transfer_hash = (transfer_response: any) => {
  if (transfer_response.error) {
    console.log(`error: ${transfer_response.error}`)
    return
  }
  
  console.log(`tansaction hash: ${transfer_response.hash}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(transfer_response, null, 4))
  }
}

export const transaction_info = (findTransaction_response: any) => {
  if (findTransaction_response.error) {
    console.log(`error: ${findTransaction_response.error}`)
    return
  }
  
  console.log(`source: ${findTransaction_response.info.Source}\ndestination: ${findTransaction_response.info.Destination}\namount: ${findTransaction_response.info.Amount}\ntimestamp: ${findTransaction_response.info.TimeStamp}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(findTransaction_response, null, 4))
  }
}

export const account_transaction_history = (accountHistory_response: any) => {
  if (accountHistory_response.error) {
    console.log(`error: ${accountHistory_response.error}`)
    return
  }

  console.log(`history: ${JSON.stringify(accountHistory_response.history, null, 4)}`)
  if (SHOW_API_RESPONSE) {
    console.log(JSON.stringify(accountHistory_response, null, 4))
  }
}