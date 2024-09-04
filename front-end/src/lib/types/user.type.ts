// user.types.ts
export interface Users { 
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    password: string;
    status:string;
  }

  

  export type DataRes<Data> = {
      data: Data
      error?: boolean;
  }


  export interface UsersRes {
    data:Users[]
  }

  export interface ResponseData {
    error?: boolean;
    message?: string;
    data?: any; // Replace `any` with a more specific type if possible
  }
  