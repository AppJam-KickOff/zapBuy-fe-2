chrome.webRequest.onCompleted.addListener(
  (details) => {
    // 특정 URL 요청이 완료되었을 때
    if (details.url.includes("https://www.coupang.com/np")) {
      // 페이지가 로드된 후 content.js에 메시지 전송
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "ajaxLoaded" });
      });
    }
    if (details.url.includes("https://cart.coupang.com/")) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "cartLoading" });
      });
    }
  },
  { urls: ["https://www.coupang.com/*"] }
);
