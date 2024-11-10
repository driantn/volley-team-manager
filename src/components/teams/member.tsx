import { MemberType } from "@/types";
import { useDraggable } from "@dnd-kit/core";

type Props = MemberType & { tId: string };

export const Member = (props: Props) => {
  const { name, id, tId } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { id, name, tId },
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
      className="hover:bg-slate-400 p-2 touch-none focus:bg-slate-400 rounded-md"
    >
      {name}
    </h3>
  );
};
