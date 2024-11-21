export const FILE_MIMETYPE = {
  IMAGE_PNG: 'image/png',
} as const;

export type TFILE_MIMETYPE = (typeof FILE_MIMETYPE)[keyof typeof FILE_MIMETYPE];

export const FILE_ENUM = {
  IMAGE: 'image',
  FILE: 'file',
} as const;

export type FILE_ENUM_TYPE = (typeof FILE_ENUM)[keyof typeof FILE_ENUM];
