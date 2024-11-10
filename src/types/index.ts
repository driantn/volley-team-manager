export type MemberType = {
  id: string;
  name: string;
  tId: string;
};

export type TeamType = {
  id: string;
  content: Array<MemberType>;
};
