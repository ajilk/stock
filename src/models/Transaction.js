export default class Transaction {
  constructor(uid, name, quantity, amount) {
    this.time = Date.now()
    this.uid = uid
    this.name = name
    this.quantity = quantity
    this.amount = amount
  }
}