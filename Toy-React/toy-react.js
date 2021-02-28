class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

// 文本节点
class TextWrapper {
  constructor(context) {
    this.root = document.createTextNode(context)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null) // 创建绝对的空对象
    this.children = []
    this._root = null
  }
  setAttribute (name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root // 递归
    }
    return this._root
  }
}

export function createElement (type, attributes, ...children) {
  let e;
  if (typeof type === 'string') {
    e = new ElementWrapper(type)
  } else {
    e = new type
  }

  for (let p in attributes) {
    e.setAttribute(p, attributes[p])
  }

  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === 'string') {
        child = new TextWrapper(child)
      }
      if ((typeof child === 'object') && (child instanceof Array)) {
        insertChildren(child)
      } else {
        e.appendChild(child)
      }
    }
  }
  insertChildren(children)
  return e
}

export function render (component, parentElement) {
  parentElement.appendChild(component.root)
}
