document.addEventListener('DOMContentLoaded', function() {
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const encodeBtn = document.getElementById('encodeBtn');
  const decodeBtn = document.getElementById('decodeBtn');
  const clearBtn = document.getElementById('clearBtn');
  const copyBtn = document.getElementById('copyBtn');
  const copyNotification = document.getElementById('copyNotification');
  
  encodeBtn.addEventListener('click', function() {
    outputText.value = encodeToUnicodeEscape(inputText.value);
  });
  
  decodeBtn.addEventListener('click', function() {
    outputText.value = decodeFromUnicodeEscape(inputText.value);
  });
  
  clearBtn.addEventListener('click', function() {
    inputText.value = '';
    outputText.value = '';
  });
  
  copyBtn.addEventListener('click', function() {
    if (outputText.value) {
      // 選擇文本
      outputText.select();
      // 執行複製命令
      document.execCommand('copy');
      // 或使用新的 API (如果瀏覽器支持)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(outputText.value);
      }
      // 顯示通知
      copyNotification.classList.add('show-notification');
      // 2秒後隱藏通知
      setTimeout(function() {
        copyNotification.classList.remove('show-notification');
      }, 2000);
    }
  });
  
  // Unicode 轉義序列編碼
  function encodeToUnicodeEscape(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      if (code < 128) {
        // ASCII 字符直接保留
        result += text.charAt(i);
      } else {
        // 非 ASCII 字符轉換為 \uXXXX 格式
        const hex = code.toString(16).padStart(4, '0');
        result += '\\u' + hex;
      }
    }
    return result;
  }
  
  // Unicode 轉義序列解碼
  function decodeFromUnicodeEscape(text) {
    return text.replace(/\\u([0-9a-fA-F]{4})/g, function(match, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    });
  }
}); 