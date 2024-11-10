import { MemberType } from "@/types";
import { v4 as uuidv4 } from "uuid";

const MAX_TEAM_MEMBERS = 4;

export const generateTeams = (rawData?: string) => {
  if (!rawData) return [];

  const initNames = rawData.split("\n").map((name) => {
    const chunks = name.trim().replace(" ", "").split(".");
    if (chunks.length === 1) return chunks[0];
    return chunks[1];
  });

  if (!initNames.length) return [];

  const maxTeams = Math.ceil(initNames.length / MAX_TEAM_MEMBERS);
  const names = [...initNames].filter((name) => name && !name.includes("-"));
  const teams = Array(maxTeams)
    .fill(1)
    .map(() => {
      const team: Array<MemberType> = [];
      const tId = uuidv4().split("-")[4];
      Array(MAX_TEAM_MEMBERS)
        .fill(1)
        .forEach(() => {
          const randomIndex = Math.floor(Math.random() * names.length);
          const randomName = names[randomIndex];
          team.push({ id: uuidv4().split("-")[4], name: randomName });
          names.splice(randomIndex, 1);
        });
      return { id: tId, content: team };
    });

  return teams;
};
