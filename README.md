# trpc-to-openapi + fastify + tRPC 11 bug repro

## How to reproduce

```
pnpm install
pnpm dev
```

Then try to:

```
curl http://localhost:3000/ping
```

Result:

```
<REDACTED>/node_modules/@trpc/server/dist/adapters/node-http/incomingMessageToRequest.js:94
        res.off('close', onAbort);
            ^

TypeError: res.off is not a function
    at Socket.onAbort (<REDACTED>/node_modules/@trpc/server/dist/adapters/node-http/incomingMessageToRequest.js:94:13)
    at Object.onceWrapper (node:events:622:26)
    at Socket.emit (node:events:519:35)
    at TCP.<anonymous> (node:net:350:12)

Node.js v23.1.0
```
