import { HttpStatus } from '@nestjs/common';

import { ResponseResult } from '@app/persistence/constants';

export class ResponseDto<D> {
  result: ResponseResult;
  status: HttpStatus;
  data: D;

  constructor(result: ResponseResult, status: HttpStatus, data: D) {
    this.result = result;
    this.status = status;
    this.data = data;
  }

  public static success<D>(status: HttpStatus, data: D) {
    return new ResponseDto(ResponseResult.SUCCESS, status, data);
  }

  public static failed<D>(status: HttpStatus, data: D) {
    return new ResponseDto(ResponseResult.FAILED, status, data);
  }
}
