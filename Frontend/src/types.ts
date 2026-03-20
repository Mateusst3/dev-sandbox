export type User = {
  id: string;
  name: string;
  email: string;
};

export type Session = {
  token: string;
  user: User;
};

export type Message = {
  id: string;
  role: "USER" | "AI";
  content: string;
  createdAt: string;
};
