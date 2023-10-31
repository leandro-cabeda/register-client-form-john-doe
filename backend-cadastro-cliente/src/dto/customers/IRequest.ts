export default interface IRequest {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  color: string;
  observation?: string;
  created_at?: Date;
  updated_at?: Date;
}
