import React from 'react';
import {View} from 'react-native';
import {ScrollIntoView} from "react-native-scroll-into-view";
import {Button, Centered, ScrollIntoViewScrollView} from "components/Components";



class BasicScreen extends React.Component {
  static navigationOptions = {
    title: 'Basic',
  };

  static scrollIntoViewInsets = {
    top: 80,
    bottom: 130,
  };

  renderButton = (disableDefaultInset) => {
    const text = disableDefaultInset ? "Scroll Into View (NO insets)" : "Scroll Into View";
    const insets = disableDefaultInset ? {top: 0,bottom: 0} : undefined; // undefined means we let parent decide of insets
    return (
      <Centered style={{height: 200}}>
        <Button
          onPress={() => this.scrollIntoViewRef.scrollIntoView({insets})}
        >
          {text}
        </Button>
      </Centered>
    );
  };

  renderInsetLine = (insetKey, insetValue) => (
    <View
      key={insetKey}
      style={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: insetValue,
        [insetKey]: 0,
        ["border" + (insetKey === "top" ? "Bottom" : "Top") + "Width"]: 2,
        borderColor: "blue",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    />
  );

  render() {
    const insets = BasicScreen.scrollIntoViewInsets;
    return (
      <View style={{flex: 1, width: "100%"}}>
        <ScrollIntoViewScrollView
          style={{flex: 1, width: "100%"}}
          scrollIntoViewOptions={{
            insets,
          }}
        >
          {this.renderButton()}
          {this.renderButton()}
          {this.renderButton(true)}
          {this.renderButton()}
          {this.renderButton()}
          <ScrollIntoView ref={ref => this.scrollIntoViewRef = ref}>
            <Centered style={{width: "100%"}}>
              <View
                style={{width: 100, height: 100, backgroundColor: "red"}}
              />
            </Centered>
          </ScrollIntoView>
          {this.renderButton()}
          {this.renderButton()}
          {this.renderButton(true)}
          {this.renderButton()}
          {this.renderButton()}
        </ScrollIntoViewScrollView>
        {Object.keys(insets).map(insetKey => this.renderInsetLine(insetKey, insets[insetKey]))}
      </View>
    );
  }
}



export default BasicScreen;



