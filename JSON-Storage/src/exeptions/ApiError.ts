export class ApiError extends Error {
  public status: any;

  constructor(status: any, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
  static NotFound() {
    return new ApiError(404, "Not found");
  }
  static BadRequest(message: string) {
    return new ApiError(400, message);
  }
  static DatabaseError(message:string)
  {
    return new ApiError(500,message);
  }
}
