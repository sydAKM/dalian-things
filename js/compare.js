const stageData = {
  "1950s-1970s": "这一阶段大连以机械制造和重工业为核心，城市功能主要是生产车间。",
  "1980s-1990s": "改革开放后，大连设立出口加工区和高新区，城市功能转向技术开发和出口贸易。",
  "2000s-2010s": "进入国际化阶段，大连港口货运量增加，城市功能偏向物流和国际贸易。",
  "2017+": "设立自贸区后，大连成为亚太重要国际航运中心，城市功能涵盖现代服务业和国际物流。"
};

const stages = document.querySelectorAll('.stage');

stages.forEach(stage => {
  const img = stage.querySelector('.stage-img');
  const info = stage.querySelector('.stage-info');
  const id = stage.dataset.id;

  img.addEventListener('click', () => {
    // 隐藏其他阶段详情
    stages.forEach(s => s.querySelector('.stage-info').style.display = 'none');
    // 显示当前阶段详情
    info.textContent = stageData[id];
    info.style.display = 'block';
  });
});
