function messageToScan() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "querySelector") {
      // 예시: body 태그를 선택
      const element = document.querySelector("body");
      console.log("Selected Element:", element);
      // 필요한 작업 수행
      sendResponse({ status: "success", elementText: element.innerText });
    }
  });
}

export default function App() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <button
        onClick={() => {
          chrome.runtime.sendMessage(
            { action: "querySelector" },
            (response) => {
              console.log("Received Response:", response);
            }
          );
        }}
      >
        Test
      </button>
    </div>
  );
}
