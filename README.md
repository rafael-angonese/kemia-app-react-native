# Ambiente de desenvolvimento

Setup

1. Node versão local: v12.18.3
3. Yarn or NPM

```bash
https://reactnative.dev/docs/environment-setup
```

```bash
yarn
```

```bash
npx react-native start
```

```bash
npx react-native run-android
```
or

```bash
yarn android
```

## Build app

```bash
cd android && ./gradlew assembleRelease
```

## Combando uteis

```bash
adb reverse tcp:3333 tcp:3333
```

```bash
cd android && ./gradlew clean
```