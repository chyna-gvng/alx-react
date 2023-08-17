# Immutability in React: There’s nothing wrong with mutating objects

April 12, 2018  7 min read

![](https://storage.googleapis.com/blog-images-backup/1*TPF5q9zVHp944Ub-xtU7MQ.jpeg)

[Image credit](https://www.geeknative.com/39314/mutate-the-t-shirt/)

One of the first things you learn when you start working with React is that you shouldn’t mutate (modify) a list:

// This is bad, push modifies the original array items.push(newItem);  // This is good, concat doesn’t modify the original array  const newItems = items.concat([newItem]);

But…

Do you know why?

Do you know what’s wrong with mutating objects?

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_88XOllaZvI-HBP8o.png)

Nothing, really. There’s nothing wrong with mutating objects.

Yes, in situations like concurrency it can become a problem. But it’s the easiest development approach. And as many things in programming, it’s a trade-off.

Functional programming and concepts like immutability are popular, almost “cool” topics. But in the case of React, immutability gives you some real benefits. It’s not just fashionable. There’s actual utility there.

### What is immutability?

Immutability means that something cannot change its value or state.

It’s a simple concept but, as usual, the devil is in the details.

You can find immutable types in JavaScript itself. The  `String`  **value type**  is a good example.

If you define a string like this:

var str =  'abc';

You cannot change a character of the string directly.

In JavaScript, strings are not arrays so you can do something like this:

str[2]  =  'd';

Doing something like:

str =  'abd';

Assigns a different string to  `str`.

You can even define the  `str`reference as a constant:

const str =  'abc'

So, assigning a new string generates an error (although this doesn’t relate to immutability).

If you want to modify the String value, you have to use manipulation methods like  [replace](https://www.w3schools.com/jsref/jsref_replace.asp),  [toUpperCase](https://www.w3schools.com/jsref/jsref_touppercase.asp)  or  [trim](https://www.w3schools.com/jsref/jsref_trim_string.asp).

All these methods return new strings, they don’t modify the original one.

### Value type

Now, maybe you didn’t notice, but earlier I emphasized the words  _value type_.

String values are immutable. String  **objects**  are not.

If an object is immutable, you cannot the change its state (the value of its properties). But this also means you cannot add new properties to the object.

Try this fiddle:

If you run it, you’ll see an alert window with the message  `undefined`.

The new property was not added.

But now try this:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_f3DODCqLTseJ5h3L.png)

Strings  **are**  immutable.

The last example creates an object with the  `String()`  constructor that wraps the (immutable) String value. But you can add new properties to this wrapper because it’s an object and it’s not  [frozen](https://stackoverflow.com/questions/33124058/object-freeze-vs-const).

This leads us to a concept that is important to understand. The difference between reference and value equality.

### Reference equality vs value equality

With reference equality, you compare object references with the operators  `===`  and `!==`  (or  `==`  and `!=`). If the references point to the same object, they are considered equal:

var str1 =  ‘abc’;  var str2 = str1; str1 === str2 // true

In the above example, both references (`str1`  and  `str2`) are equal because they point to the same object (`'abc'`).

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_ipAtUvsW9QPr3EHO.png)

Two references are also equal when they refer to the same value if this value is immutable:

var str1 =  ‘abc’;  var str2 =  ‘abc’; str1 === str2 // true  var n1 =  1;  var n2 =  1; n1 === n2 // also true

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_jE_ls1ixbCHkVH5J.png)

But when talking about objects, this doesn’t hold true anymore:

var str1 =  new  String(‘abc’);  var str2 =  new  String(‘abc’); str1 === str2 // false  var arr1 =  [];  var arr2 =  []; arr1 === arr2 // false

In each of these cases, two different objects are created and therefore, their references are not equal:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_QI4r9ERIF1OPVADk.png)

If you want to check if two objects contain the same value, you have to use value equality, where you compare the values of the properties of the object.

In JavaScript, there’s no direct way to do value equality on objects and arrays.

If you’re working with String objects, you can use the methods  `valueOf`  or  `trim`  that return a String value:

var str1 =  new  String(‘abc’);  var str2 =  new  String(‘abc’); str1.valueOf()  === str2.valueOf()  // true str1.trim()  === str2.trim()  // true

But for another types of object, you either have to  [implement your own equals method or use a third-party library](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html).

And how does this relate to immutability and React?

It’s easier to test if two objects are equal if they are immutable and React takes advantage of this concept to make some performance optimizations.

Let’s talk about this.

### Performance optimizations in React

React maintains an internal representation of the UI, the so-called  [virtual DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/).

