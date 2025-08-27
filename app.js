document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const wordsArea = document.getElementById('words-area');
    const sentenceBuilder = document.getElementById('sentence-builder');
    const pointsElement = document.getElementById('points');
    const starsElement = document.getElementById('stars');

    let points = 0;
    let stars = 0;

    // 获取所有的单词卡片
    const words = document.querySelectorAll('.word-card');
    
    // 为每个单词卡片添加拖拽事件
    words.forEach(word => {
        word.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.textContent);
            e.target.style.opacity = 0.5;  // 拖动时改变透明度
        });

        word.addEventListener('dragend', function(e) {
            e.target.style.opacity = 1;  // 拖动结束时恢复透明度
        });
    });

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
        // 在这个示例中，我们简单假设 "I am happy" 是正确的句子。
        const sentence = sentenceBuilder.textContent.trim();
        if (sentence === 'I am happy') {
            alert("正确！");
        } else {
            alert("句子不完整或语法错误，请继续尝试！");
        }
    });
});