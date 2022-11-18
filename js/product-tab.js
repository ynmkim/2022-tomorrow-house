const productTab = document.querySelector('.product-tab')
const productTabButtonList = productTab.querySelectorAll('button')
const TOP_HEADER_PC = 80 + 50 + 54
const TOP_HEADER_MOBILE = 50 + 40 + 40

// console.log(productTabButtonList)

let currentActiveTab = productTab.querySelector('.is-active')

// 탭 활성화
function toggleActiveTab() {
  const tabItem = this.parentNode

  if (currentActiveTab !== tabItem) {
    tabItem.classList.add('is-active')
    currentActiveTab.classList.remove('is-active')
    currentActiveTab = tabItem
    // console.log(currentActiveTab)
  }
}

productTabButtonList.forEach((button) => {
  button.addEventListener('click', toggleActiveTab)
  button.addEventListener('click', scrollToTabPanel)
})

// 탭 패널로 이동
function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount =
    tabPanel.getBoundingClientRect().top -
    (window.innerWidth >= 768 ? TOP_HEADER_PC : TOP_HEADER_MOBILE)

  window.scrollBy({
    top: scrollAmount,
    behavior: 'smooth',
  })
}

// 스크롤 이벤트
// 사전 정보: 각 tabPanel의 y축 위치 (문서의 시작점에서부터 얼마나 아래에 있는지)
// 요소의 y축 위치 = window.scrollY + element.getBoundingClientRect().top

const productTabPanelIdList = [
  'product-description',
  'product-review',
  'product-inquiry',
  'product-shipment',
  'product-recommendation',
]

const productTabPanelList = productTabPanelIdList.map((panelID) => {
  const tabPanel = document.querySelector(`#${panelID}`)

  return tabPanel
})

const productTabPanelPositionMap = {}

// console.log(productTabPanelList)

function detectTabPanelPosition() {
  // 각각의 tabPanel의 y축 위치를 찾는다
  // producTabPanelPositionMap에 그 값을 없데이트
  // ex
  // {
  //   'product-description': 1000,
  //   'product-review': 3000,
  //    ...
  // }

  productTabPanelList.forEach((panel) => {
    const id = panel.getAttribute('id') // 패널의 id 값
    const position = window.scrollY + panel.getBoundingClientRect().top // y축 위치

    productTabPanelPositionMap[id] = position
  })

  console.log(productTabPanelPositionMap)
}

window.addEventListener('load', detectTabPanelPosition)
window.addEventListener('resize', detectTabPanelPosition)
