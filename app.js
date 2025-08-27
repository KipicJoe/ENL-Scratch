document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  const wordsArea = document.getElementById('words-area');
  const sentenceBuilder = document.getElementById('sentence-builder');
  const pointsElement = document.getElementById('points');
  const starsElement = document.getElementById('stars');

  let points = 0;
  let stars = 0;

  // 加载单词和翻译
  fetch('words.txt')  // 假设你的 words.txt 文件放在同一目录下
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      lines.forEach(line => {
        const [word, translation] = line.split('|');
        if (word && translation) {
          createWordCard(word, translation);
        }
      });
    })
    .catch(error => console.error('加载单词失败:', error));

  // 创建单词卡片
  function createWordCard(word, translation) {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.setAttribute('draggable', 'true');
    wordCard.textContent = word;

    const translationDiv = document.createElement('div');
    translationDiv.classList.add('word-translation');
    translationDiv.textContent = translation;
    wordCard.appendChild(translationDiv);

    // 添加拖拽事件
    wordCard.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text', word);
      e.target.style.opacity = 0.5;  // 拖动时改变透明度
    });

    wordCard.addEventListener('dragend', function(e) {
      e.target.style.opacity = 1;  // 拖动结束时恢复透明度
    });

    wordsArea.appendChild(wordCard);  // 将卡片添加到页面中
  }

  // 允许将元素拖放到句子构建区
  sentenceBuilder.addEventListener('dragover', function(e) {
    e.preventDefault(); // 允许放置
  });

  // 处理拖放单词到句子区域
  sentenceBuilder.addEventListener('drop', function(e) {
    e.preventDefault();
    const word = e.dataTransfer.getData('text'); // 获取被拖拽的单词
    const wordElement = document.createElement('span'); // 创建一个新的 span 元素
    wordElement.textContent = word;
    wordElement.style.margin = '5px';
    sentenceBuilder.appendChild(wordElement); // 将拖拽的单词加入到句子区域

    // 每成功构建一个句子增加积分
    points++;
    pointsElement.textContent = points;

    // 每5个句子奖励1颗星星
    if (points % 5 === 0) {
      stars++;
      starsElement.textContent = '★'.repeat(stars);
    }

    // 添加成功动画
    sentenceBuilder.classList.add('success-animation');

    // 判断并给出反馈（正确/错误）
    const sentence = sentenceBuilder.textContent.trim();
    if (sentence === 'I am happy') {
      alert("正确！");
    } else {
      alert("句子不完整或语法错误，请继续尝试！");
    }
  });
});