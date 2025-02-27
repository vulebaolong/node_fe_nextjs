export const ENDPOINT = {
   AUTH: {
      LOGIN: `auth/login`,
      REGISTER: `auth/register`,
      REFRESH_TOKEN: `auth/refresh-token`,
      REFRESH_TOKEN_COOKIE: `auth/refresh-token-cookie`,
      GET_INFO: `auth/get-info`,
      FACEBOOK_LOGIN: `auth/facebook-login`,
      GOOGLE_LOGIN: `auth/google-login`,
      RESET_PASSWORD: `auth/reset-password`,
      SEND_EMAIL: `auth/send-email`,
   },
   TWO_FA: {
      CHECK_2FA_BEFORE_LOGIN: `two-fa/check-2fa-before-login`,
      ON_OFF_2FA: `two-fa/on-off-2fa`,
      GET_QR_2FA: `two-fa/get-qr`,
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
   CHAT: {
      BASE: (id = "") => `/chat/${id}`,
      LIST_USER_CHAT: `chat/list-user-chat`,
   },
   USER: `user`,
   UPLOAD_AVATAR_LOCAL: `user/avatar-local`,
   UPLOAD_AVATAR_CLOUD: `user/avatar-cloud`,
   ROLE: `role`,
   TOGGLE_PERMISSION: `role/toggle-permission`,
   PERMISSION_GROUP_BY_MODULE: `permission/group-by-module`,
   PAYMENT_MOMO: `payment/momo-pay`,
   CAR: "car/cars-list",
   ARTICLE: {
      LIST: "article",
      CREATE: "article"
   },
   REACTION_ARTICLE: {
      CREATE: "reaction-article",
      GET_LIST: "reaction-article",
      DELETE: "reaction-article",
      UPDATE: "reaction-article",
   }
};
