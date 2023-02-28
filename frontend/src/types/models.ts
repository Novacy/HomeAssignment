export interface Auth {
  id: number
  name: string
  email: string
  token: string
  created_at?: Date
  updated_at?: Date
}

export interface User {
  id: number
  name: string
  email: string
  token?: string
  created_at?: Date
  updated_at?: Date
}
export type Users = Array<User>

export interface Activity {
  id: number
  date: Date
  is_inbound: boolean
  title: string
}

export type Activities = Array<Activity>

export interface Account {
  id: number
  name: string
}

export type Accounts = Array<Account>

export interface Deal {
  id: number
  name: string
  account: Account
  activities?: Activities
  last_meeting: Date
  next_meeting: Date
  owner: string
  stage: string
  amount: number
}

export type Deals = Array<Deal>
