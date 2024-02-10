# TODO

- implement questions that allows break lines (ex. code fragment)
- on file load indicate number of questions detected in file
- implement _localStorage_ on github pages [[repository](https://github.com/TomasHubelbauer/github-pages-local-storage)]
- make test names unique
- somehow passing the correct test to another quiz-page
  - possibly to saving it to _sessionStorage_ and maintaining all test in _localStorage_
- number input to allow only 1-inf numbers (ex. RegEx)

# notes

Aby załadować zawartość pliku tekstowego na jednej stronie i wyświetlić ją na innej stronie, możesz użyć _localStorage_ lub _sessionStorage_ do przechowywania danych między sesjami lub stronami. Poniżej znajduje się przykładowy kod, który pokazuje, jak to zrobić.

Na pierwszej stronie:

```js
// Załaduj zawartość pliku tekstowego
fetch("path/to/your/textfile.txt")
  .then((response) => response.text())
  .then((data) => {
    // Zapisz dane do localStorage
    localStorage.setItem("textfile", data);
  });
```

Na drugiej stronie:

```js
// Pobierz dane z localStorage
var data = localStorage.getItem("textfile");

// Wyświetl dane
document.getElementById("yourElementId").textContent = data;
```

Pamiętaj, że _localStorage_ i _sessionStorage_ są dostępne tylko w przeglądarkach, a nie w środowisku Node.js. Ponadto, dane przechowywane w _localStorage_ są trwałe i pozostają dostępne po zamknięciu przeglądarki, podczas gdy dane przechowywane w _sessionStorage_ są usuwane po zamknięciu przeglądarki.
