/**
 * Magnifx 1.0.0
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 * @licence MIT
 * @description A simple, lightweight JS magnifying glass zoom library forked from https://github.com/TrySound/magnify/tree/fix-vanillajs
 */

(function (window, document, Math) {
  var initialized = []

  function Magnifx (el, opts) {
    var anchor
    if (!~initialized.indexOf(el)) {
      initialized.push(el)

      this.opts = opts
      this.image = anchor = el

      // Detect closest anchor
      while (anchor) {
        if (anchor.tagName === 'A') {
          break
        }
        anchor = anchor.parentElement
      }
      this.alter = el.getAttribute('data-magnifx-src')
        || (anchor && anchor.getAttribute('href'))
        || opts.src
        || ''

      this.wrap()
      this.zoom()
    }
  }

  Magnifx.prototype = {
    wrap: function () {
      var inst = this,
        image = inst.image,
        container, lens

      container = document.createElement('div')
      container.className = 'magnifx'

      lens = document.createElement('div')
      lens.className = 'magnifx-lens magnifx-loading'
      lens.style.transitionDuration = inst.opts.speed + 'ms'
      lens.style.webkitTransitionDuration = inst.opts.speed + 'ms'
      lens.style.display = 'none'

      // Append
      container.appendChild(lens)
      image.parentNode.insertBefore(container, image)
      container.appendChild(image)

      inst.container = container
      inst.lens = lens
    },

    zoom: function () {
      var body = document.body,
        inst = this,
        container = inst.container,
        lens = inst.lens,
        img = inst.image,
        mImg = new Image(),
        loaded = false,
        errored = false

      container.addEventListener('mouseover', function () {
        if (!errored) {
          mImg.src = inst.alter
        }
        lens.style.opacity = 1
        lens.style.display = 'inherit'
        body.classList.add('magnifying')
      })

      container.addEventListener('mouseleave', function () {
        lens.style.opacity = 0
        lens.style.display = 'none'
        body.classList.remove('magnifying')
      })

      // Graceful degradation
      container.addEventListener('mousemove', function (e) {
        var box = container.getBoundingClientRect(),
          clientX = e.clientX,
          clientY = e.clientY

        // Will always true with pointer-events: none
        if (clientX > box.left && box.right > clientX && clientY > box.top && box.bottom > clientY) {
          calc(clientX, clientY, box.left, box.top)
          // show
          lens.style.opacity = 1
          container.style.overflow = ''
        } else {
          // hide
          lens.style.opacity = 0
          container.style.overflow = 'hidden'
        }
      })

      function calc (clientX, clientY, left, top) {
        var x, y, lhw, lhh, rx, ry
        // coords
        x = clientX - left
        y = clientY - top
        // lens half
        lhw = lens.offsetWidth / 2,
          lhh = lens.offsetHeight / 2
        // lens pos
        lens.style.left = x - lhw + 'px'
        lens.style.top = y - lhh + 'px'
        // ratio
        if (loaded) {
          rx = Math.round(x / img.width * mImg.width - lhw) * -1
          ry = Math.round(y / img.height * mImg.height - lhh) * -1
          lens.style.backgroundPosition = rx + 'px ' + ry + 'px'
        }
      }

      mImg.addEventListener('load', function () {
        loaded = true
        lens.className = 'magnifx-lens'
        lens.style.background = 'url(' + inst.alter + ') no-repeat'
      })

      mImg.addEventListener('error', function () {
        errored = true
        lens.className = 'magnifx-lens magnifx-error'
      })
    }
  }

  window.magnifx = function (el, opts) {
    var i

    // Detect element
    if (typeof el === 'string') {
      el = document.querySelectorAll(el)
    } else if (typeof el === 'object' && el.nodeType) {
      el = [el]
    } else if (!el.length) {
      el = []
    }

    // Options
    if (typeof opts !== 'object') {
      opts = {}
    }
    opts.src = opts.src || ''
    opts.speed = opts.speed || 200

    // Iterator
    if (el.length) {
      for (i = el.length - 1; i != -1; i -= 1) {
        if (el[i].nodeType) {
          new Magnifx(el[i], opts)
        }
      }
    }
  }

}(window, document, Math))
