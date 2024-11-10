export type MemberType = {
  id: string;
  name: string;
};

export type TeamType = {
  id: string;
  content: Array<MemberType>;
};
