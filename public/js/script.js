var updateForSong = true;

function songUpdateHandler() {
  //============================
  var id;
  var data;
  var url;
  if (updateForSong){
    console.log("UPDATE BUTTON PRESSED FOR SONG UPDATE");
    let song_id = document.getElementById('song_id_field').value
    let song_title = document.getElementById('song_title_field').value
    let song_composer = document.getElementById('song_composer_field').value
    let song_bookcode = document.getElementById('song_bookcode_field').value
    let song_page = document.getElementById('song_page_field').value
    let song_length = document.getElementById('song_length_field').value
    let song_studentnum = document.getElementById('song_studentnum_field').value
    console.log(`Updating song_id: ${song_id}`)
    url = `/api/song/${song_id}`
    let song_data = {
      id: song_id,
      title: song_title,
      composer: song_composer,
      bookcode: song_bookcode,
      page: song_page,
      length: song_length,
      studentnum: song_studentnum
    }

    data = song_data;
  }else{

    console.log("UPDATE BUTTON PRESSED FOR BOOK UPDATE");
    let book_bookcode = document.getElementById('book_bookcode_field').value
    let book_title = document.getElementById('book_title_field').value
    let book_format = document.getElementById('book_format_field').value
    let book_filename = document.getElementById('book_filename_field').value
    let book_page_offset = document.getElementById('book_page_offset_field').value
    let book_num_pages = document.getElementById('book_num_pages_field').value

    console.log(`Updating song_id: ${book_bookcode}`)
    url = `/api/bookcode/${book_bookcode}`
    let book_data = {
      bookcode: book_bookcode,
      title: book_title,
      format: book_format,
      filename: book_filename,
      page_offset: book_page_offset,
      num_pages: book_num_pages
    }

    data = book_data;
  }



  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
     {"status": "SUCCESS"}
    */
      console.log(`Status: ${response.status}`)
    }
  }
  //send HTTP POST message with JSON data
  xhr.open('POST', url, true)
  xhr.setRequestHeader("Content-Type", "application/json")
  xhr.send(JSON.stringify(data)) //send JSON data to server
}

