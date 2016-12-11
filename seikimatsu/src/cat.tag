<Cat>
  <style>
    :scope {
      display: block;
    }
    .cat:before {
      content: "🐈";
    }
    :scope > .cat > h1 {
      font-size: 20px;
      color: #ee0000;
    }
  </style>
  <div class="cat">
    <h1>h1 text</h1>
    <yield />
  </div>
</Cat>
