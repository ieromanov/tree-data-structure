# TREE DATA STRUCTURE

javascript library for build tree data structure

## Install

```bash
npm i tree-data-structure
```

## Import

Browser

```js
import Tree from "tree-data-structure";

const tree = new Tree('root')
```

Node.js

```js
const Tree =  require('tree-data-structure').default;

const tree = new Tree('root')
```

## API

### tree.add() - add item in tree

```js
tree.add(data, parent, addAllByOne)
```

Argument | Type | Description | Required | Default
-------- | ---- | ----------- | -------- | -------
data | any | Data that the tree node will store | `true` | -
parent | Node | Parent node that will store the new node | `true` | -
addAllByOne | Boolean | If the `array` is passed and it is `true`, all items of the array are added as separate nodes | `false` | `false`

The first argument is the data that the tree node will store
The second argument is the parent node that will store the new node

```js
import Tree from "tree-data-structure";

const tree = new Tree('root')

tree.add('child', tree.root)

/*
 output tree root node

 {
	data: 'root',
	children: [{
		data: 'child',
		children: []
	}]
 }
*/
```
Third argument is optional. If you pass an array of data as the first argument and pass `true` as the third argument, each element of the array will be added as a separate node

```js
import Tree from "tree-data-structure";

const tree = new Tree('root')

tree.add(['one', 'two', 'three'], tree.root, true)

/*
 output tree root node

 {
	data: 'root',
	children: [
		{
			data: 'one',
			children: []
		},
		{
			data: 'two',
			children: []
		},
		{
			data: 'three',
			children: []
		}
	]
 }
*/
```

You can pass any type of data.
If you pass `Object`, his properties overwrite in node

```js
import Tree from "tree-data-structure";

const tree = new Tree('root')

tree.add({ one: 1, two: 2, three: 3 }, tree.root)

/*
 output tree root node

 {
	data: 'root',
	children: [
		{
			one: 1,
			two: 2,
			three: 3,
			children: []
		}
	]
 }
*/
```

### tree.remove() - remove item from tree

```js
import Tree from "tree-data-structure";

const tree = new Tree('root')

const node = tree.add({ one: 1, two: 2, three: 3 }, tree.root)

tree.remove(node)

/*
 output tree root node

 {
	data: 'root',
	children: []
 }
*/
```

### tree.search() - search in tree

```js
tree.search(data, key, isDeepSearch, onlyFirst)
```

Argument | Type | Description | Required | Default
-------- | ---- | ----------- | -------- | -------
data | any | Data to be found | `true` | -
key | String | Property key that stores the data to be searched | `false` | id
isDeepSearch | Boolean | use [deep search](https://en.wikipedia.org/wiki/Depth-first_search), if `true`, or [breadth search](https://en.wikipedia.org/wiki/Breadth-first_search) algorithm | `false` | `true`
onlyFirst | Boolean | search only first match | `false` | `false`
