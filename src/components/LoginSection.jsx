import { useState } from "react";
import { serverUrl } from "../util";

export default function LoginSection() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendLoginReq() {
    fetch(`${serverUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("로그인 성공");
        } else {
          alert("로그인 실패");
        }
      })
      .catch((err) => {
        alert("로그인 중 오류 발생:", err);
      });
  }

  return (
    <>
      <div className="w-full px-2 mt-2">
        <div>이메일</div>
      </div>
      <input
        type="text"
        name="username"
        className="border border-gray-400 w-96 h-10 rounded-md mt-2 caret px-1"
        placeholder="name@example.com"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="w-full px-2 mt-4">
        <div>비밀번호</div>
      </div>
      <input
        type="passwrod"
        name="password"
        className="border border-gray-400 w-96 h-10 rounded-md mt-2 caret px-1"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={sendLoginReq}
        className="bg-black text-sm text-white rounded-md w-96 h-11 mt-6"
      >
        로그인
      </button>
    </>
  );
}
