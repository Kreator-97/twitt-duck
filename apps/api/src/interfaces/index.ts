export interface ApiResponse {
  msg   : string;
  ok    : boolean;
  error?: string;
}

export interface NotificationInfo {
  type      : 'post' | 'comment' | 'repost' | 'user';
  msg       : string;
  id       ?: string;
  isNew     : boolean;
  username ?: string;
}
