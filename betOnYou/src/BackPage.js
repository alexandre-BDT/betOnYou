import React from 'react';
import {ImageBackground, Text, Dimensions, Image} from 'react-native';
import {Content, Button} from 'native-base';
import Foot from './Foot';

class BackPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleBackButton() {
    this.props.navigation.navigate('Play');
  }

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <ImageBackground
        source={require('./../assets/bg.jpg')}
        style={{width, height}}>
        <Content style={{alignContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 20}}>Page hors exercise</Text>
          <Button
            onPress={this.handleBackButton.bind(this)}
            style={{backgroundColor: 'transparent'}}>
            <Image
              style={{width: 40, height: 40}}
              source={require('./../assets/backButton.png')}
            />
          </Button>
        </Content>
        <Foot
          navigation={this.props.navigation}
          route={this.props.route.name}
        />
      </ImageBackground>
    );
  }
}

export default BackPage;
