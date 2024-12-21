import { useState } from "react";
import Information from "../components/information";

export default function Login() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [ok, setOk] = useState("");

  function ChangeLogin() {
    setLogin(true);
    setSignup(false);
  }

  function ChangeSignup() {
    setLogin(false);
    setSignup(true);
  }

  function handleForwarding() {
    if (!email.trim()) {
      alert("Email을 작성하세요.");
    } else {
      alert("인증번호가 전송되었습니다.");
      setConfirm(true);
      setEmail("");
    }
  }
  function ClickOk() {
    if (ok=="") {
      alert("인증번호를 입력하세요.");
    } else {
      alert("인증번호를 확인했습니다.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div>
        <b className="text-2xl">환영합니다</b>
      </div>
      <div className="text-gray-500 mt-2">로그인하거나 새 계정을 만드세요</div>
      <div className="bg-slate-100 w-96 h-12 rounded-lg flex items-center justify-around mt-6">
        <button
          className={`${login ? "bg-white" : "bg-gray"} w-44 h-9 rounded-md`}
          onClick={ChangeLogin}
        >
          로그인
        </button>
        <button
          className={`${signup ? "bg-white" : "bg-gray"} w-44 h-9 rounded-md`}
          onClick={ChangeSignup}
        >
          회원가입
        </button>
      </div>
      {login ? (
        <Information />
      ) : (
        <>
          <div className="w-full px-2 mt-2">
            <div>이름</div>
          </div>
          <input
            type="text"
            name="name"
            className="border border-gray-400 w-96 h-10 rounded-md mt-2 caret-black px-1"
            required
            placeholder="홍길동"
          />
          <div className="w-full px-2 mt-2">
            <div>이메일</div>
          </div>
          <div className="w-full px-2">
            <div className="flex justify-between items-center gap-2">
              <input
                type="text"
                name="email"
                className="border border-gray-400 w-64 h-10 rounded-md px-1"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`w-28 h-10 rounded-md flex items-center justify-center ${
                  confirm
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-black text-white"
                }`}
                onClick={handleForwarding}
                disabled={confirm}
              >
                {confirm ? "전송됨" : "인증번호 전송"}
              </button>
            </div>
            {confirm && (
              <div className="mt-2 text-sm text-green-500">
                인증번호가 전송되었습니다.
              </div>
            )}
          </div>
          {confirm && (
            <div className="w-full px-2 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="certification"
                  className="border border-gray-400 w-72 h-10 rounded-md px-1"
                  placeholder="6자리 숫자"
                  value={ok}
                  onChange={(e) => setOk(e.target.value)}
                />
                <button
                  className="bg-black text-white w-16 h-10 rounded-md flex items-center justify-center"
                  onClick={ClickOk}
                >
                  확인
                </button>
              </div>
            </div>
          )}

          <div className="w-full px-2 mt-4">
            <div>비밀번호</div>
          </div>
          <input
            type="password"
            name="password"
            className="border border-gray-400 w-96 h-10 rounded-md mt-2 px-1"

          />
          <button className="bg-black text-sm text-white rounded-md w-96 h-11 mt-6">
            회원가입
          </button>
        </>
      )}
    </div>
  );
}
