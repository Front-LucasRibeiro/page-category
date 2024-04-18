/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst serverUrl = \"http://localhost:5000\";\r\nconst serverCartUrl = \"http://localhost:5001/cart\";\r\nconst formato = { style: 'currency', currency: 'BRL' };\r\nconst itensByPge = 9;\r\nconst checkedValues = {\r\n    color: [],\r\n    size: [],\r\n    price: []\r\n};\r\nfunction fetchProducts() {\r\n    return fetch(`${serverUrl}/products`).then(res => res.json());\r\n}\r\nfunction fetchCart() {\r\n    return fetch(serverCartUrl).then(res => res.json());\r\n}\r\nfunction getFilterColor() {\r\n    fetchProducts()\r\n        .then((data) => {\r\n        const uniqueColors = [...new Set(data.map(item => item.color))];\r\n        const colorList = document.querySelector('.filter__item--color ul');\r\n        uniqueColors.forEach(color => {\r\n            const label = document.createElement('label');\r\n            const checkbox = document.createElement('input');\r\n            checkbox.type = 'checkbox';\r\n            checkbox.id = color;\r\n            checkbox.name = color;\r\n            checkbox.value = color;\r\n            const span = document.createElement('span');\r\n            span.textContent = color;\r\n            label.appendChild(checkbox);\r\n            label.appendChild(span);\r\n            const li = document.createElement('li');\r\n            li.appendChild(label);\r\n            colorList.appendChild(li);\r\n        });\r\n        colorList.addEventListener('change', () => {\r\n            checkedValues.color = Array.from(colorList.querySelectorAll('input:checked')).map((checkbox) => checkbox.value);\r\n            updateProducts();\r\n        });\r\n        openMoreColor();\r\n    })\r\n        .catch(error => {\r\n        console.error('Erro na solicitação:', error);\r\n    });\r\n}\r\nfunction getFilterSize() {\r\n    fetchProducts()\r\n        .then((data) => {\r\n        const sizes = data.flatMap(item => item.size);\r\n        const uniqueSizes = [...new Set(sizes)].sort();\r\n        const sizeList = document.querySelector('.filter__item--size ul');\r\n        uniqueSizes.forEach(size => {\r\n            const label = document.createElement('label');\r\n            const checkbox = document.createElement('input');\r\n            checkbox.type = 'checkbox';\r\n            checkbox.id = size;\r\n            checkbox.name = size;\r\n            checkbox.value = size;\r\n            const span = document.createElement('span');\r\n            span.textContent = size;\r\n            label.appendChild(checkbox);\r\n            label.appendChild(span);\r\n            const li = document.createElement('li');\r\n            li.appendChild(label);\r\n            sizeList.appendChild(li);\r\n        });\r\n        sizeList.addEventListener('change', () => {\r\n            const checkboxes = sizeList.querySelectorAll('input[type=\"checkbox\"]');\r\n            checkboxes.forEach((checkbox) => {\r\n                const li = checkbox.closest('li');\r\n                if (checkbox.checked) {\r\n                    li.classList.add('selected');\r\n                }\r\n                else {\r\n                    li.classList.remove('selected');\r\n                }\r\n            });\r\n            checkedValues.size = Array.from(checkboxes)\r\n                .filter((checkbox) => checkbox.checked)\r\n                .map((checkbox) => checkbox.value);\r\n            updateProducts();\r\n        });\r\n    });\r\n}\r\nfunction getFilterPrice() {\r\n    const price = document.querySelector('.filter__item--price ul');\r\n    price.addEventListener('change', () => {\r\n        checkedValues.price = Array.from(price.querySelectorAll('input:checked')).map((checkbox) => checkbox.value);\r\n        updateProducts();\r\n    });\r\n}\r\nfunction getProducts() {\r\n    fetchProducts()\r\n        .then((data) => {\r\n        const productList = document.querySelector('.listProducts__list ul');\r\n        if (data.length) {\r\n            data.forEach((product, index) => {\r\n                const li = document.createElement('li');\r\n                const img = document.createElement('img');\r\n                img.src = product.image;\r\n                li.appendChild(img);\r\n                const titulo = document.createElement('h3');\r\n                titulo.textContent = product.name;\r\n                titulo.classList.add('product__title');\r\n                li.appendChild(titulo);\r\n                const price = document.createElement('p');\r\n                price.textContent = String(product.price.toLocaleString('pt-BR', formato));\r\n                price.classList.add('product__price');\r\n                li.appendChild(price);\r\n                const parcelamento = document.createElement('p');\r\n                parcelamento.textContent = `até ${product.parcelamento[0]}x de ${product.parcelamento[1].toLocaleString('pt-BR', formato)}`;\r\n                parcelamento.classList.add('product__parcelamento');\r\n                li.appendChild(parcelamento);\r\n                const btn = document.createElement('button');\r\n                btn.textContent = 'Comprar';\r\n                btn.classList.add('btn-comprar');\r\n                btn.dataset.id = JSON.stringify(product.id);\r\n                btn.dataset.name = product.name;\r\n                btn.dataset.price = JSON.stringify(product.price);\r\n                btn.dataset.image = product.image;\r\n                li.appendChild(btn);\r\n                li.dataset.color = product.color;\r\n                li.dataset.size = JSON.stringify(product.size);\r\n                li.dataset.price = JSON.stringify(product.price);\r\n                li.dataset.id = JSON.stringify(product.id);\r\n                if (index >= itensByPge)\r\n                    li.classList.add('hidden');\r\n                productList.appendChild(li);\r\n            });\r\n        }\r\n        cart();\r\n        loadMore();\r\n    });\r\n}\r\nfunction updateProducts() {\r\n    const loadMoreBtn = document.querySelector('.load-more');\r\n    if (loadMoreBtn instanceof HTMLElement) {\r\n        loadMoreBtn.style.display = 'flex';\r\n    }\r\n    fetchProducts()\r\n        .then((data) => {\r\n        const productList = document.querySelector('.listProducts__list ul');\r\n        productList.innerHTML = '<p class=\"filter-info\">Não existem resultados para essa busca!</p>';\r\n        data.forEach((product, index) => {\r\n            let isVisible = true;\r\n            // Filtro de cores\r\n            if (checkedValues.color.length > 0 && !checkedValues.color.includes(product.color)) {\r\n                isVisible = false;\r\n            }\r\n            // Filtro de tamanhos\r\n            if (checkedValues.size.length > 0 && !product.size.some(size => checkedValues.size.includes(size))) {\r\n                isVisible = false;\r\n            }\r\n            // Filtro de preço\r\n            if (checkedValues.price.length > 0) {\r\n                let isPriceInRange = false;\r\n                checkedValues.price.forEach(filter => {\r\n                    const [rangeStart, rangeEnd] = filter.split('-').map(Number);\r\n                    if (rangeEnd) {\r\n                        if (product.price >= rangeStart && product.price <= rangeEnd) {\r\n                            isPriceInRange = true;\r\n                        }\r\n                    }\r\n                    else {\r\n                        if (product.price >= rangeStart) {\r\n                            isPriceInRange = true;\r\n                        }\r\n                    }\r\n                });\r\n                if (!isPriceInRange) {\r\n                    isVisible = false;\r\n                }\r\n            }\r\n            if (isVisible) {\r\n                const productList = document.querySelector('.listProducts__list ul .filter-info');\r\n                if (productList) {\r\n                    productList.remove();\r\n                }\r\n                montaShelf(product, index);\r\n            }\r\n        });\r\n        loadMore();\r\n    });\r\n}\r\nfunction montaShelf(product, index) {\r\n    const li = document.createElement('li');\r\n    const img = document.createElement('img');\r\n    img.src = product.image;\r\n    li.appendChild(img);\r\n    const titulo = document.createElement('h3');\r\n    titulo.textContent = product.name;\r\n    titulo.classList.add('product__title');\r\n    li.appendChild(titulo);\r\n    const price = document.createElement('p');\r\n    price.textContent = String(product.price.toLocaleString('pt-BR', formato));\r\n    price.classList.add('product__price');\r\n    li.appendChild(price);\r\n    const parcelamento = document.createElement('p');\r\n    parcelamento.textContent = `até ${product.parcelamento[0]}x de ${product.parcelamento[1].toLocaleString('pt-BR', formato)}`;\r\n    parcelamento.classList.add('product__parcelamento');\r\n    li.appendChild(parcelamento);\r\n    const btn = document.createElement('button');\r\n    btn.textContent = 'Comprar';\r\n    btn.classList.add('btn-comprar');\r\n    li.appendChild(btn);\r\n    li.dataset.color = product.color;\r\n    li.dataset.size = JSON.stringify(product.size);\r\n    li.dataset.price = JSON.stringify(product.price);\r\n    if (index >= itensByPge)\r\n        li.classList.add('hidden');\r\n    document.querySelector('.listProducts__list ul').appendChild(li);\r\n    cart();\r\n}\r\nfunction toggleFilter() {\r\n    let filterItems = document.querySelectorAll('.filter__item--top');\r\n    filterItems.forEach(item => {\r\n        item.addEventListener('click', function () {\r\n            item.classList.toggle('ativo');\r\n            let ulElement = item.nextElementSibling;\r\n            // Verificando se o próximo elemento é uma ul\r\n            if (ulElement && ulElement.tagName.toLowerCase() === 'div') {\r\n                ulElement.classList.toggle('ativo');\r\n            }\r\n        });\r\n    });\r\n    clearFilter();\r\n}\r\nfunction clearFilter() {\r\n    let elemLimpar = document.querySelector('.buttons__item--limpar');\r\n    elemLimpar.addEventListener('click', function () {\r\n        let checkboxes = document.querySelectorAll('.filter__item input[type=\"checkbox\"]');\r\n        checkboxes.forEach((checkbox) => {\r\n            checkbox.checked = false;\r\n        });\r\n        checkedValues.color = [];\r\n        checkedValues.size = [];\r\n        checkedValues.price = [];\r\n        updateProducts();\r\n    });\r\n}\r\nfunction filterMob() {\r\n    let elemFiltrar = document.querySelector('.filter__mob__item--filtrar');\r\n    elemFiltrar.addEventListener('click', function () {\r\n        let sidebar = document.querySelector('.sidebar');\r\n        sidebar.style.display = 'block';\r\n    });\r\n    toggleFilter();\r\n}\r\nfunction closeFilterMob() {\r\n    let elements = document.querySelectorAll('.top__filter--close, .buttons__item--aplicar');\r\n    elements.forEach(elem => {\r\n        elem.addEventListener('click', function () {\r\n            let sidebar = document.querySelector('.sidebar');\r\n            sidebar.style.display = 'none';\r\n            let filterOrder = document.querySelector('.filter__order__mob');\r\n            filterOrder.style.display = 'none';\r\n        });\r\n    });\r\n}\r\nfunction filterOrderMob() {\r\n    let elemFiltrar = document.querySelector('.filter__mob__item--ordenar');\r\n    elemFiltrar.addEventListener('click', function () {\r\n        let orderFilter = document.querySelector('.filter__order__mob');\r\n        orderFilter.style.display = 'block';\r\n    });\r\n}\r\nfunction showBtnLoadMore(loadMoreBtn) {\r\n    // Ocultar o botão \"Load More\" se não houver mais itens ocultos\r\n    if (document.querySelectorAll('.listProducts__list ul .hidden').length === 0) {\r\n        if (loadMoreBtn instanceof HTMLElement) {\r\n            loadMoreBtn.style.display = 'none';\r\n        }\r\n    }\r\n    else {\r\n        if (loadMoreBtn instanceof HTMLElement) {\r\n            loadMoreBtn.style.display = 'flex';\r\n        }\r\n    }\r\n}\r\nfunction loadMore() {\r\n    const loadMoreBtn = document.querySelector('.load-more');\r\n    const hiddenItems = document.querySelectorAll('.listProducts__list ul .hidden');\r\n    // Ocultar todos os itens que excedem o número por página\r\n    hiddenItems.forEach((item, index) => {\r\n        if (index >= itensByPge && item instanceof HTMLElement) {\r\n            item.style.display = 'none';\r\n        }\r\n    });\r\n    // Mostrar mais itens quando o botão \"Load More\" for clicado\r\n    loadMoreBtn.addEventListener('click', function () {\r\n        hiddenItems.forEach((item, index) => {\r\n            if (index >= itensByPge) {\r\n                return;\r\n            }\r\n            if (item instanceof HTMLElement) {\r\n                item.style.display = ''; // Mostrar item\r\n                item.classList.remove('hidden');\r\n            }\r\n        });\r\n        showBtnLoadMore(loadMoreBtn);\r\n    });\r\n}\r\nfunction getListCart() {\r\n    fetchCart()\r\n        .then((res) => {\r\n        let qtdProducts = res.length;\r\n        let iconCartdocument = document.querySelector('.header__cart');\r\n        iconCartdocument.innerHTML = `\n        <div class=\"qtd__products\">${qtdProducts}</div>\n      `;\r\n        if (res.length) {\r\n            let listCart = document.querySelector('.carrinho ul');\r\n            listCart.innerHTML = \"\";\r\n            res.map(product => {\r\n                let li = document.createElement('li');\r\n                let price = \"\";\r\n                price = Number(product.price).toLocaleString('pt-BR', formato);\r\n                li.innerHTML = `\n            <img src=\"${product.image}\" alt=\"${product.name}\" />\n            <div class=\"carrinho__info\">\n              <h3 class=\"carrinho__titulo\">${product.name}</h3>\n              <p class=\"carrinho__price\">${price}</p>\n\n              <div class=\"carrinho__seletor\">\n              <input type=\"text\" min=\"1\" value=\"${product.qtd}\" disabled />\n              </div>\n            </div>\n            <span class=\"carrinho__remove\" data-id=\"${product.id}\">\n              <img src=\"/img/remove.png\" alt=\"Remover produto\" data-id=\"${product.id}\" />\n            </span>\n          `;\r\n                listCart.append(li);\r\n                removeCart(product.id);\r\n            });\r\n        }\r\n        else {\r\n            let listCart = document.querySelector('.carrinho ul');\r\n            listCart.innerHTML = \"<li class='carrinho__empty'>Carrinho vazio.</li>\";\r\n        }\r\n    })\r\n        .catch(error => {\r\n        console.error('Erro na solicitação do Cart:', error);\r\n    });\r\n}\r\nfunction openCart() {\r\n    let btnComprar = document.querySelectorAll('.btn-comprar,.header__cart');\r\n    btnComprar.forEach(btn => {\r\n        btn.addEventListener('click', function () {\r\n            let cart = document.querySelector('.carrinho');\r\n            if (cart instanceof HTMLElement) {\r\n                cart.classList.toggle('ativo');\r\n            }\r\n            let overlay = document.querySelector('.carrinho__overlay');\r\n            if (overlay instanceof HTMLElement) {\r\n                overlay.style.display = \"block\";\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction closeCart() {\r\n    let close = document.querySelector('.carrinho__close');\r\n    close.addEventListener('click', function () {\r\n        let cart = document.querySelector('.carrinho');\r\n        cart.classList.remove('ativo');\r\n        let overlay = document.querySelector('.carrinho__overlay');\r\n        if (overlay instanceof HTMLElement) {\r\n            overlay.style.display = \"none\";\r\n        }\r\n    });\r\n}\r\nfunction addCart(data) {\r\n    const options = {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json'\r\n        },\r\n        body: JSON.stringify(data)\r\n    };\r\n    fetch(serverCartUrl, options)\r\n        .then((response) => {\r\n        if (!response.ok) {\r\n            throw new Error('Ocorreu um erro ao enviar os dados.');\r\n        }\r\n        return response.json();\r\n    })\r\n        .then((data) => {\r\n        console.log('Dados enviados com sucesso:', data);\r\n        getListCart();\r\n    })\r\n        .catch((error) => {\r\n        console.error('Erro ao enviar os dados:', error);\r\n        alteraQuantidade(data);\r\n    });\r\n}\r\nfunction alteraQuantidade(data) {\r\n    let id = data.id;\r\n    let qtd = \"\";\r\n    fetchCart()\r\n        .then((res) => {\r\n        if (res.length) {\r\n            res.map(product => {\r\n                if (Number(product.id) === Number(id)) {\r\n                    qtd = String(Number(data.qtd) + Number(product.qtd));\r\n                    const updateData = {\r\n                        qtd\r\n                    };\r\n                    const requestOptions = {\r\n                        method: 'PATCH',\r\n                        headers: {\r\n                            'Content-Type': 'application/json'\r\n                        },\r\n                        body: JSON.stringify(updateData)\r\n                    };\r\n                    fetch(`${serverCartUrl}/${id}`, requestOptions)\r\n                        .then(response => {\r\n                        if (!response.ok) {\r\n                            throw new Error('Ocorreu um erro ao atualizar o produto.');\r\n                        }\r\n                        return response.json();\r\n                    })\r\n                        .then(data => {\r\n                        getListCart();\r\n                        console.log('Produto atualizado com sucesso:', data);\r\n                    })\r\n                        .catch(error => {\r\n                        console.error('Erro ao atualizar o produto:', error);\r\n                    });\r\n                }\r\n            });\r\n        }\r\n    });\r\n}\r\nfunction removeCart(id) {\r\n    const url = `${serverCartUrl}/${id}`;\r\n    let remover = document.querySelectorAll('.carrinho__remove');\r\n    remover.forEach(produto => {\r\n        produto.addEventListener('click', function (e) {\r\n            const target = e.target;\r\n            const dataset = target.dataset;\r\n            if (dataset.id === id) {\r\n                fetch(url, {\r\n                    method: 'DELETE'\r\n                }).then(response => {\r\n                    if (!response.ok) {\r\n                        throw new Error('Erro ao excluir o produto.');\r\n                    }\r\n                    getListCart();\r\n                    console.log('Produto excluído com sucesso.');\r\n                    setTimeout(function () {\r\n                        alert('Produto removido com sucesso!');\r\n                    }, 1000);\r\n                }).catch(error => {\r\n                    console.error('Erro ao enviar solicitação DELETE:', error);\r\n                });\r\n            }\r\n        });\r\n    });\r\n}\r\nconst cart = () => {\r\n    getListCart();\r\n    openCart();\r\n    closeCart();\r\n    let btnComprar = document.querySelectorAll('.btn-comprar');\r\n    btnComprar.forEach(btn => {\r\n        btn.addEventListener('click', function (e) {\r\n            const target = e.target;\r\n            const dataset = target.dataset;\r\n            let id = dataset.id.replace(/\"/g, '');\r\n            const name = dataset.name;\r\n            const price = dataset.price;\r\n            const image = dataset.image;\r\n            let data = {\r\n                id,\r\n                name,\r\n                price,\r\n                image,\r\n                qtd: '1'\r\n            };\r\n            addCart(data);\r\n        });\r\n    });\r\n};\r\nfunction openMoreColor() {\r\n    const colors = document.querySelectorAll('.filter__item--color li');\r\n    colors.forEach((cor, index) => {\r\n        if (index >= 4) {\r\n            if (cor instanceof HTMLElement) {\r\n                cor.style.display = 'none';\r\n            }\r\n        }\r\n    });\r\n    const more = document.querySelector('.filter__more');\r\n    more.addEventListener('click', function () {\r\n        colors.forEach((cor, index) => {\r\n            if (index >= 4) {\r\n                if (cor instanceof HTMLElement) {\r\n                    cor.style.display = 'block';\r\n                }\r\n            }\r\n        });\r\n        more.remove();\r\n    });\r\n}\r\nfunction main() {\r\n    getProducts();\r\n    getFilterColor();\r\n    getFilterSize();\r\n    getFilterPrice();\r\n    filterMob();\r\n    closeFilterMob();\r\n    filterOrderMob();\r\n}\r\ndocument.addEventListener(\"DOMContentLoaded\", main);\r\n\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/ts/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ts/index.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;