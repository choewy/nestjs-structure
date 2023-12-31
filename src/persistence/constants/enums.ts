export enum ConfigPrefix {
  SERVER = 'SERVER',
  VERSION = 'VERSION',
  DB_MASTER = 'DB_MASTER',
  DB_SLAVE = 'DB_SLAVE',
  REDIS = 'REDIS',
  JWT = 'JWT',
}

export enum ResponseResult {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum ExceptionMessage {
  UNAUTHORIZED = '인증에 실패하였습니다.',
  ALREADY_EXIST_USER = '이미 존재하는 사용자입니다.',
  NOT_FOUND_USER = '사용자 정보를 찾을 수 없습니다.',
}

export enum MetadataKey {
  PUBLIC = 'public',
}
