document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start-btn');
    const wordsArea = document.getElementById('words-area');
    const sentenceBuilder = document.getElementById('sentence-builder');
    const pointsElement = document.getElementById('points');
    const starsElement = document.getElementById('stars');
    const sentenceTypeSelect = document.getElementById('sentence-type');
    const clauseTypeSelect = document.getElementById('clause-type');

    let points = 0;
    let stars = 0;
    let words = [];

    // 假设从 words.txt 中读取单词并生成单词数组
    fetch('words.txt')  // 确保 words.txt 文件路径正确
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                const [word, translation] = line.split(',');
                if (word && translation) {
                    words.push({ word, translation });
                }
            });
        })
        .catch(error => console.error('加载单词失败:', error));

    // 点击开始按钮时加载单词卡片
    startBtn.addEventListener('click', function() {
        wordsArea.innerHTML = '';
        sentenceBuilder.innerHTML = '<p>拖动单词和语法卡片来构造句子！</p>';

        // 获取选中的句子类型和从句类型
        const sentenceType = sentenceTypeSelect.value;
        const clauseType = clauseTypeSelect.value;

        // 根据选择的语法类型生成句子结构
        generateSentence(sentenceType, clauseType);
    });

    // 随机生成可以组成的句子（根据选择的语法类型）
    function generateSentence(sentenceType, clauseType) {
        let selectedWords = [];
        let sentenceStructure = [];

        // 生成句子结构，根据语法类型选择不同的单词
        if (sentenceType === 'simple') {
            // 简单句：主语 + 动词 + 宾语
            selectedWords = words.filter(w => w.word === 'I' || w.word === 'am' || w.word === 'happy');
            sentenceStructure = ['Subject', 'Verb', 'Object'];
        } else if (sentenceType === 'compound') {
            // 复合句：主语 + 动词 + 连接词 + 主语 + 动词
            selectedWords = words.filter(w => w.word === 'I' || w.word === 'am' || w.word === 'happy' || w.word === 'and');
            sentenceStructure = ['Subject', 'Verb', 'Conjunction', 'Subject', 'Verb'];
        } else if (sentenceType === 'complex') {
            // 复杂句：主语 + 动词 + 从句
            selectedWords = words.filter(w => w.word === 'I' || w.word === 'am' || w.word === 'happy' || w.word === 'because');
            sentenceStructure = ['Subject', 'Verb', 'Clause'];
        }

        // 将随机单词添加到单词卡片区
        selectedWords.forEach(wordObj => {
            const wordCard = document.createElement('div');
            wordCard.classList.add('word-card');
            wordCard.draggable = true;
            wordCard.textContent = wordObj.word;

            // 添加翻译
            const translationDiv = document.createElement('div');
            translationDiv.classList.add('word-translation');
            translationDiv.textContent = wordObj.translation;
            wordCard.appendChild(translationDiv);

            wordCard.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text', wordObj.word);
            });

            wordsArea.appendChild(wordCard);
        });

        // 将句子结构卡片添加到语法区
        sentenceStructure.forEach(phrase => {
            const syntaxCard = document.createElement('div');
            syntaxCard.classList.add('syntax-card');
            syntaxCard.textContent = phrase;
            syntaxCard.setAttribute('draggable', 'true');
            syntaxCard.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text', phrase);
            });
            sentenceBuilder.appendChild(syntaxCard);
        });
    }

    // 允许将元素拖放到句子构建区
    sentenceBuilder.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    // 处理拖放到句子区域
    sentenceBuilder.addEventListener('drop', function(e) {
        e.preventDefault();
        const word = e.dataTransfer.getData('text');
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.style.margin = '5px';
        sentenceBuilder.appendChild(wordElement);

        // 每构建一个句子加积分
        points++;
        pointsElement.textContent = points;

        // 每5个句子奖励星星
        if (points % 5 === 0) {
            stars++;
            starsElement.textContent = '★'.repeat(stars);
        }

        // 添加成功动画
        sentenceBuilder.classList.add('success-animation');

        // 判断并给出反馈（正确/错误）
        const sentence = sentenceBuilder.textContent.trim();
        let expectedSentence = '';

        // 根据语法类型设定正确的句子
        if (sentenceTypeSelect.value === 'simple') {
            expectedSentence = 'I am happy';
        } else if (sentenceTypeSelect.value === 'compound') {
            expectedSentence = 'I am happy and you are good';
        } else if (sentenceTypeSelect.value === 'complex') {
            expectedSentence = 'I am happy because you are good';
        }

        if (sentence === expectedSentence) {
            alert("正确！");
        } else {
            alert("句子不完整或语法错误，请继续尝试！");
        }
    });
});