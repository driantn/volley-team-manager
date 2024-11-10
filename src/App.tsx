import { useRef, useState } from "react";
import { Layout } from "@/components/layout";
import { Members } from "@/components/members";
import { Teams } from "@/components/teams";
import { generateTeams } from "@/utils";

function App() {
  const [teams, setTeams] = useState<Array<Array<string>>>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    const rawData = textAreaRef.current?.value;
    const teams = generateTeams(rawData);
    console.log(teams);
    setTeams(teams);
  };

  return (
    <Layout>
      <Members ref={textAreaRef} />
      <button
        className="p-2 bg-slate-400 rounded-md text-white"
        onClick={onClick}
      >
        Generate Teams
      </button>

      {teams.length ? <Teams teams={teams} /> : null}
    </Layout>
  );
}

export default App;
