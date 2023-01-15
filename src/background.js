
var statusMap = {}

chrome.action.onClicked.addListener((tab) => {
  if (statusMap[tab.id] == 1) {
    chrome.debugger.detach({ tabId: tab.id })
    statusMap[tab.id] = 0
  } else {
    chrome.debugger.attach({
      tabId: tab.id
    }, "1.2").then(() => {
      statusMap[tab.id] = 1
      chrome.debugger.sendCommand({
        tabId: tab.id
      }, "Emulation.setEmulatedMedia", { media: "screen", features: [{ name: "prefers-color-scheme", value: "light" }] })
    }).then(() => { })
  }
})
chrome.debugger.onDetach.addListener((s, r) => {
  statusMap[s.tabId] = 0
})