import { TeamType } from "@/types";
import { Team } from "./team";

type Props = {
  teams: Array<TeamType>;
};

export const Teams = (props: Props) => {
  const { teams } = props;

  return (
    <div className="grid gap-2 auto-cols-fr border border-slate-400 rounded-md grid-flow-col w-full p-2 bg-slate-300">
      {teams.map((team) => {
        return <Team team={team} key={team.id} />;
      })}
    </div>
  );
};
