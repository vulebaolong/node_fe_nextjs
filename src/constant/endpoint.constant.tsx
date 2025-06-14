export const ENDPOINT = {
   AUTH: {
      LOGIN: `auth/login`,
      LOGIN_GOOGLE_AUTHENTICATOR: `auth/login-google-authenticator`,
      REGISTER: `auth/register`,
      REFRESH_TOKEN: `auth/refresh-token`,
      REFRESH_TOKEN_COOKIE: `auth/refresh-token-cookie`,
      GET_INFO: `auth/get-info`,
      FACEBOOK_LOGIN: `auth/facebook-login`,
      GOOGLE_LOGIN: `auth/google-login`,
      RESET_PASSWORD: `auth/reset-password`,
      SEND_EMAIL: `auth/send-email`,
   },
   GOOGLE_AUTHENTICATOR: {
      ON_OFF_GOOGLE_AUTHENTICATOR: `google-authenticator/on-off`,
      GET_QR_GOOGLE_AUTHENTICATOR: `google-authenticator/get-qr`,
   },
   VIDEO: {
      VIDEO_LIST_TEST: `video-list`,
      VIDEO_TYPE_TEST: `video-type`,
      VIDEO_LIST: `video/video-list`,
      VIDEO_TYPE: `video/video-type`,
      VIDEO_DETAIL: `video/video-detail`,
      VIDEO_COMMENT: `video/video-comment`,
      VIDEO_COMMENT_LIST: `video/video-comment-list`,
      VIDEO_LIKE: `video/video-like`,
      VIDEO_DISLIKE: `video/video-dislike`,
      VIDEO_GET_LIKE: `video/video-like`,
      VIDEO_GET_TOAL_LIKE: `video/video-total-like`,
   },
   SESSION_LOGIN: {
      LIST: `session-login/`,
      LOGOUT_DEVICE: `session-login/logout-device`,
   },
   USER: `user`,
   CHAT_GROUP: `chat-group`,
   CHAT_GROUP_BY_TOKEN: `chat-group-by-token`,
   UPLOAD_AVATAR_LOCAL: `user/avatar-local`,
   UPLOAD_AVATAR_CLOUD: `user/avatar-cloud`,
   ROLE: `role`,
   TOGGLE_PERMISSION: `role/toggle-permission`,
   PERMISSION_GROUP_BY_MODULE: `permission/group-by-module`,
   PAYMENT_MOMO: `payment/momo-pay`,
   CAR: "car/cars-list",
   ARTICLE: {
      LIST: "article",
      CREATE: "article",
   },
   REACTION_ARTICLE: {
      CREATE: "reaction-article",
      GET_LIST: "reaction-article",
      DELETE: "reaction-article",
      UPDATE: "reaction-article",
   },
   CHAT_MESSAGE: "chat-message",
};
