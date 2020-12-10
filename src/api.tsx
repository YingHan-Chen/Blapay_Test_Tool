import axios from "axios"
import { BLAPAY_ENDPOINT, NANO_ENDPOINT } from './config'

const BLAPAY_REQUEST = async (data: any) => {
  const response = axios.create({ baseURL: BLAPAY_ENDPOINT }).post("/", data)
  return (await response).data
}

const NANO_REQUEST = async (data: any) => {
  const response = axios.create({ baseURL: NANO_ENDPOINT }).post("/", data)
  return (await response).data
}

export const create_account = async () => {
  const body = {
    command: "createAccount"
  }
  const response = await BLAPAY_REQUEST(body)
  return response
}

export const get_account_balance = async (ID: string) => {
  const body = {
    command: "getBalance",
    ID
  }
  const response = await BLAPAY_REQUEST(body)
  return response
}

export const deposit_account = async (ID: string, amount: string) => {
  const body = {
    command: "deposit",
    ID,
    amount
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}

export const import_nano_account = async (nano_account: any) => {
  const body = {
    command: "importNanoAccount",
    private: nano_account.private,
    account: nano_account.account,
    public: nano_account.public,
    seed: nano_account.seed
  }

  const response = await NANO_REQUEST(body)
  return response
}

export const deposit_from_nano = async (ID: string, amount: string, nanoAccount: string) => {
  const body = {
    command: "depositFromNano",
    ID,
    nanoAccount,
    amount
  }
  try {
    const response = await BLAPAY_REQUEST(body)
    return response
  } catch (err) {
    console.log(err)
  }
}

export const transfer = async (source: string, destination: string, amount: string) => {
  const body = {
    command: "transfer",
    source,
    destination,
    amount
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}

export const getServiceStatus = async () => {
  const body = {
    command: "getServiceStatus",
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}

export const get_account_history = async (ID: string) => {
  const body = {
    command: "accountHistory",
    ID,
    detail: true
  }
  const response = await BLAPAY_REQUEST(body)
  return response
}

export const get_transaction_info = async (hash: string) => {
  const body = {
    command: "findTransaction",
    hash
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}

export const get_account_info = async (ID: string) => {
  const body = {
    command: "accountInfo",
    detail: "true",
    ID
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}



export const suspend_account = async (ID: string, action: string) => {
  const body = {
    command: "suspendAccount",
    ID,
    action
  }

  const response = await BLAPAY_REQUEST(body)
  return response
}