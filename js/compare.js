const stageData = {
  "1950s-1970s": "依托港口与资源，形成以造船、机床、化工为核心的重工业体系，是全国重要的工业生产基地。",
  "1980s-1990s": "经开区、保税区相继设立，聚焦国际贸易与外资引进，从“生产基地”转向“开放前沿”。",
  "2000s-2010s": "大窑湾保税港区、大连港升级，同时布局软件服务、高端制造，向“国际航运中心+创新型城市”迈进。",
  "2017+": "自贸区赋能，融合航运、科创、文旅、消费等功能，打造东北亚复合型国际化城市。"
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
