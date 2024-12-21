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
    if (ok === "") {
      alert("인증번호를 입력하세요.");
    } else {
      alert("인증번호를 확인했습니다.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div>
        <b className="text-2xl">환영합니다</b>
      </div>
      <div className="text-gray-500 mt-2">로그인하거나 새 계정을 만드세요</div>
      <div className={"bg-slate-100 w-96 h-12 rounded-lg flex items-center justify-around" + login ? " mt-6":""}>
        <button
          className={`${login ? "bg-gray-300" :"bg-white"} w-44 h-9 rounded-md`}
          onClick={ChangeLogin}
        >
          로그인
        </button>
        <button
          className={`${signup ? "bg-gray-300" :"bg-white"} w-44 h-9 rounded-md`}
          onClick={ChangeSignup}
        >
          회원가입
        </button>
      </div>
      {login ? (
        <Information />
      ) : (
        <div className="w-96 flex flex-col mt-4 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-400 w-full h-10 rounded-md px-2"
              placeholder="홍길동"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm">
              이메일
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="email"
                id="email"
                className="border border-gray-400 w-3/4 h-10 rounded-md px-2"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={`w-1/4 h-10 rounded-md flex items-center justify-center ${
                  confirm
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-black text-white text-sm"
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
            <div className="flex items-center gap-2">
              <input
                type="text"
                name="certification"
                className="border border-gray-400 w-3/4 h-10 rounded-md px-2"
                placeholder="6자리 숫자"
                value={ok}
                onChange={(e) => setOk(e.target.value)}
              />
              <button
                className="bg-black text-white w-1/4 h-10 rounded-md flex items-center justify-center"
                onClick={ClickOk}
              >
                확인
              </button>
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="age" className="text-sm">
                나이
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className="border border-gray-400 h-10 rounded-md px-2"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="gender" className="text-sm">
                성별
              </label>
              <select
                name="gender"
                id="gender"
                className="border border-gray-400 h-10 rounded-md px-2"
              >
                <option value="">성별 선택</option>
                <option value="male">남자</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 w-full">
            <div className="flex flex-col flex-grow">
              <label htmlFor="income" className="text-sm">
                월 수입
              </label>
              <input
                type="number"
                name="income"
                id="income"
                className="border border-gray-400 h-10 rounded-md"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <label htmlFor="time" className="text-sm">
                구매 제한 시간(시)
              </label>
              <input
                type="number"
                name="time"
                id="time"
                className="border border-gray-400 h-10 rounded-md"
              />
            </div>
          </div>
          <button className="bg-black text-white rounded-md h-11 mt-4">
            회원가입
          </button>
        </div>
      )}
    </div>
  );
}
