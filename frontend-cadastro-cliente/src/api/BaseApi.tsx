import * as axios from "axios";

class Api {
  private api;

  constructor() {
    this.api = axios.default.create({
      baseURL: "http://localhost:5000",
    });
  }

  public getBaseApi() {
    return this.api;
  }
}

export default Api;
