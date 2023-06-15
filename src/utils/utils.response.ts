import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  status: number;
  message: string;
  data: any;

  constructor({ status, message, data }: Partial<BaseResponse>) {
    this.status = status || HttpStatus.OK;
    this.message = message || 'OK';
    this.data = data || null;
  }
}
export class InternalServerError extends BaseResponse {
  constructor({ data = null, message = 'Internal server error' }) {
    super({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      data,
    });
  }
}
export class NotFoundResponse extends BaseResponse {
  constructor({ data = null, message = 'NOT FOUND' }) {
    super({
      status: HttpStatus.NOT_FOUND,
      message,
      data,
    });
  }
}
