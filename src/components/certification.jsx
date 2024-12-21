export default function Certification() {
  return (
    <>
      <div className="w-full px-2 mt-2">
        <div>이메일</div>
      </div>
      <div className="w-full px-2 flex justify-between">
        <input
          type="text"
          name="email"
          className="border border-gray-400 w-64 h-10 rounded-md mt-2"
          placeholder="  name@example.com"
        />
        <button className="bg-black w-28 rounded-md mt-2 text-white text-sm">인증번호 전송</button>
      </div>
      <div className="w-full px-2 mt-4">
        <div>비밀번호</div>
      </div>
      <input
        type="passwrod"
        name="password"
        className="border border-gray-400 w-96 h-10 rounded-md mt-2"
      />

      <button className="bg-black text-sm text-white rounded-md w-96 h-11 mt-6">
        로그인
      </button>
    </>
  );
}
