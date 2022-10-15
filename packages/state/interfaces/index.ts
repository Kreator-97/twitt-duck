export interface User {
  id          : string
  email       : string
  fullname    : string
  password    : string
  provider    : Provider
  username    : string
  online      : boolean
  description : string
  profilePic  : string
  followers   : number
  following   : number
  posts       : Post
  role        : Role
}

export interface Post {
  id          : string;
  content     : string;
  visibility  : Visibility;
  createdAt   : Date;
  author      : User;
  authorId    : string;
  privacy     : Privacy;
  comments    : number;
  likes       : number;
  reposts     : number;
}

type Role = 'USER' | 'ADMIN'

type Provider = 'CREDENTIALS' | 'GOOGLE'

type Visibility = 'HIDDEN' | 'VISIBLE'

type Privacy = 'ONLY_ME' | 'ONLY_FOLLOWERS' | 'ALL' 