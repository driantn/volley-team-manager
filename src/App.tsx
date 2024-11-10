import { useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Layout } from "@/components/layout";
import { Members } from "@/components/members";
import { Teams } from "@/components/teams";
import { generateTeams } from "@/utils";
import { TeamType } from "@/types";

function App() {
  const [teams, setTeams] = useState<Array<TeamType>>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    const rawData = textAreaRef.current?.value;
    const teams = generateTeams(rawData);
    console.log(teams);
    setTeams(teams);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const { id = "", content = [] } = over?.data?.current?.team || {};

    // add member to new team
    const newContent = [...content];
    newContent.push({ ...active.data?.current, teamId: id });
    const teamIndex = teams.findIndex((team) => team.id === id);
    const teamsCopy = [...teams];
    teamsCopy[teamIndex] = { id, content: newContent };

    // remove member from old team
    const oldTeamIndex = teams.findIndex(
      (team) => team.id === active.data.current?.teamId,
    );
    let oldContent = [...teams[oldTeamIndex].content];

    oldContent = oldContent.filter(
      (member) => member.id !== active.data.current?.id,
    );

    teamsCopy[oldTeamIndex] = {
      id: active.data.current?.teamId,
      content: oldContent,
    };

    setTeams([...teamsCopy]);
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

      <DndContext onDragEnd={handleDragEnd}>
        {teams.length ? <Teams teams={teams} /> : null}
      </DndContext>
    </Layout>
  );
}

export default App;