When a property or the state of a component changes, this virtual DOM is updated to reflect those changes. Manipulating the virtual DOM is easier and faster because nothing is changed in the UI.

Then, React compares the virtual DOM with a version before the update in order to know what changed. This is the  [reconciliation](https://reactjs.org/docs/reconciliation.html)  process.

This way, only the element that changed are updated in the real DOM.

But sometimes, parts of the DOM are re-render even when they didn’t change as a side effect of other parts that do.

In this case, you could implement the function  [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)  to check if the properties and/or state really changed and return true to leave React to perform the update:

class  MyComponent  extends  Component  {  // ... shouldComponentUpdate(nextProps, nextState)  {  if  (this.props.myProp !== nextProps.color)  {  return  true;  }  return  false;  }  // ...  }

If the properties and state of the component are immutable objects or values, you can check to see if they changed with a simple equality operator.

From this perspective, immutability removes complexity.

Because sometimes, knowing what changes can be very hard.

Think about deep fields:

myPackage.sender.address.country.id =  1;

How do you efficiently track which nested object changed?

Think about arrays.

For two arrays of the same size, the only way to know if they are equal is by comparing each element. A costly operation for large arrays.

The most simple solution is to use immutable objects.

If the object needs to be updated, a new object with the new value has to be created, because the original one is immutable and cannot be changed.

And you can use reference equality to know that it changed.

But for some people, this concept may seem a little inconsistent or opposed to the ideas of performance and simplicity.

So let’s review the options you have to create new objects and implement immutability.

### Implementing immutability

In most real applications, your state and properties will be objects and arrays.

JavaScript provides some methods to create new versions of them.

For objects, instead of manually creating an object with the new property:

const modifyShirt =  (shirt, newColor, newSize)  =>  {  return  { id: shirt.id, desc: shirt.desc, color: newColor, size: newSize };  }

You can use  [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)  to avoid defining the unmodified properties:

const modifyShirt =  (shirt, newColor, newSize)  =>  {  return  Object.assign(  {}, shirt,  { color: newColor, size: newSize });  }

Object.assign will copy all the properties of the objects passed as parameters (starting from the second parameter) to the object specified in the first parameter.

Or you can use the  [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)  with the same effect (the  [difference](http://2ality.com/2016/10/rest-spread-properties.html#spread-defines-properties-objectassign-sets-them)  is that  `Object.assign()`  use setter methods to assign new values while this operator doesn’t):

const modifyShirt =  (shirt, newColor, newSize)  =>  {  return  {  ...shirt, color: newColor, size: newSize };  }

For arrays, you can also use the spread operator to create arrays with new values:

const addValue =  (arr)  =>  {  return  [...arr,  1];  };

Or you can use methods like concat or slice that return a new array without modifying the original one:

const addValue =  (arr)  =>  {  return arr.concat([1]);  };  const removeValue =  (arr, index)  =>  {  return arr.slice(0, index)  .concat( arr.slice(index+1)  );  };

In this  [gist](https://gist.github.com/JoeNoPhoto/329f002ef4f92f1fcc21280dc2f4aa71), you can see how to combine the spread operator with these methods to avoid mutating arrays while performing some common operations.

However, there are two main drawbacks in using these native approaches:

-   They work by copying properties/elements from one object/array to another. This could be a slow operation for big objects/arrays.
-   Objects and arrays are mutable by default, there’s nothing that enforces immutability. You have to remember to use one of these methods.

**For these reasons, it’s better to use an external library that handles immutability.**

The React team recommends  [Immutable.js](https://facebook.github.io/immutable-js/)  and  [immutability-helper](https://github.com/kolodny/immutability-helper), but  [here](https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md)  you can find a lot of libraries with similar functionality. There are three main types:

-   Libraries that work with specialized data structures.
-   Libraries that work by freezing objects.
-   Libraries with helper functions to perform immutable operations.

Most of these libraries work with  [persistent data structures](https://en.wikipedia.org/wiki/Persistent_data_structure).

### Persistent data structures

A persistent data structure creates a new version whenever something is modified (which makes data immutable) while providing access to all versions.

If the data structure is partially persistent, all versions can be accessed but only the newest version can be modified. If the data structure is fully persistent, every version can be both accessed and modified.

The creation of new versions is implemented in an efficient way, based on two concepts, trees and sharing.

The data structure acts as a list or as a map, but under the hood, it’s implemented as a type of tree called  [trie](https://en.wikipedia.org/wiki/Trie)  (specifically a  [bitmapped vector trie](https://stackoverflow.com/a/29121204/3593852)), where only the leaves hold values and the binary representation of the keys are the inner nodes of the tree.

For example, for the array:

[1,  2,  3,  4,  5]

You can get convert the indexes to 4-bits binary numbers:

0:  0000  1:  0001  2:  0010  3:  0011  4:  0100

And represent the array as a tree in this way:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_3hlxKXFBvhgY-Pzk.png)

Where each level has two bytes to form the path to reach a value.

Now let’s say that you want to update the value  `1`  to  `6`:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_Yq2TMZjNipslzaQe.png)

Instead of updating the value in the tree directly, the nodes on the way from the root to the value that you are changing are copied:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_L2vypVatx0VywZZS.png)

The value is updated on the new node:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_L2vypVatx0VywZZS-1.png)

And the rest of the nodes are reused:

![](https://blog.logrocket.com/wp-content/uploads/2018/04/0_4TVKbnY7a3av-4Fq.png)

In other words, the unmodified nodes are  **shared**  by both versions.

Of course, this 4-bit branching is not commonly used for these data structures. However, this is the basic concept of  **structural sharing**.

I won’t go into more details, but if you want to know more about persistent data structures and structural sharing,  [read this article](https://medium.com/@dtinth/immutable-js-persistent-data-structures-and-structural-sharing-6d163fbd73d2)  or  [watch this talk](https://www.youtube.com/watch?v=Wo0qiGPSV-s).

### Disadvantages

Immutability is not without its own problems.

As I mentioned before, you either have to remember to use methods than enforce immutability when working with objects and arrays or use third-party libraries.

But many of these libraries work with their own data types.

And even though they provide compatible APIs and ways to convert these types to native JavaScript types, you have to be careful when designing your application to:

-   Avoid high degrees of coupling or
-   Hurt performance with methods like  [toJs()](https://twitter.com/leeb/status/746733697093668864)

If the library doesn’t implement new data structures (libraries that work by freezing objects, for example) there won’t be any of the benefits of structural sharing. Most likely, objects will be copied when updated and performance will suffer in some cases.

Besides, you have to consider the learning curve associated with these libraries.

So you have to be careful when choosing the method you are going to use to enforce immutability.

Also, check out this post for a  [contrarian view of immutability](http://desalasworks.com/article/immutability-in-javascript-a-contrarian-view/).

### Conclusion

Immutability is a concept that React programmers need to understand.

An immutable value or object cannot be changed, so every update creates new value, leaving the old one untouched.

For example, if your application state is immutable, you can save all the states objects in a single store to easily implement undo/redo functionality.

Sound familiar? It should.

Version control systems like  [Git](https://git-scm.com/)  work in a similar way.

[Redux](https://redux.js.org/)  is also based on that  [principle](https://redux.js.org/introduction/three-principles).

However, the focus on Redux is more on the side of  [pure functions](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)  and  _snapshots_  of the application state. This  [StackOverflow answer](https://stackoverflow.com/a/34962065/3593852)  explains the relationship between Redux and immutability in an excellent way.

Immutability has other advantages like avoiding unexpected side effects or  [reducing coupling](https://stackoverflow.com/a/43918514/3593852), but it also has disadvantages.

Remember, as with many things in programming, it’s a trade-off.

## Full visibility into production React apps

Debugging React applications can be difficult, especially when users experience issues that are hard to reproduce. If you’re interested in monitoring and tracking Redux state, automatically surfacing JavaScript errors, and tracking slow network requests and component load time,  [try LogRocket](https://www2.logrocket.com/react-performance-monitoring).  [![](https://files.readme.io/27c94e7-Image_2017-06-05_at_9.46.04_PM.png)](https://www2.logrocket.com/react-performance-monitoring)[![LogRocket Dashboard Free Trial Banner](https://blog.logrocket.com/wp-content/uploads/2017/03/1d0cd-1s_rmyo6nbrasp-xtvbaxfg.png)](https://www2.logrocket.com/react-performance-monitoring)

[LogRocket](https://www2.logrocket.com/react-performance-monitoring)  is like a DVR for web and mobile apps, recording literally everything that happens on your React app. Instead of guessing why problems happen, you can aggregate and report on what state your application was in when an issue occurred. LogRocket also monitors your app's performance, reporting with metrics like client CPU load, client memory usage, and more.

The LogRocket Redux middleware package adds an extra layer of visibility into your user sessions. LogRocket logs all actions and state from your Redux stores.

Modernize how you debug your React apps —  [start monitoring for free](https://www2.logrocket.com/react-performance-monitoring).