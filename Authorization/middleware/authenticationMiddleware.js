import { ApiError } from "../exeptions/apiError.js";
import jwtTokenService from "../services/jwtTokenService.js";

export function checkAuthToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError("No auth header"));
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError("Acess token not given"));
    }
    const tokenPayload = jwtTokenService.validateAccessToken(accessToken);
    if (!tokenPayload) {
      return next(ApiError.UnauthorizedError("Wrong token payload or token expired"));
    }
    req.token = accessToken;
    next();
  } catch (err) {
    return next(err);
  }
}

export function checkRefreshToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnauthorizedError("No auth header"));
    }
    const refreshToken = authHeader.split(" ")[1];
    if (!refreshToken) {
      return next(ApiError.UnauthorizedError("Refresh token not given"));
    }
    const tokenPayload = jwtTokenService.validateAccessToken(accessToken);
    if (!tokenPayload) {
      return next(ApiError.UnauthorizedError("Invalid refresh token"));
    }
    req.refreshToken = refreshToken;
    next();
  } catch (err) {
    return next(err);
  }
}
