class Verification {
  constructor () {
    const self = ''
    this.x = 0
    this.left = 0
    this.top = 0
    this.end = 0
    this.group = document.querySelector('.v-group')
    this.bg = document.querySelector('.v-bg')
    this.control = document.querySelector('.s-control')
    this.text = document.querySelector('.s-text')
    this.wStart = document.querySelector('.w-start')
    this.wEnd = document.querySelector('.w-end')
    this.bg.addEventListener('click', this.hideBox)
    document.querySelector('.v-closed').addEventListener('click', this.hideBox)
    this.control.addEventListener('mousedown', this.go)
    this.control.addEventListener('touchstart', this.go)
    window.addEventListener('mouseup', this.leave)
    window.addEventListener('touchend', this.leave)
  }
  start () {
    self = this
    this.addClass(this.group, 'v-show')
    this.removeClass(this.group, 'v-hide')
    // 随机生成位置
    this.left = parseInt(Math.random()*100 + 100)
    this.wEnd.style.left = this.left + 'px'
    this.top = parseInt(Math.random()*50 + 10)
    this.wStart.style.top = this.top + 'px'
    this.wEnd.style.top = this.top + 'px'
    // 设置小块背景图
    this.wStart.style.backgroundPosition = ~(this.left) + 'px' + ' ' + ~(this.top) + 'px'
  }
  hideBox () {
    self.removeClass(self.group, 'v-show')
    self.addClass(self.group, 'a-hide')
    document.querySelector('.a-hide').addEventListener('animationend', self.animateHide)
  }
  // 消失动画
  animateHide () {
    document.querySelector('.a-hide').removeEventListener('animationend', self.animateHide)
    self.removeClass(self.group, 'a-hide')
    self.addClass(self.group, 'v-hide')
  }
  // 开始移动函数
  go (event) {
    self.addClass(self.control, 'v-go')
    self.addClass(self.text, 'fade-out')
    window.addEventListener('mousemove', self.move)
    window.addEventListener('touchmove', self.move)
    self.x = event.clientX ? event.clientX : event.touches[0].clientX
  }
  // 结束
  leave () {
    self.removeClass(self.control, 'v-go')
    self.removeClass(self.text, 'fade-out')
    window.removeEventListener('mousemove', self.move)
    window.removeEventListener('touchmove', self.move)
    var other = self.end - self.left
    if (other >= -2 && other <= 2) {
      alert('验证通过')
      window.location.reload()
    } else {
      self.control.style.transitionDuration = '1s'
      self.wStart.style.transitionDuration = '1s'
      self.control.style.transform = 'translate3d(0, 0, 0)'
      self.wStart.style.transform = 'translate3d(0, 0, 0)'
    }
  }
  // 移动
  move (event) {
    event.preventDefault()
    var nowX = event.clientX ? event.clientX : event.touches[0].clientX
    self.control.style.transitionDuration = '0s'
    self.wStart.style.transitionDuration = '0s'
    self.end = parseInt( nowX - self.x)
    if (self.end > 0 && self.end < 220) {
      self.control.style.transform = 'translate3d(' + self.end + 'px, 0, 0)'
      self.wStart.style.transform =  'translate3d(' + self.end + 'px, 0, 0)'
    }
  }

  //addClass  实现
  addClass (el, name) {
    // 获取到原有的class
    var list = el.getAttribute('class').split(' ')
    // 添加新的
    var add = true
    // 判断添加的是否存在
    list.forEach(function (val, index) {
      if (list[index] === name) {
        add = false
      }
    })
    if (add) {
      list.push(name)
    }
    var newList = list.join(' ')
    el.className = newList
  }


  //移处class
  removeClass (el, name) {
  // 获取到原有的class
  var list = el.getAttribute('class').split(' ')
  // 对比如果有一样的删除
  list.forEach(function (val, index) {
    if (list[index] === name || list[index] === '') {
      list.splice(index, 1)
    }
  })
  var newList = list.join(' ')
  el.className = newList
  }
}
