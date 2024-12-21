import { useState, useEffect } from "react";
import axios from "axios";
import Information from "../components/information";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 사용자 정보 요청
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // AccessToken 저장된 값 가져오기
        if (!token) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        const response = await axios.get("/user/info", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 인증
          },
        });
        setUserInfo(response.data); // 회원정보 설정
        setIsLoggedIn(true);
      } catch (error) {
        console.error("로그인 정보 불러오기 실패", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {isLoggedIn ? (
        <div className="bg-white shadow-md p-6 rounded-md w-96">
          <h2 className="text-2xl font-bold mb-4">회원 정보</h2>
          <div className="text-left">
            <p><strong>이메일:</strong> {userInfo?.email}</p>
            <p><strong>이름:</strong> {userInfo?.name}</p>
            <p><strong>나이:</strong> {userInfo?.age}</p>
            <p><strong>성별:</strong> {userInfo?.gender ? "남성" : "여성"}</p>
            <p><strong>자산:</strong> {userInfo?.money}원</p>
            <p><strong>가입 시간:</strong> {userInfo?.time} 시간</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center">
          <div>
            <b className="text-2xl">환영합니다</b>
          </div>
          <div className="text-gray-500 mt-2">로그인하거나 새 계정을 만드세요</div>
          <div className="bg-slate-100 w-96 h-12 rounded-lg flex items-center justify-around mt-6">
            <button
              className="bg-black text-white w-44 h-9 rounded-md"
              onClick={() => console.log("로그인 버튼 클릭")}
            >
              로그인
            </button>
            <button
              className="bg-gray text-black w-44 h-9 rounded-md"
              onClick={() => console.log("회원가입 버튼 클릭")}
            >
              회원가입
            </button>
          </div>
          <Information />
        </div>
      )}
    </div>
  );
}

