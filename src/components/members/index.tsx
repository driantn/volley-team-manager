import { forwardRef } from "react";

export const Members = forwardRef<HTMLTextAreaElement>((_, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h3>Add member names</h3>
      <textarea
        ref={ref}
        id="members"
        name="members"
        className="border border-slate-400 rounded-md p-2 outline-none"
        rows={10}
      />
    </div>
  );
});
