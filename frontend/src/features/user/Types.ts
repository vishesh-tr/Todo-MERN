
  // export interface User {
  //   _id: String;
  //   name: String;
  //   email: String;
  //   password?: String;
  //   username : String
  //   role: "admin" | "user";
  // }
  
  // export interface UserState {
  //   users: User[];
  //   loading : boolean;
  //   error : string|null;
  //   total : number;
  //   page : number;
  //   limit : number;
  // }








  export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  }
  
  export interface Todo {
    _id?: string;
    id: number;
    text: string;
    completed: boolean;
    userId: string;
    userEmail?: string; // Made optional
  }
  