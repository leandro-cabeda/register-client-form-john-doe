export default interface IRequest {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  updated_at?: Date;
}
