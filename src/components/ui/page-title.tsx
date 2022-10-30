import { useState } from "react";

interface PageTitleProps {
  title: string;
  email?: string;
}

const PageTitle = ({ title, email }: PageTitleProps) => {
  const getUserName = (email: string) => {
    return email.substring(0, email.lastIndexOf("@"));
  };

  const [userName] = useState(email && getUserName(email));

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl">{title}</h1>
      {title === "Dashboard" ? (
        <h1 className="text-lg font-medium text-[#5c6473] mb-5">
          Hello, {userName}
        </h1>
      ) : (
        ""
      )}
    </div>
  );
};
export default PageTitle;
