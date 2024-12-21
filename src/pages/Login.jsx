import { use, useState } from "react";
import LoginSection from "../components/LoginSection";

export default function Login() {
  const [login, setLogin] = useState(true);
  const [signup, setSignup] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //인증번호호
  const [ok, setOk] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [income, setIncome] = useState(0);
  const [time, setTime] = useState(0);

  function ChangeLogin() {
    setLogin(true);
    setSignup(false);
  }

  function ChangeSignup() {
    setLogin(false);
    setSignup(true);
  }

  //인증번호 전송송
  function handleForwarding() {
    if (!email.trim()) {
      alert("Email을 작성하세요.");
    } else {
      fetch("serverUrl/user/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("인증번호 전송 실패");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("인증번호 전송 중 오류가 발생했습니다.");
        });
      setConfirm(true);
    }
  }

  function submit() {
    if (
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim() ||
      !name.trim() ||
      !age
    ) {
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    fetch("serverUrl/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        age: age,
        token: ok,
        gender: gender === "남자" ? true : false,
        money: income,
        time: time,
      }),
    }).then((response) => {
      if (response.ok) {
        setLogin(true);
        setSignup(false);
      } else {
        alert("회원가입 실패");
      }
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div>
        <b className="text-2xl">환영합니다</b>
      </div>
      <div className="text-gray-500 mt-2">로그인하거나 새 계정을 만드세요</div>
      <div
        className={
          "bg-slate-100 w-96 h-12 rounded-lg flex items-center justify-around" +
          login
            ? " mt-6"
            : ""
        }
      >
        <button
          className={`${
            login ? "bg-gray-300" : "bg-white"
          } w-44 h-9 rounded-md`}
          onClick={ChangeLogin}
        >
          로그인
        </button>
        <button
          className={`${
            signup ? "bg-gray-300" : "bg-white"
          } w-44 h-9 rounded-md`}
          onClick={ChangeSignup}
        >
          회원가입
        </button>
      </div>
      {login ? (
        <LoginSection />
      ) : (
        <div className="w-96 flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm">
              이름
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border border-gray-400 w-full h-10 rounded-md px-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                className="border border-gray-400 w-full h-10 rounded-md px-2"
                placeholder="6자리 숫자"
                value={ok}
                onChange={(e) => setOk(e.target.value)}
              />
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label htmlFor="password" className="text-sm">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border border-gray-400 h-10 rounded-md px-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[174px]">
              <label htmlFor="password-confirm" className="text-sm">
                비밀번호 확인
              </label>
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                className="border border-gray-400 h-10 rounded-md px-2"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
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
                value={age}
                onChange={(e) => setAge(e.target.value)}
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
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
                value={income}
                onChange={(e) => setIncome(e.target.value)}
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
                value={time}
                onChange={(e) => setTime(e.target.value)}
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
