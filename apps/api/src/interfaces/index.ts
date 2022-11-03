export interface ApiResponse {
  msg   : string;
  ok    : boolean;
  error?: string;
}

export interface NotificationInfo {
  type  : 'post' | 'comment' | 'repost';
  msg   : string;
  id    : string;
  isNew : boolean;
}
