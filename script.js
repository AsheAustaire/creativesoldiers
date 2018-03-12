const tableBody = document.body.querySelector('.table__body')

fetch('script.php')
.then((resp) => {return resp.json()})
.then((json) => {
  json = addRent(json)
  createApartmentList(json)
  console.log(json);
})

function createRow(houseObj) {
  let newRow = '<tr>'
  for(let key in houseObj) {
    let realName = filterHeader(key)
    if(realName !== false) {
      if(key === 'ApplyOnlineURL') {
        newRow += `<td><a href="${houseObj[key]}">Apply Online</a></td>`
      } else {
        newRow += `<td>${houseObj[key]}</td>`
      }
    }
  }
  newRow += '</tr>'
  return newRow
}

function filterHeader(key) {
  switch(key) {
    case "ApartmentName" :
      return "Apartment Name";
    case "Beds" :
      return "# Bedrooms";
    case "Baths" :
      return "# Bathrooms";
    case "FloorplanName" :
      return "Floorplan Name";
    case "Rent" :
      return "Rent"  ;
    case "ApplyOnlineURL" :
      return "Apply Online";
    default:
      return false;
  }
}

function createHeader(headerObj) {
  let newRow = '<tr>';
  for(let key in headerObj) {
    let realName = filterHeader(key)
    if(realName !== false) {
      newRow += `<th>${realName}</th>`;
    }
  }
  newRow += '</tr>';
  return newRow
}

function createApartmentList(json) {
  let hasHeader = false;
  json.forEach((ele) => {
    if(!hasHeader) {
      tableBody.innerHTML += createHeader(ele);
      hasHeader = true
    }
    tableBody.innerHTML += createRow(ele);
  })
}

function addRent(houseList) {
  for(let i in houseList) {
    houseList[i].Rent = `$${houseList[i].MinimumRent} - $${houseList[i].MaximumRent}`
  }
  return houseList
}
