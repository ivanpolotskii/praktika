document.addEventListener('DOMContentLoaded', function() {
    const siteSelect = document.getElementById('site-select');
    const loadNewsButton = document.getElementById('load-news');
    const newsTable = document.getElementById('news-table');
    const downloadButton = document.getElementById('download-json');
    let newsData = [];

    loadNewsButton.addEventListener('click', function() {
        const url = siteSelect.value;
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const fetchUrl = proxyUrl + encodeURIComponent(url);
        newsData = [];
        newsTable.innerHTML = '';

        fetch(fetchUrl)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data.contents, 'text/html');

                if (url.includes('rb.ru')) {
                    const newsItems = doc.querySelectorAll('.news-block__item');
                    newsItems.forEach(item => {
                        const time = item.querySelector('.news-block__item-time')?.innerText.trim();
                        const title = item.querySelector('.news-block__item-title a')?.innerText.trim();
                        const relativeLink = item.querySelector('.news-block__item-title a')?.getAttribute('href');
                        const fullLink = relativeLink ? new URL(relativeLink, url).href : '#';

                        if (time && title && fullLink) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${time}</td>
                                <td>${title}</td>
                                <td><a href="${fullLink}" target="_blank">Читать далее</a></td>
                            `;
                            newsTable.appendChild(row);
                            newsData.push({ time, title, fullLink });
                        }
                    });
                } else if (url.includes('lenta.ru')) {
                    const newsItems = doc.querySelectorAll('.card-mini');
                    newsItems.forEach(item => {
                        const time = item.querySelector('time')?.innerText.trim();
                        const title = item.querySelector('.card-mini__title')?.innerText.trim();
                        const relativeLink = item.querySelector('a')?.getAttribute('href');
                        const fullLink = relativeLink ? new URL(relativeLink, url).href : '#';

                        if (time && title && fullLink) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${time}</td>
                                <td>${title}</td>
                                <td><a href="${fullLink}" target="_blank">Читать далее</a></td>
                            `;
                            newsTable.appendChild(row);
                            newsData.push({ time, title, fullLink });
                        }
                    });
                } else if (url.includes('vesti.ru')) {
                    const newsItems = doc.querySelectorAll('.main-news__item');
                    newsItems.forEach(item => {
                        const time = item.querySelector('.main-news__time')?.innerText.trim();
                        const title = item.querySelector('.main-news__title a')?.innerText.trim();
                        const relativeLink = item.querySelector('.main-news__title a')?.getAttribute('href');
                        const fullLink = relativeLink ? new URL(relativeLink, url).href : '#';

                        if (time && title && fullLink) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${time}</td>
                                <td>${title}</td>
                                <td><a href="${fullLink}" target="_blank">Читать далее</a></td>
                            `;
                            newsTable.appendChild(row);
                            newsData.push({ time, title, fullLink });
                        }
                    });
                } else if (url.includes('iz.ru')) {
                    const newsItems = doc.querySelectorAll('.node__cart__item');
                    newsItems.forEach(item => {
                        const timeElement = item.querySelector('.node__cart__item__inside__info__time time');
                        const time = timeElement ? timeElement.innerText.trim() : '';
                        const titleElement = item.querySelector('.node__cart__item__inside__info__title span');
                        const title = titleElement ? titleElement.innerText.trim() : '';
                        const relativeLink = item.querySelector('.node__cart__item__inside.url-box')?.getAttribute('href');
                        const fullLink = relativeLink ? new URL(relativeLink, url).href : '#';

                        if (time && title && fullLink) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${time}</td>
                                <td>${title}</td>
                                <td><a href="${fullLink}" target="_blank">Читать далее</a></td>
                            `;
                            newsTable.appendChild(row);
                            newsData.push({ time, title, fullLink });
                        }
                    });
                }

                downloadButton.disabled = false;
            })
            .catch(error => console.error('Ошибка при загрузке данных:', error));
    });

    downloadButton.addEventListener('click', function() {
        if (newsData.length === 0) {
            alert('Нет данных для скачивания');
            return;
        }

        const json = JSON.stringify(newsData, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'news.json';
        a.click();
        URL.revokeObjectURL(url);
    });
});
