import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Layout = (props: Props) => {
  const { children } = props;
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen container m-auto p-8">
      {children}
    </div>
  );
};
