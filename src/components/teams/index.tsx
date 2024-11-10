import { TeamType } from "@/types";
import { Team } from "./team";
import { forwardRef } from "react";

type Props = {
  teams: Array<TeamType>;
};

export const Teams = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { teams } = props;

  return (
    <div
      ref={ref}
      className="grid gap-2 auto-cols-fr border border-slate-400 rounded-md grid-flow-col w-full p-2 bg-slate-300"
    >
      {teams.map((team) => {
        return <Team team={team} key={team.id} />;
      })}
    </div>
  );
});
