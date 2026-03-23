"use client";

import { getUsersAction } from "../actions/user.action";

export default function TestContainer() {
  const handleTest = async () => {
    const users = await getUsersAction();
    console.log(users);
  };

  return (
    <div>
      <button onClick={handleTest}>test</button>
    </div>
  );
}
