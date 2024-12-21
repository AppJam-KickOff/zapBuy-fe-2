export default function Information() {
  return (
    <>
      <div className="w-full px-2 mt-2">
        <div>이메일</div>
      </div>
      <input
        type="text"
        name="email"
        className="border border-gray-400 w-96 h-10 rounded-md mt-2 caret px-1"
        placeholder="name@example.com"
      />
      <div className="w-full px-2 mt-4">
        <div>비밀번호</div>
      </div>
      <input
        type="passwrod"
        name="password"
        className="border border-gray-400 w-96 h-10 rounded-md mt-2 caret px-1"
      />
      <button className="bg-black text-sm text-white rounded-md w-96 h-11 mt-6">
        로그인
      </button>
    </>
  );
}
