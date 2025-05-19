//ensures wherever we want to pass down pet related 'type' use this to avoid repition and errors(adjust as needed later)
export interface Pet {
  postId: number;
  userName: string;
  petName: string;
  location: string;
  status: "not found" | "found";
  imageUrl: string | null; 
}

export interface User {
  email: string;
  userName: string;
}

export interface PetPost {
  postId: number;
  userName: string;
  petName: string;
  location: string;
  status: 'not found' | 'found';
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  breed: string;
}


