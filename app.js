document.addEventListener('DOMContentLoaded', function() {
    const wordsArea = document.getElementById('words-area');
    const sentenceBuilder = document.getElementById('sentence-builder');

    const words = document.querySelectorAll('.word-card');
    words.forEach(word => {
        word.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.textContent);
        });
    });

    sentenceBuilder.addEventListener('dragover', function(e) {
        e.preventDefault();  // 允许放置
    });

    sentenceBuilder.addEventListener('drop', function(e) {
        e.preventDefault();
        const word = e.dataTransfer.getData('text');
        const wordElement = document.createElement('span');
        wordElement.textContent = word;
        wordElement.style.margin = '5px';
        sentenceBuilder.appendChild(wordElement);
    });
});
