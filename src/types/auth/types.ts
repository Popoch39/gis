import { User } from "../models/user"

export interface TokenInterface {
  token: string,
  lastUsedAt: Date | null,
  expiresAt: Date | null,
  name: string | null,
  type: "bearer"
}

export interface loginFormInterface {
  email: string
  password: string
};

export interface loginResponse {
  token: TokenInterface
  user: User
}
