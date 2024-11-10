import { useDroppable } from "@dnd-kit/core";
import { TeamType } from "@/types";
import { Member } from "./member";

type Props = {
  team: TeamType;
  style: Record<string, string>;
};

export const Team = (props: Props) => {
  const { team, style: customStyle } = props;
  const { id, content } = team;

  const { setNodeRef } = useDroppable({
    id,
    data: { team },
  });

  return (
    <div
      ref={setNodeRef}
      style={customStyle}
      className="p-2 text-white empty:hidden rounded-md"
    >
      {content
        .filter((member) => member.name)
        .map((member) => {
          return <Member {...member} key={member.id} />;
        })}
    </div>
  );
};
