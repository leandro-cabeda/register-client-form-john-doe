import Api from "../api/BaseApi";

class Service {
  private service;

  constructor() {
    this.service = new Api();
  }

  async welcomeApi(): Promise<String> {
    return await this.service.getBaseApi().get("/");
  }

  async getClients(): Promise<any> {
    return await this.service.getBaseApi().get("/customers");
  }

  async createClient(body: any): Promise<any> {
    return await this.service.getBaseApi().post("/customers", body);
  }
}

export default Service;
