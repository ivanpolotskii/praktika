document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://rb.ru';
  
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const newsItems = doc.querySelectorAll('.news-block__item');
            const newsTable = document.getElementById('news-table');
  
            newsItems.forEach(item => {
                const time = item.querySelector('.news-block__item-time').innerText.trim();
                const title = item.querySelector('.news-block__item-title a').innerText.trim();
                const relativeLink = item.querySelector('.news-block__item-title a').getAttribute('href');
                const fullLink = new URL(relativeLink, url).href; // Создает полный URL
  
                const row = document.createElement('tr');
  
                const timeCell = document.createElement('td');
                timeCell.textContent = time;
                row.appendChild(timeCell);
  
                const titleCell = document.createElement('td');
                titleCell.textContent = title;
                row.appendChild(titleCell);
  
                const linkCell = document.createElement('td');
                const linkElement = document.createElement('a');
                linkElement.href = fullLink;
                linkElement.target = '_blank';
                linkElement.textContent = 'Читать далее';
                linkCell.appendChild(linkElement);
                row.appendChild(linkCell);
  
                newsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Ошибка при загрузке данных:', error));
  });
  
