import { useDroppable } from "@dnd-kit/core";
import { TeamType } from "@/types";
import { Member } from "./member";

type Props = {
  team: TeamType;
};

export const Team = (props: Props) => {
  const { team } = props;
  const { id, content } = team;

  const { isOver, setNodeRef } = useDroppable({
    id,
    data: { team },
  });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-2">
      {content
        .filter((member) => member.name)
        .map((member) => {
          return <Member {...member} key={member.id} />;
        })}
    </div>
  );
};
