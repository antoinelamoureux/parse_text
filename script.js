
function ajaxGet() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()

        xhr.open("GET", "./data.txt")
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let data = xhr.responseText
                resolve(data)
            } else {
                console.log(xhr.status)
            }
        }
    })
}

function parseText(data) {
    console.log(data)
    const strings = data.split('\n')
    console.log(strings)

    persons = []
    strings.forEach(string => {
        persons.push(string.split(';'))
    })

    console.log(persons)

    let people = []

    for (let i = 0; i < persons.length; i++) {
        const elements = []
        for (let j = 0; j < persons[i].length; j++) {
            elements.push(persons[i][j].split(':'))
        }
        people.push(elements)
    }

    console.log(people)

    const obj = []
    people.forEach(p => obj.push(Object.fromEntries(p)))

    console.log(obj)
    const keys = Object.keys(obj[0])
    console.log(keys)

    generateTable(obj, keys)
}

function generateTable(obj, keys) {
    const table = document.createElement('table')
    table.innerHTML = `
    <table>
  <tr>
    <th>${keys[0]}</th>
    <th>${keys[1]}</th>
    <th>${keys[2]}</th>
    <th>${keys[3]}</th>
    <th>${keys[4]}</th>
    <th>${keys[5]}</th>
  </tr>
  <tr>
    <td>${obj[0].id}</td>
    <td>${obj[0].nom}</td>
    <td>${obj[0].scoreFid}</td>
    <td>${obj[0].adresse}</td>
    <td>${obj[0].ville}</td>
    <td>${obj[0].codePostal}</td>
  </tr>
  <tr>
    <td>${obj[1].id}</td>
    <td>${obj[1].nom}</td>
    <td>${obj[1].scoreFid}</td>
    <td>${obj[1].adresse}</td>
    <td>${obj[1].ville}</td>
    <td>${obj[1].codePostal}</td>
  </tr>
  <tr>
  <td>${obj[2].id}</td>
  <td>${obj[2].nom}</td>
  <td>${obj[2].scoreFid}</td>
  <td>${obj[2].adresse}</td>
  <td>${obj[2].ville}</td>
  <td>${obj[2].codePostal}</td>
</tr>
</table>
    `
    document.body.appendChild(table)
}

ajaxGet().then(data => parseText(data))