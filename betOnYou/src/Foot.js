import React from 'react';
import {Modal, StyleSheet, Image, Alert, View, Text} from 'react-native';
import {Footer, FooterTab, Button} from 'native-base';
import Shop from '../assets/Footer/chest.png';
import Sword from '../assets/Footer/sword.png';
import Profil from '../assets/Footer/helmet.png';
import SwordGif from './../assets/Footer/swordgif.gif';

class Foot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShop: false,
      isPlay: false,
      isProfil: false,
      isVisible: false,
    };
  }

  componentDidMount() {
    if (this.props.route == 'Play') {
      this.setState({isPlay: true, isProfil: false, isShop: false});
    } else if (this.props.route == 'BackPageShop') {
      this.setState({isPlay: false, isProfil: false, isShop: true});
    } else if (this.props.route == 'BackPageProfil') {
      this.setState({isPlay: false, isProfil: true, isShop: false});
    }
  }

  handleShop() {
    this.props.navigation.navigate('BackPageShop');
  }

  handlePlay() {
    this.props.navigation.navigate('Play');
  }

  handleProfil() {
    this.props.navigation.navigate('BackPageProfil');
  }

  handleStart() {
    this.setState({isVisible: true});
  }

  showModal() {
    if (this.props.check.info === null) {
      return <View />;
    }
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isVisible}>
          <View style={styles.centered}>
            <View style={styles.modal}>
              <Text style={styles.textStyle}>
                {'Tu es sur le point de parier ' +
                  this.props.check.info.bet +
                  ' sur ta game de ' +
                  this.props.check.info.game +
                  '. Si tu gagnes tu remportes les ' +
                  this.props.check.info.bet +
                  ' boycoins de ton adversaire.\n\n'}
                ,
              </Text>
              <Button
                onPress={() => {
                  this.setState({isVisible: false});
                }}>
                <Text>continue</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  render() {
    return (
      <Footer style={styles.main}>
        <FooterTab style={this.state.isShop ? styles.onFocus : styles.foot}>
          <Button onPress={this.handleShop.bind(this)}>
            <Image source={Shop} style={styles.chest} />
          </Button>
        </FooterTab>
        <FooterTab style={styles.onFocusPlay}>
          {this.props.check ? (
            <View>
              {this.showModal()}
              <Button
                onPress={this.handleStart.bind(this)}
                style={
                  this.state.isPlay ? styles.focusRounded : styles.rounded
                }>
                <Image source={SwordGif} style={styles.sword} />
              </Button>
            </View>
          ) : (
            <Button
              onPress={this.handlePlay.bind(this)}
              style={this.state.isPlay ? styles.focusRounded : styles.rounded}>
              <Image source={Sword} style={styles.sword} />
            </Button>
          )}
        </FooterTab>
        <FooterTab style={this.state.isProfil ? styles.onFocus : styles.foot}>
          <Button onPress={this.handleProfil.bind(this)}>
            <Image source={Profil} style={styles.helmet} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#bdc3c7',
    height: 75,
  },
  foot: {
    backgroundColor: '#bdc3c7',
    paddingBottom: 15,
  },
  focusRounded: {
    borderWidth: 1,
    borderColor: '#7f8fa6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  rounded: {
    borderWidth: 1,
    borderColor: '#7f8fa6',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#bdc3c7',
    borderRadius: 50,
  },
  onFocus: {
    backgroundColor: '#fff',
    paddingBottom: 50,
  },
  onFocusPlay: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  Play: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#bdc3c7',
    borderRadius: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  chest: {
    width: 40,
    height: 40,
  },
  sword: {
    width: 40,
    height: 40,
  },
  helmet: {
    width: 40,
    height: 40,
  },
  modal: {
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  },
});

export default Foot;
