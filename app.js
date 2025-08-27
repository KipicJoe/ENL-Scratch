document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const wordsArea = document.getElementById('words-area');
    const sentenceBuilder = document.getElementById('sentence-builder');
    const pointsElement = document.getElementById('points');
    const starsElement = document.getElementById('stars');

    let points = 0;
    let stars = 0;

    // 获取所有的可拖拽的单词卡片
    const words = document.querySelectorAll('.word-card');
    
    // 为每个单词卡片添加拖拽事件
    words.forEach(word => {
        word.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.textContent);
        });
    });

    // 处理拖拽进入的事件
    sentenceBuilder.addEventListener('dragover', function(e) {
        e.preventDefault(); // 允许放置
    });

    // 处理拖拽释放的事件
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

        // 加入成功动画
        sentenceBuilder.classList.add('success-animation');
    });
});