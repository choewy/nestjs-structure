export enum ConfigPrefix {
  VERSION = 'VERSION',
  DB_MASTER = 'DB_MASTER',
  DB_SLAVE = 'DB_SLAVE',
  JWT = 'JWT',
  BCRYPT = 'BCRYPT',
}

export enum ResponseResult {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum ExceptionMessage {
  UNAUTHORIZED = '인증에 실패하였습니다.',
  ALREADY_EXIST_USER = '이미 존재하는 사용자입니다.',
}

export enum MetadataKey {
  PUBLIC = 'public',
}
