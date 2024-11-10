import { TeamType } from "@/types";
import { Team } from "./team";
import { forwardRef } from "react";

type Props = {
  teams: Array<TeamType>;
};

const flatColors = [
  "#1abc9c",
  "#3498db",
  "#e67e22",
  "#34495e",
  "#f39c12",
  "#8e44ad",
  "#7f8c8d",
  "#2c2c54",
  "#ccae62",
  "#d1ccc0",
  "#C2D8B9",
  "#A1B5D8",
  "#3D3B8E",
];

export const Teams = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { teams } = props;

  return (
    <div
      ref={ref}
      className="grid gap-2 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 border border-slate-400 rounded-md w-full p-2 bg-slate-300"
    >
      {teams.map((team, index) => {
        return (
          <Team
            team={team}
            key={team.id}
            style={{ backgroundColor: flatColors[index] }}
          />
        );
      })}
    </div>
  );
});
