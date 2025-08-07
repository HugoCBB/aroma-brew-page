export type RolesUser = "ADMIN" | "USER";

export type TypePayment = "BOLETO" | "CARTAO" | "AVISTA";

export type StatusPayment = "PENDENTE" | "VENCIDO" | "PAGO";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  roles_user: RolesUser;
  create_date: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  create_date: string;
  user_id: number;
  payments?: Payment[];
}

export interface Payment {
  id: number;
  value: number;
  type: TypePayment;
  create_date: string;
  final_date: string;
  status: StatusPayment;
  client_id: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}