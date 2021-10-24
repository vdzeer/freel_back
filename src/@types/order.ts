export type TOrder = {
  _id: string
  customer: string
  executor: string | null
  title: string
  description: string
  createdAt: Date
  garant: boolean
  premium: boolean
  price: number
  country: string
  city: string
  spec: string
  views: number
  responses: Array<any>
  active: boolean
  confirmed: boolean
}
