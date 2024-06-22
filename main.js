document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://rb.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=ru_poisk_general_keys&utm_term=новостные%20сайты&utm_content=premium_2&yclid=2054663254706749439';

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
              const link = item.querySelector('.news-block__item-title a').href;

              const row = document.createElement('tr');

              const timeCell = document.createElement('td');
              timeCell.textContent = time;
              row.appendChild(timeCell);

              const titleCell = document.createElement('td');
              titleCell.textContent = title;
              row.appendChild(titleCell);

              const linkCell = document.createElement('td');
              const linkElement = document.createElement('a');
              linkElement.href = link;
              linkElement.target = '_blank';
              linkElement.textContent = 'Читать далее';
              linkCell.appendChild(linkElement);
              row.appendChild(linkCell);

              newsTable.appendChild(row);
          });
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
});