function songSelectHandler(song_id) {
  // =================================
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''
  let url = `/api/song/${song_id}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
      {
      "id": 372,
      "title": "Girl From Ipanema, The",
      "composer": "Jobim Antonio-Carlos",
      "key": "F",
      "bars": "[4/4][A]|:  F^7  |  %  |  G7#11  |  %  |  G-7  |]"
      }
      */
      //build and populate song details text input fields
      songDetailsDiv.innerHTML += `<h3><hr>Song Details</h3>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">ID: <input readonly class="details" type="text"  id="song_id_field" value="${response.id}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">TITLE: <input class="details" type="text" id="song_title_field" value="${response.title}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">COMPOSER: <input class="details" type="text" id="song_composer_field" value="${response.composer}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">BOOKCODE: <input class="details" type="text" id="song_bookcode_field" value="${response.bookcode}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">PAGE: <input class="details" type="text" id="song_page_field" value="${response.page}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">LENGTH: <input class="details" type="text" id="song_length_field" value="${response.length}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">STUDENT NUM: <input class="details" type="text" id="song_studentnum_field" value="${response.studentnum}"/></div>`
      songDetailsDiv.innerHTML += `</div>`

      // songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      // songDetailsDiv.innerHTML += `<div>BARS: </div>`
      // songDetailsDiv.innerHTML += `</div>`
      // songDetailsDiv.innerHTML += `<div><textarea rows="6" cols="100" id="song_bars_field">${response.page}</textarea></div>`
      // songDetailsDiv.innerHTML += `<div></div>`
      songDetailsDiv.innerHTML += `<button id="song_update" onclick="songUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function bookSelectHandler(bookcode) {
  // =================================
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''
  let url = `/api/bookcode/${bookcode}`

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      /*response is expected to be object like:
      {
      "id": 372,
      "title": "Girl From Ipanema, The",
      "composer": "Jobim Antonio-Carlos",
      "key": "F",
      "bars": "[4/4][A]|:  F^7  |  %  |  G7#11  |  %  |  G-7  |]"
      }
      */
      //build and populate song details text input fields
      songDetailsDiv.innerHTML += `<h3><hr>Song Details</h3>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">BOOKCODE: <input readonly class="details" type="text"  id="book_bookcode_field" value="${response.bookcode}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">TITLE: <input class="details" type="text" id="book_title_field" value="${response.title}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">FORMAT: <input class="details" type="text" id="book_format_field" value="${response.format}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">FILENAME: <input class="details" type="text" id="book_filename_field" value="${response.filename}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">PAGE OFFSET: <input class="details" type="text" id="book_page_offset_field" value="${response.page_offset}"/></div>`
      songDetailsDiv.innerHTML += `</div>`
      songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      songDetailsDiv.innerHTML += `<div class="input_lable">NUM PAGES: <input class="details" type="text" id="book_num_pages_field" value="${response.num_pages}"/></div>`
      songDetailsDiv.innerHTML += `</div>`


      // songDetailsDiv.innerHTML += `<div class="details_wrapper">`
      // songDetailsDiv.innerHTML += `<div>BARS: </div>`
      // songDetailsDiv.innerHTML += `</div>`
      // songDetailsDiv.innerHTML += `<div><textarea rows="6" cols="100" id="song_bars_field">${response.page}</textarea></div>`
      // songDetailsDiv.innerHTML += `<div></div>`
      songDetailsDiv.innerHTML += `<button id="song_update" onclick="songUpdateHandler()" >Update</button>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function titleSearchHandler() {
  //===============================
  updateForSong = true;
  let title = document.getElementById('title').value.trim()
  document.getElementById('title').value = title //replace with trimmed value
  let url = `/api/songs?title=${title}`
  if (title === '') {
    url = `/api/songs`
  }

  let songDiv = document.getElementById('song_data')
  songDiv.innerHTML = ''
  //clear song details div
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''

  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      songDiv.innerHTML = songDiv.innerHTML + `<h3><hr>Songs matching: ${title} </h3><ul>`
      for (let song of response.songs) {
        songDiv.innerHTML = songDiv.innerHTML + `<li onclick="songSelectHandler(${song.id})">
        <font color="blue">${song.id}:  ${song.title}</font></a></li>`
      }//<a href="http://localhost:3000/api/song/${song.id}"><font color="blue">${song.id}:  ${song.title}</font></a></li>
      songDiv.innerHTML = songDiv.innerHTML + `</ul>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

function bookSearchHandler() {
  //===============================
  updateForSong = false;
  let title = document.getElementById('title').value.trim()
  document.getElementById('title').value = title //replace with trimmed value
  let url = `/api/songs?bookcode=${title}`
  if (title === '') {
    url = `/api/songs`
  }

  let songDiv = document.getElementById('song_data')
  songDiv.innerHTML = ''
  //clear song details div
  let songDetailsDiv = document.getElementById('song_details')
  songDetailsDiv.innerHTML = ''


  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = JSON.parse(xhr.responseText)
      //response is expected to object like: {songs: [ {id: title:},{id: title:},...]}
      songDiv.innerHTML = songDiv.innerHTML + `<h3><hr>Books matching: ${title} </h3><ul>`
      for (let book of response.books) {
        songDiv.innerHTML = songDiv.innerHTML + `<li onclick="bookSelectHandler('${book.bookcode}')">
        <font color="blue">${book.bookcode}:  ${book.title}</font></a></li>`
      }//<a href="http://localhost:3000/api/song/${song.id}"><font color="blue">${song.id}:  ${song.title}</font></a></li>
      songDiv.innerHTML = songDiv.innerHTML + `</ul>`
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
}

//Attach Enter-key Handler for search field
const ENTER = 13 //Enter key character code
document.getElementById("title")
  .addEventListener("keyup", function(event) {
    event.preventDefault()
    if (event.keyCode === ENTER) {
      document.getElementById("search").click()
    }
  })
