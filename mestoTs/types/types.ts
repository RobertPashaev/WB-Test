export type User = {
  name: string;
  about: string;
  avatar: string;
  _id: string;
};

export type TypeFetch = {
  likes: User[];
  link: string;
  name: string;
  owner: User;
  _id: string;
};
