const timelineData = {
  1984: {
    text: "1984年设立国家级经济技术开发区，大连成为首批开放城市之一。",
    img: "images/1984.jpg",
    data: { 进出口总额: 20, 外资额: 10, "500强企业": 2 },
  },
  1991: {
    text: "1991年成立高新区，推动科技创新与产业升级。",
    img: "images/1991.png",
    data: { 进出口总额: 45, 外资额: 30, "500强企业": 10 },
  },
  2000: {
    text: "2000年设立出口加工区，促进制造业外向发展。",
    img: "images/2000.jpg",
    data: { 进出口总额: 75, 外资额: 50, "500强企业": 25 },
  },
  2017: {
    text: "2017年设立自贸区，深化开放合作，吸引世界500强投资。",
    img: "images/2017.png",
    data: { 进出口总额: 120, 外资额: 80, "500强企业": 50 },
  },
}

const svg = document.getElementById("bar-chart")
const infoText = document.getElementById("info-text")
const infoImage = document.getElementById("info-image")
const nodes = document.querySelectorAll(".timeline-node")

function drawBars(data) {
  svg.innerHTML = "" // 清空旧图

  const keys = Object.keys(data)
  const values = Object.values(data)
  const maxVal = Math.max(...values)
  const chartHeight = 250

  const svgWidth = svg.parentElement.clientWidth || 600
  const numBars = keys.length
  const totalGapSpace = svgWidth * 0.2 // 20% for gaps
  const gap = totalGapSpace / (numBars + 1)
  const barWidth = (svgWidth - totalGapSpace - gap * 2) / numBars

  svg.setAttribute("viewBox", `0 0 ${svgWidth} 320`)
  svg.setAttribute("width", "100%")
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet")

  keys.forEach((key, i) => {
    const x = gap + i * (barWidth + gap)
    const finalHeight = (values[i] / maxVal) * chartHeight
    const y = chartHeight - finalHeight + 30

    // 初始高度0
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rect.setAttribute("x", x)
    rect.setAttribute("y", chartHeight + 30)
    rect.setAttribute("width", barWidth)
    rect.setAttribute("height", 0)
    rect.setAttribute("fill", "#003366")
    svg.appendChild(rect)

    // 数字标签
    const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
    valueLabel.setAttribute("x", x + barWidth / 2)
    valueLabel.setAttribute("y", chartHeight + 20)
    valueLabel.setAttribute("text-anchor", "middle")
    valueLabel.classList.add("bar-value")
    valueLabel.textContent = "0"
    svg.appendChild(valueLabel)

    // 动画上升 & 数字增长
    let currentHeight = 0
    let currentValue = 0
    const frames = 40
    const heightStep = finalHeight / frames
    const valueStep = values[i] / frames

    const interval = setInterval(() => {
      if (currentHeight < finalHeight) {
        currentHeight += heightStep
        currentValue += valueStep
        rect.setAttribute("y", chartHeight - currentHeight + 30)
        rect.setAttribute("height", currentHeight)
        valueLabel.setAttribute("y", chartHeight - currentHeight + 20)
        valueLabel.textContent = Math.round(currentValue)
      } else {
        clearInterval(interval)
        valueLabel.textContent = values[i] // 保证整数显示
      }
    }, 25)

    // 分类文字
    const label = document.createElementNS("http://www.w3.org/2000/svg", "text")
    label.setAttribute("x", x + barWidth / 2)
    label.setAttribute("y", chartHeight + 60)
    label.setAttribute("text-anchor", "middle")
    label.textContent = key
    label.setAttribute("font-size", Math.max(12, Math.min(14, barWidth / 6)))
    svg.appendChild(label)
  })
}

function updateContent(year) {
  const data = timelineData[year]
  infoText.textContent = data.text
  infoImage.src = data.img
  drawBars(data.data)
  nodes.forEach((n) => n.classList.remove("active"))
  document.querySelector(`.timeline-node[data-id="${year}"]`).classList.add("active")
}

nodes.forEach((node) => {
  node.addEventListener("click", () => {
    updateContent(node.dataset.id)
  })
})

let autoPlayIndex = 0
document.getElementById("autoPlayBtn").addEventListener("click", () => {
  const years = Object.keys(timelineData)
  autoPlayIndex = 0
  const interval = setInterval(() => {
    updateContent(years[autoPlayIndex])
    autoPlayIndex++
    if (autoPlayIndex >= years.length) clearInterval(interval)
  }, 3000)
})

let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    const activeNode = document.querySelector(".timeline-node.active")
    if (activeNode) {
      const year = activeNode.dataset.id
      const data = timelineData[year]
      drawBars(data.data)
    }
  }, 250)
})

updateContent("1984")
