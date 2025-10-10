function drawBars(data) {
  svg.innerHTML = ''; // 清空旧图
  const keys = Object.keys(data);
  const values = Object.values(data);
  const maxVal = Math.max(...values);
  const chartHeight = 250;

  // 手机端自适应宽度
  const chartWidth = svg.clientWidth;
  const barWidth = chartWidth / keys.length * 0.5;
  const gap = (chartWidth - keys.length * barWidth) / (keys.length + 1);

  keys.forEach((key, i) => {
    const x = i * (barWidth + gap) + gap;
    const finalHeight = (values[i] / maxVal) * chartHeight;
    const y = chartHeight - finalHeight + 30;

    // 初始高度0
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", chartHeight + 30);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", 0);
    rect.setAttribute("fill", "#003366");
    svg.appendChild(rect);

    // 数字标签
    const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    valueLabel.setAttribute("x", x + barWidth / 2 - 10);
    valueLabel.setAttribute("y", chartHeight + 20);
    valueLabel.classList.add("bar-value");
    valueLabel.textContent = "0";
    svg.appendChild(valueLabel);

    // 动画上升 & 数字增长
    let currentHeight = 0;
    let currentValue = 0;
    const frames = 40;
    const heightStep = finalHeight / frames;
    const valueStep = values[i] / frames;

    const interval = setInterval(() => {
      if (currentHeight < finalHeight) {
        currentHeight += heightStep;
        currentValue += valueStep;
        rect.setAttribute("y", chartHeight - currentHeight + 30);
        rect.setAttribute("height", currentHeight);
        valueLabel.setAttribute("y", chartHeight - currentHeight + 20);
        valueLabel.textContent = Math.round(currentValue);
      } else {
        clearInterval(interval);
        valueLabel.textContent = values[i]; // 保证整数显示
      }
    }, 25);

    // 分类文字
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x + 15);
    label.setAttribute("y", chartHeight + 60);
    label.textContent = key;
    label.setAttribute("font-size", "14");
    svg.appendChild(label);
  });
}

