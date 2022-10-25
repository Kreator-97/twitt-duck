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
  followers     : number
  following     : number
  posts         : Post
  role          : Role
  active        : Boolean
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
  comments    : Number;
  likes       : Like[];
  reposts     : number;
}

export interface Images {
  id    : string;
  url   : string;
  postId: string
}

export interface Like {
  id: string;
  user: User;
  post: {
    id: string
  };
}

type Role = 'USER' | 'ADMIN'
type Provider = 'CREDENTIALS' | 'GOOGLE'
type Visibility = 'HIDDEN' | 'VISIBLE'
type Privacy = 'ONLY_ME' | 'ONLY_FOLLOWERS' | 'ALL' 
