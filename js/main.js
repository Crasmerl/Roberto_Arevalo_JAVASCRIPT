// main.js: carga noticias mediante fetch desde data/news.json
document.addEventListener('DOMContentLoaded', () => {
  const newsList = document.getElementById('news-list');
  fetch('data/news.json')
    .then(r => {
      if(!r.ok) throw new Error('No se pudo cargar news.json');
      return r.json();
    })
    .then(data => {
      newsList.innerHTML = '';
      data.articles.forEach(a => {
        const article = document.createElement('article');
        article.className = 'news-item';
        article.innerHTML = `<h3>${a.title}</h3><p>${a.summary}</p><small>${a.date}</small>`;
        newsList.appendChild(article);
      });
    })
    .catch(err => {
      newsList.innerHTML = '<p>No se han podido cargar las noticias.</p>';
      console.error(err);
    });
});
