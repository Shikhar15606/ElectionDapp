# How to start Smart Contract

## Way 1 => Ganache GUI + Truffle

- open ganache if you want you may create & save a workspace

```
$ truffle console --network ganache
```

## Way 2 => No GUI just Truffle

```
$ truffle develop
```

## Rest Procedure is common

- If you need backend

```
$ yarn backend
```

- If you need frontend

```
$ yarn frontend
```

- If you need both

```
$ yarn dev
```

- If you have changed the contract then just type to update artifacts

```
deploy --reset
```
