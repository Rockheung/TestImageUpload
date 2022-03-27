## Info

- Have file upload test server based on Node.js powered by busboy
- Run `npm run server` and 
- Have to run `adb reverse tcp:8080 tcp:8080` for android emulator
- You can see reversed proxy list with `adb reverse --list`
- PORT 8081 is traditional metro development server, and PORT 8080 is file upload test server

```shell
$ adb reverse --list
host-18 tcp:8081 tcp:8081
host-18 tcp:8080 tcp:8080
```
