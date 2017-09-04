# Soulection Tracklists v2

A Tracklisting website for the Soulection Radio Shows. An archive of tracklists to ease the discovery of new music.

# Development

Uses node.js locally, but will deploy as static pages on Amazon S3.

    yarn run dev

The core and meat of the project is [`library.json`](./library.json) which contains all tracks ever played, and which episodes they belong to.

ID's are [ULID's](https://github.com/alizain/ulid), there is a uncommitted engine that consume's the Official PDF's into the library.

Pull requests are welcome.

# License

MIT

---

[☕️ Support me with coffee](https://ko-fi.com/A3403WZD)
