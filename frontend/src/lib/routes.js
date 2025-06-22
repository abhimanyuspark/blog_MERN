export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/sign-up",
    LOGOUT: "/auth/logout",
    GOOGLE_LOGIN: "/auth/google-login",
    CHECK: "/auth/check",
  },
  DASHBOARD: {
    GET_DATA: "/dashboard",
  },
  AI: {
    GEN_BLOG_POST: "/ai/generate",
    GEN_BLOG_POST_IDEAS: "/ai/generate-ideas",
    GEN_COMMENTS_REPLY: "/ai/generate-reply",
    GEN_POST_SUMMERY: "/ai/generate-summery",
  },
  BLOG_POSTS: {
    CREATE: "/blogs",
    GET_ALL: "/blogs",
    GET_TRENDING: "/blogs/trending",
    GET_SEARCH: "/blogs/search",
    GET_POST_BY_ID: (id) => `/blogs/${id}`,
    UPDATE: (id) => `/blogs/${id}`,
    DELETE: (id) => `/blogs/${id}`,
    GET_BY_TAG: (id) => `/blogs/tag/${id}`,
    GET_BY_SLUG: (id) => `/blogs/slug/${id}`,
    VIEWS: (id) => `/blogs/${id}/views`,
    LIKES: (id) => `/blogs/${id}/likes`,
  },
  COMMENTS: {
    GET_ALL: "/comments",
    GET_COMMENT_BY_POST: (id) => `/comments/${id}`,
    CREATE_COMMENT_BY_POST: (id) => `/comments/${id}`,
    UPDATE_COMMENT_BY_ID: (id) => `/comments/${id}`,
    DELETE_COMMENT_BY_ID: (id) => `/comments/${id}`,
  },
};
