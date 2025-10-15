## Installation
```shell
npm i @tianjos/cpf
```

## Motivation

This package is the result of my study of the book "[Elegant Objects vol 1. By Yegor Bugayenko](www.yegor256.com/elegant-objects.html)"

I tried to implement a version of the CPF (brazilian id) validator as close as possible to the object-oriented programming paradigm.

## Usage
```shell
import { CPF } from '@tianjos/cpf'

const cpf = new CPF("111.444.777-35")