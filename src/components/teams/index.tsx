type Props = {
  teams: Array<Array<string>>;
};
export const Teams = (props: Props) => {
  const { teams } = props;

  return (
    <div className="grid gap-2 auto-cols-fr border border-slate-400 rounded-md grid-flow-col w-full p-2 bg-slate-300">
      {teams.map((team, index) => {
        return (
          <div key={`team-${index}`} className="p-2">
            {team.map((member, index) => {
              return (
                <h3
                  key={`${member}-${index}`}
                  className="hover:bg-slate-400 p-2"
                >
                  {member}
                </h3>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
