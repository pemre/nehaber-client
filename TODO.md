## Feature to implement

```javascript
html('https://www.haberler.com/gazeteler/', {
  selectorAll: '.newspaperCovers img'
})
  .then(images => {
    // Example: https://foto.haberler.com/gazeteler/amk-gazetesi/2018/05/27/amk-gazetesi_o.jpg?v=4
    let urls = []
    images.forEach((image, i) => {
      let url = image.dataset.original.replace(/\?v=4|_o/g, '')
      urls.push(<img key={i} src={url} data-magnifx-src={url} />)
    })

    ReactDOM.render(
      urls,
      document.getElementById('newspaper-covers')
    )

    magnifx('#newspaper-covers img')
  })
```

## Styling to implement

```css
/* ================
 *  Newspapers
 * ================ */
/* --- For mobile (Default view) --- */
#newspaper-covers {
  display: flex;
  flex-flow: row wrap;
}

#newspaper-covers > div {
  width: 50%;
  padding: 0.5rem;
}

#newspaper-covers img {
  width: 100%;
}

.magnifx-lens {
  width: 60rem;
  height: 60rem;
  border-radius: 3rem;
}

/* --- For desktop --- */
@media only screen and (min-width: 1200px) {
  #newspaper-covers > div {
    width: 20%;
    padding: 1rem;
  }
}
```
