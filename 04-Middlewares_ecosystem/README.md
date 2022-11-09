
# Middlewares

How is express working under the hood?
How can we use that to our best advantage?

Board: https://excalidraw.com/#json=IOCnwVWovYFasbDmcUgsx,Y-poD1Mi6BJYaWLHUYBIcw

* For express there is a chain of handlers, and the order in which these handlers are defined matters greatly.
* For each request, express checks each handler one by one:
  * If we register a handler with METHOD and URL, then it will match those
  * If we register using `.use()`, then it will get executed
  * The control is decided by calling `next()`


Built in middlewares:

1. `express.json()`: It parses req body as json for each request
2. `express.static()`: It allows us to serve static files directly from server
    Ex: /index.html
        /static/css/style.css
        /static/js/index.js
        /static/images/apple.png


Multer
