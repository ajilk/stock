export default class UserModel {
  constructor(firstName, lastName, balance) {
    this.firstName = firstName
    this.lastName = lastName
    this.balance = balance
    this.ownedStocks = {}
  }
}