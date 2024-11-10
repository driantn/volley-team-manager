import { MemberType } from "@/types";
import { useDraggable } from "@dnd-kit/core";

type Props = MemberType;

export const Member = (props: Props) => {
  const { name, id, teamId } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { id, name, teamId },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <h3
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="hover:bg-slate-400 p-2 touch-none focus:bg-slate-400"
    >
      {name}
    </h3>
  );
};
