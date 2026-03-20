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
  chatId: string;
  role: "USER" | "AI";
  content: string;
  createdAt: string;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
