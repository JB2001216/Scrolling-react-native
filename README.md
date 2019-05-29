# Scrolling-react-native

Permit to scroll a ReactNative View into the visible portion of the screen (`ScrollView`). 

Simple port of DOMElement.scrollIntoView() function, with some extra useful features.

```
yarn add Scrolling-react-native
// or
npm install Scrolling-react-native --save
```

There is **no native code** and this library is compatible with Expo.

# Why ?

The main usecase that drives the creation of library is to ensure form errors become visible to the user as they appear. This is particularly useful on long scrollable forms, which sometimes can't be avoided by better UX.

-  By default, the first error field of the form will reveal itself
- `enabled={!!error}` means we'll only scroll into view fields that have an error
- `scrollIntoViewKey={submitCount}` means we'll scroll into view fields which still have errors on every Formik submit attempt (`submitCount` is provided by Formik)


# Basic usage

```js

// Available options
const scrollIntoViewOptions = {
  
  // Animate the scrollIntoView() operation 
  animated: true,
  
  // By default, scrollIntoView() calls are throttled a bit because it does not make much sense
  // to scrollIntoView() 2 elements at the same time (and sometimes even impossible)
  immediate: false,
  
  // Permit to add top/bottom insets so that element scrolled into view 
  // is not touching directly the borders of the scrollview (like a padding)
  insets: {
    top: 0,
    bottom: 0
  },
  
  // Advanced: use these options as escape hatch if the lib default functions do not satisfy your needs
  getScrollPosition: (scrollViewLayout,viewLayout,scrollY,insets) => { },
  measureElement: (viewRef) => { },
};



// Wrap the original ScrollView into the HOC
const CustomScrollView = ScrollIntoViewWrapper(ScrollView);


class MyScreen extends React.Component {
  render() {
    return (
      <CustomScrollView 
        // Can provide default options (overrideable)
        scrollIntoViewOptions={scrollIntoViewOptions}
      >

        <ScrollIntoView>
          <Text>
            This will scroll into view on mount
          </Text>
        </ScrollIntoView>
        
        <ScrollIntoView animated={false}>
          <Text>
            This will scroll into view on mount without any animation
          </Text>
        </ScrollIntoView>
        
        <ScrollIntoView immediate={true}>
          <Text>
            This will not throttle scrollIntoView calls, as by default it does not make much sense to scroll into view multiple elements at the same time...
          </Text>
        </ScrollIntoView>
        
        <ScrollIntoView enabled={false}>
          <Text>
            This will scroll into view whenever enabled becomes true
          </Text>
        </ScrollIntoView>

        <ScrollIntoView scrollIntoViewKey="some string">
          <Text>
            This will scroll into view whenever scrollIntoViewKey changes
          </Text>
        </ScrollIntoView>
        
        <ScrollIntoView onMount={false} onUpdate={true} scrollIntoViewKey="some string">
          <Text>
            This will scroll into on update (if it becomes enabled, or key changes)
          </Text>
        </ScrollIntoView>
        
        <ScrollIntoView scrollIntoViewOptions={options}>
          <Text>
            This will scroll into view on mount with custom option props
          </Text>
        </ScrollIntoView>

        <View>
          <ScrollIntoView enabled={false} ref={ref => this.scrollIntoViewRef = ref}>
            <Text>
              This will scroll into view when the button is pressed
            </Text>
          </ScrollIntoView>
          <Button
            title="Make above text scroll into view with custom options"
            onPress={() => this.scrollIntoViewRef.scrollIntoView(scrollIntoViewOptions)}
          />
        </View>

        <ScrollIntoViewConsumer>
          {scrollIntoViewAPI => (
            <View ref={ref => this.myView = ref}>
              <Button
                title="Make current view scroll into view"
                onPress={scrollIntoViewAPI.scrollIntoView(this.myView,scrollIntoViewOptions)}
              />
            </View>
          )}
        </ScrollIntoViewConsumer>

      </CustomScrollView>
    );
  }
}
```

You can also configure the HOC:

```js
const CustomScrollView = ScrollIntoViewWrapper({
  // These are needed if you need use a ScrollView wrapper that does not use React.forwardRef()
  refPropName: "innerRef",
  getScrollViewNode: ref => ref.getInstance();
  // fallback value for throttling, can be overriden by user with props
  scrollEventThrottle: 16,
  // ScrollIntoView default options
  options: scrollIntoViewOptions,
})(ScrollView);
```

`CustomScrollView` also accept a `innerRef` prop if you need to access the scrollview node this way.


# API:

The ES6 named exports are:

- `ScrollIntoViewWrapper`: HOC that wraps a `ScrollView` and exposes a scrollIntoView API as React context
- `ScrollIntoView` is a container that reads the context and offer a basic declarative scrollIntoView API
- `ScrollIntoViewConsumer` and `injectScrollIntoViewAPI`: permit to get imperative access to the parent `ScrollView` scrollIntoView API (can be useful if the default `ScrollIntoView` container API does not fit your needs)
- `scrollIntoView`: imperative method to call yourself


# Features:

- Imperative API
- Declarative component
- Configuration at many levels
- Support for wrapped ScrollView (`Scrolling-react-native`, Glamorous-native...)
- Support for `Animated.ScrollView` with native driver


# TODOs:

- Ability to scroll view into the center of the screen
- Support horizontal scrollview

# Contribute

Contributions are welcome and PRs will be merged rapidly.
 
If your changes are impactful, please open an issue first.
