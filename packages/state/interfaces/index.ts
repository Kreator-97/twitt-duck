export interface User {
  id            : string
  email         : string
  fullname      : string
  password      : string
  provider      : Provider
  username      : string
  online        : boolean
  description?  : string
  profilePic    : string
  backgroundPic?: string
  followers     : Follow[]
  following     : Follow[]
  posts         : Post
  role          : Role
  active        : Boolean
  notifications : Notification[] 
}

export interface Post {
  id          : string;
  content     : string;
  visibility  : Visibility;
  createdAt   : Date;
  author      : User;
  authorId    : string;
  privacy     : Privacy;
  comments    : Comment[]
  likes       : any[];
  reposts     : any[];
  images      : Images[];
}

export interface Comment {
  id          : string;
  content     : string;
  visibility  : Visibility;
  createdAt   : Date;
  author      : User;
  authorId    : string;
  privacy     : Privacy;
  post?       : Post;
  comment?    : Comment;
  likes       : Like[];
  reposts     : Repost[];
  comments    : Comment[];
}

export interface Repost {
  id               : string;
  author           : User;
  originalPost     : Post;
  originalComment  : Comment
}

export interface Follow {
  id          : string;
  user        : User;
  userId      : string;
  followingId : string;
  followingTo : User;
}

export interface Images {
  id    : string;
  url   : string;
  postId: string
}

export interface Like {
  id  : string;
  user: User;
  post: Post;
}

export interface Notification {
  id        : string;
  title     : string;
  user      : User;
  isRead    : boolean;
  fromUserId: string;
  actionId  : string; 
  type     ?: NotificationType
}

export interface NotificationPayload {
  type      : 'post' | 'comment' | 'repost' | 'user';
  msg       : string;
  id       ?: string;
  username ?: string;
  isNew     : boolean;
}

type NotificationType = 'POST' | 'COMMENT' | 'LIKE'

type Role       = 'USER' | 'ADMIN'
type Provider   = 'CREDENTIALS' | 'GOOGLE'
type Visibility = 'HIDDEN' | 'VISIBLE'
type Privacy    = 'ONLY_ME' | 'ONLY_FOLLOWERS' | 'ALL' 


export interface Feed {
  [key: string]: FeedItem
}

type FeedItem = {
  type  : 'post';
  posts : Post;
} | {
  type    : 'repost';
  reposts : Repost;
} | {
  type    : 'repost-comment';
  comments: Repost;
}