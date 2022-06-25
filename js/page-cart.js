class PageClient {
  constructor() {
    this.elementTarget = document.getElementById('products-list')
    this.init()
  }

  init() {
    const list = cart.getList()
    const products = []

    for (let index = 0; index < list.length; index += 1) {
      const item = list[index]
      const exists = products.find(function (product) {
        return product.id === item.id
      })

      if (exists) {
        exists.amount += 1
      } else {
        item.amount = 1
        products.push(item)
      }
    }

    this.render(products)
  }

  render(products) {
    this.elementTarget.innerHTML = ''
    let total = 0

    for (let index = 0; index < products.length; index += 1) {
      const product = products[index]
      total += product.price * product.amount

      const item = document.createElement('li')
      const figure = document.createElement('figure')
      const img = document.createElement('img')
      img.src = `/images/${product.img_url}`
      img.setAttribute('alt', product.name)
      figure.append(img)
      item.append(figure)

      const name = document.createElement('div')
      name.className = 'name'
      name.innerText = product.name
      item.append(name)

      const info = document.createElement('div')
      info.className = 'info'
      const amount = document.createElement('span')
      amount.className = 'amount'
      amount.innerText = `${product.amount}x`
      const price = document.createElement('span')
      price.className = 'price'
      price.innerText = format(product.price)
      info.append(amount, price)
      item.append(info)

      const commands = document.createElement('div')
      commands.className = 'commands'
      const removeButton = document.createElement('button')
      removeButton.className = 'remove'
      const icon = document.createElement('i')
      icon.className = 'fa-solid fa-circle-xmark'
      removeButton.append(icon)
      commands.append(removeButton)
      item.append(commands)

      this.elementTarget.append(item)

      removeButton.onclick = () => {
        cart.removeProduct(product)
        this.init()
      }
    }

    document.getElementById('total-price').innerText = format(total)
  }

  /**
   *  <li>
          <div class="commands">
            <button class="remove">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </li>
   */
}

const pageClient = new PageClient()
