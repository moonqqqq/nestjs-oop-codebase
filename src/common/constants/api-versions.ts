export const API_VERSION = {
  ONE: 'v1',
} as const;

export type API_VERSION_TYPES = (typeof API_VERSION)[keyof typeof API_VERSION];

export const API_ENDPOINT = {
  AUTH: 'auth',
  UPLOAD: 'upload',
  USERS: 'users',
  INPUT_FILES: 'input-files',
} as const;
