export interface IJWTPayload {
  sub: number;
  uav?: number;
  email?: number;
}

export interface IJwtPayloadWithRt extends IJWTPayload {
  refreshToken: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
