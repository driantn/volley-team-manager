export type MemberType = {
  id: string;
  name: string;
  teamId: string;
};

export type TeamType = {
  id: string;
  content: Array<MemberType>;
};
