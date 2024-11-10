import { useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useScreenshot } from "use-react-screenshot";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Layout } from "@/components/layout";
import { Members } from "@/components/members";
import { Teams } from "@/components/teams";
import { generateTeams } from "@/utils";
import { TeamType } from "@/types";
import { useQueryState } from "nuqs";

function App() {
  const [queryTeams, setQueryTeams] = useQueryState("teams");
  const [teams, setTeams] = useState<Array<TeamType>>(
    queryTeams ? JSON.parse(decodeURIComponent(atob(queryTeams))) : [],
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const teamsRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, takeScreenshot] = useScreenshot();

  const showShareButton = !!window.navigator.share;

  const onClick = () => {
    const rawData = textAreaRef.current?.value;
    if (!rawData) return;
    const teams = generateTeams(rawData);
    setQueryTeams(btoa(encodeURIComponent(JSON.stringify(teams))));
    setTeams(teams);
  };

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const dw = new DataView(ab);
    for (let i = 0; i < byteString.length; i++) {
      dw.setUint8(i, byteString.charCodeAt(i));
    }
    return new Blob([ab], { type: mimeString });
  };

  const onScreenShotAndShare = async () => {
    const imageData = await takeScreenshot(teamsRef.current);
    const fileBlob = dataURItoBlob(imageData);
    const date = new Date();
    await window.navigator
      .share?.({
        title: "Current teams",
        url: window.location.href,
        files: [
          new File(
            [fileBlob],
            `volley-${date.toLocaleDateString().replace(/\//g, "_")}.png`,
            {
              type: "image/png",
              lastModified: date.getTime(),
            },
          ),
        ],
      })
      .catch(console.log);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    const { id = "", content = [] } = over?.data?.current?.team || {};
    if (!id || id === active.data.current?.tId) return;

    // add member to new team
    const newContent = [...content];
    newContent.push({ ...active.data?.current, tId: id });
    const teamIndex = teams.findIndex((team) => team.id === id);
    const teamsCopy = [...teams];
    teamsCopy[teamIndex] = { id, content: newContent };

    // remove member from old team
    const oldTeamIndex = teams.findIndex(
      (team) => team.id === active.data.current?.tId,
    );
    let oldContent = [...teams[oldTeamIndex].content];

    oldContent = oldContent.filter(
      (member) => member.id !== active.data.current?.id,
    );

    teamsCopy[oldTeamIndex] = {
      id: active.data.current?.tId,
      content: oldContent,
    };

    setQueryTeams(btoa(encodeURIComponent(JSON.stringify([...teamsCopy]))));
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
        {teams.length ? <Teams ref={teamsRef} teams={teams} /> : null}
      </DndContext>

      {teams.length && showShareButton ? (
        <button
          className="p-2 bg-slate-400 rounded-md text-white"
          onClick={onScreenShotAndShare}
        >
          Generate Image and Share
        </button>
      ) : null}
    </Layout>
  );
}

export default App;
