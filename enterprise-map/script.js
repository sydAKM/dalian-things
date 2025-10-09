const markers = [
  {
    name: '大连机床厂',
    x: 180,
    y: 300,
    img: 'images/machine.jpg',
    desc: '大连机床厂成立于1948年，是中国机床行业的龙头企业，曾研制出国内第一台普通车床。'
  },
  {
    name: '大连造船厂',
    x: 320,
    y: 450,
    img: 'images/shipyard.jpg',
    desc: '大连造船厂是中国重要的造船基地，具有丰富的大型船舶建造经验。'
  },
  {
    name: '瓦房店轴承厂',
    x: 480,
    y: 350,
    img: 'images/bearing.jpg',
    desc: '瓦房店轴承厂创建于1938年，是中国最大轴承制造企业之一，产品远销世界各地。'
  }
];

const markersContainer = document.getElementById('markersContainer');
const infoContent = document.getElementById('infoContent');

markers.forEach(marker => {
  const div = document.createElement('div');
  div.className = 'marker';
  div.style.left = marker.x + 'px';
  div.style.top = marker.y + 'px';

  const img = document.createElement('img');
  img.src = 'images/marker-icon.png';
  img.alt = marker.name;

  div.appendChild(img);

  div.addEventListener('click', () => {
    showInfo(marker);
  });

  markersContainer.appendChild(div);
});

function showInfo(marker) {
  infoContent.innerHTML = `
    <img src="${marker.img}" class="info-img" />
    <div class="info-title">${marker.name}</div>
    <div class="info-desc">${marker.desc}</div>
  `;
}
