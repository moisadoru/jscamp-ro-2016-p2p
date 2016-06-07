# p2p!

James Halliday

https://substack/neocities.org

---
# the promise of the internet

a universal application runtime

where anyone can participate

---
# falling short

hosted services are slow to load over poor connections

websites are always shutting down or changing for the worst

we fetch the exact same data over and over and over again

---
# the cloud

other people's computers

---
# computers

If I have a document and you want a copy,

and we both have computers,

why can't I send you a copy?

---
# email

I send the file from my computer to an email server,
the email server sends the file to your email server,
you download the file from your email server.

---
# dropbox

I send the file on my computer to dropbox's servers
so that you can download the file from dropbox's servers.

---
# even worse

What if we are both in Romania,
why do we send our files to California?

---
# THE FUTURE

What if we are both on Mars.

Why should we send a file to Earth and back?

---
# google maps

how many times have I downloaded the exact same
tile images from google's servers?

how often to cities really change?

---
# google calendar

at most a few kilobytes of text data

and yet:

```
$ du -sh Google\ Calendar\ -\ Month\ of\ Jun\ 2016*
2.9M  Google Calendar - Month of Jun 2016_files
556K  Google Calendar - Month of Jun 2016.html
```

---
# fallen services

services shut down all the time

geocities never forget

---
# p2p

make the web great again

---
# the future I want to live in:

* connect directly to any computers that have the data I want
* reliable internet connection not required
* don't fetch the same data over and over again

---
# p2p: terra nemo

build internet services that nobody can own

Not even you can shut your own service down.

Your worst enemy is future you!

---
# your worst enemy: you

* you might get bored and shut the service down
* you might turn evil
* you might sell out to thegooglebook

users shouldn't be beholden to authors forever!

---
# a side benefit: inverse scaling

the more people use your p2p system,
the better it works for everyone

(like bittorrent)

---
# p2p lego bricks for the web

* hyperlog
* webtorrent
* hyper{core,drive}

---
# hyperlog

append-only log implementing a merkle DAG

---
# merkle DAG

merkle DAG, like git!

each document points at the hash of its predecessor(s)

---
# append-only log replication

```
$ cat a.log b.log > c.log
```

---
# hyperlog

DEMO!

---
# kappa architecture

the log is the source of truth

indexes (materialized views) create derived truths from the log

---
# kappa architecture

more benefits:

instead of migrations, you can delete and regenerate your indexes
when your derived data requirements change

literally:

```
$ rm -rf indexes.db
```

---
# materialized views

hyperlog-index

``` js
var dex = hindex({
  log: log,
  db: db,
  map: function (row, next) {
    // generate some derived truth with `row` here
    // save it to some persistent storage
    // then call next()
  }
})
```

tail the log to compute derived truths

---
# p2p key/value store

hyperkv: materialized view for key/value data

multi-value register conflict strategy:

* get() produces 0 or more values, not a single value
* put() with multiple links to "merge" multiple keys into a single key again

hyperkv uses hyperlog-index

---
# p2p key/value store

DEMO: hyperkv

---
# p2p map database

osm-p2p-db:

* hyperlog - source of truth
* hyperkv - key/value store for map geometry
* hyperlog-kdb-index - spatial index for map geometry

---
# p2p map database

DEMO SEQUENCE

```
$ node map.js create '{"id":"A","lat":64.5,"lon":-147.6}'
$ node map.js create '{"id":"B","lat":64.8,"lon":-145.2}'
$ node map.js create '{"id":"C","lat":60.6,"lon":-149.1}'
$ node map.js query 61,65 -148,-144
```

---
# p2p map database

data can flow through a p2p system in all kinds of ways:

* usb drives
* bluetooth
* local wifi
* qr codes?
* webrtc
* tcp

---
# p2p calendar

we will need:

* a schedule parser
* a calendar database
* a hyperlog index for the calendar database

---
# p2p calendar

we will need:

* a schedule parser (parse-messy-schedule)
* a calendar database (calendar-db)
* a hyperlog index for the calendar database (hyperlog-calendar-db)

---
# p2p calendar

we will ALSO need:

* the `dupsh` command

```
$ npm install -g dupsh
$ dupsh PROGRAM1 PROGRAM2
```

Pipe PROGRAM1's stdout to PROGRAM2's stdin
and pipe PROGRAM2's stdout to PROGRAM1's stdin

---
# p2p calendar

we will ALSO need:

* `wsnc` - like netcat but for websockets

```
$ npm install -g wsnc
$ wsnc -l 5000 # listen on port 5000
$ wsnc ws://localhost:5000 # connect to a server
```

---
# p2p calendar

DEMO sequence

---
# and now, in the browser...

DEMO p2p calendar in the browser

---
# calendar architecture overview

* write calendar documents to an append-only log
* calendar database generated from the log (materialized view)
* answer queries from the calendar database
* replicate by concatenating logs

---

