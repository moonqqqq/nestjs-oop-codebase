export default class RandomData {
  static generateSerialNumber() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }
}
