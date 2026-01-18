/* =======================
   REQUEST
======================= */
export interface LoginRequest {
  email: string;
  password: string;
}

/* =======================
   ADMIN
======================= */
export interface Admin {
  id: number;
  name: string;
  email: string;
}

/* =======================
   LOGIN RESPONSE
======================= */
export interface LoginResponse {
  token: string;
  admin: Admin;
}

/* =======================
   AUTH STATE (Context / Store)
======================= */
export interface AuthState {
  token: string | null;
  admin: Admin | null;
}
