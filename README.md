# k-work-tech

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<!-- reference -->
<!-- links

    Modular approch
    https://www.youtube.com/watch?v=Zu12uA6W80Q 

    folder structure
    https://vueschool.io/articles/vuejs-tutorials/structuring-vue-components/
    
    Routing doc
    https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
    Video >>  https://www.youtube.com/watch?v=nnVVOe7qdeQ
    
-->

### Product add test cases

s1   s2  s3
-----------
p1   p2  p3
p4   p5  p6

case 1: All is active
    select p(1 .. n) will add in download[p1 .. pn]
    select s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]
    remove p(1 .. n) will add in download[p1 .. pn]
    remove s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]

case 2: Any Catagory is active
    select p(1 .. n) will add in download[p1 .. pn]
    select s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]
    remove p(1 .. n) will add in download[p1 .. pn]
    remove s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]

case 3: Any Catagory to All is active
    select p(1 .. n) will add in download[p1 .. pn]
    select s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]
    remove p(1 .. n) will add in download[p1 .. pn]
    remove s(1 .. n) ∩ p(1 .. n) will add in download [p1 .. pn s1 .. sn]